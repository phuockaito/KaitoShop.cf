import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FileTextOutlined } from "@ant-design/icons";
// API
import { getDiaryComment } from "features/User/patchAPI";
// Component
import ListItem from "./ListItem";
import Loading from "component/LoadingBtn/index";
import LoadingPage from "component/LoadingPage/index";
import NotFount from "../NotFount/index";
// dispatch API
import { deleteComment } from "features/Comment/pathAPI";
// Context
import { UserContext } from "contexts/UserContext";
import "./style.css";
const tokenLocal = localStorage.getItem("token");
export default function HistoryComment() {
  document.querySelector("title").innerHTML = "Nhật ký hoạt động";
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useContext(UserContext);
  const [token,] = state.token;
  // create State
  const [page, setPage] = useState(1);
  const [loadingCmt, setLoadingCmt] = useState(false);
  // dispatch API
  const getDataComments = (data, token) =>
    dispatch(getDiaryComment(data, token));
  const actionDeleteComment = (data, token) =>
    dispatch(deleteComment(data, token));
  // useSelector
  const dataHistoryComment = useSelector((state) => state.user.diaryComment);
  const lengthSumHistoryComment = useSelector((state) => state.user.diaryCommentLength);
  const loadingHistoryComment = useSelector((state) => state.user.loadingDiaryComment);
  const loadingDeleteCmtAPI = useSelector((state) => state.comment.loadingDeleteCmtAPI);
  // Effect
  useEffect(() => {
    if (token) {
      const params = {
        page: page,
        item: 10,
      };
      getDataComments({ params }, token);
    }
  }, [page, token]);
  // scrollTo
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    setLoadingCmt(false);
  }, [dataHistoryComment.length]);
  const onChangeLoadingCmt = (page) => {
    setLoadingCmt(true);
    setPage(page + 1);
  };
  useEffect(() => {
    if (!token && !tokenLocal) {
      history.push("/");
    }
  }, [token, tokenLocal]);
  return (
    token ? (
      <>
        {loadingDeleteCmtAPI && <LoadingPage />}
        <div className="group-history-comment">
          <div className="main-history-comment">
            <div className="group-title-rewvie">
              <h3>HOẠT ĐỘNG GẦN ĐÂY</h3>
              <p>({dataHistoryComment.length} / {lengthSumHistoryComment} Bình luận)</p>
            </div>
            <ListItem
              dataHistoryComment={dataHistoryComment}
              actionDeleteComment={actionDeleteComment}
              token={token}
            />
            <div className="group-loading-see-more">
              {loadingHistoryComment && !loadingCmt && <Loading />}
              {!loadingCmt && dataHistoryComment.length < lengthSumHistoryComment && (
                <button
                  onClick={() => {
                    onChangeLoadingCmt(page);
                  }}
                >
                  xem thêm
                </button>
              )}
              {loadingCmt && <Loading />}
            </div>
            {lengthSumHistoryComment === 0 && !loadingHistoryComment && (
              <div className="noData-history-comment">
                <FileTextOutlined
                  style={{
                    fontSize: "2em",
                    margin: "15px auto",
                  }}
                />
                <h3>Không có gì để hiển thị</h3>
              </div>
            )}
          </div>
        </div>
      </>
    )
      : (<NotFount />)
  )
};
