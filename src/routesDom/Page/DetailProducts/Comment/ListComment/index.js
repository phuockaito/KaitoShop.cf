import { useState, useEffect } from "react";
// --Components
import LoadingBtn from "component/LoadingBtn/index";
import ListItemComment from './ListItemComment';
// --CSS
import "./style.css";
export default function ListComment({
  dataComment,
  onChangePageComment,
  token,
  id_user,
  user,
  idProduct,
  socket,
  lengthComment,
  actionCheckDeleteCmt
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [dataComment.length]);
  return (
    <>
      <p id="waitWriteComment" />
      {dataComment.length > 0 && (
        <div className="group-list-comment">
          <div className="group-length">
            <h3>Khách Hàng Nhận Xét</h3>
            <p>{dataComment.length} /{lengthComment} bình luận</p>
          </div>
          <ListItemComment
            dataComment={dataComment}
            token={token}
            socket={socket}
            idUser={id_user}
            user={user}
            idProduct={idProduct}
            actionCheckDeleteCmt={actionCheckDeleteCmt}
          />
          { loading && <LoadingBtn />}
          {
            !loading && dataComment.length < lengthComment && (
              <button
                className="load-data-comment"
                onClick={() => {
                  setLoading(true);
                  onChangePageComment(1);
                }}
              >
                Tải Thêm
              </button>
            )}
        </div>
      )}
    </>
  );
};
