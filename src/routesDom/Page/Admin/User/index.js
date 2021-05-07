import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// patch API
import { getUser, getListCommentsUser, deleteCommentUser, deleteAccountUser } from 'features/Admin/User/pathAPI';
// Context
import { UserContext } from 'contexts/UserContext';
// Component
import ListUser from './ListUser';
import Loading from 'loading/index';
import CommentUser from './CommentUser';
import LoadingBtn from 'component/LoadingBtn/index';
import LoadingPage from 'component/LoadingPage/index';
// Css
import './style.css';
export default function UserManage() {
  const dispatch = useDispatch();
  // dispatch API
  const actionGetUsers = (params, token) => dispatch(getUser(params, token));
  const actionGetListCommentsUser = (params, token) => dispatch(getListCommentsUser(params, token));
  const actionDeleteCommentUser = (params, token) => dispatch(deleteCommentUser(params, token));
  const actionDeleteAccountUser = (params, token) => dispatch(deleteAccountUser(params, token));
  // create state
  const state = useContext(UserContext);
  const [token] = state.token;
  const [openFromComment, setOpenFromComment] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // list comments
  const [limitCMT, setLimitCMT] = useState(5);
  // store
  const listAccount = useSelector(state => state.userAdmin.user);
  const length = useSelector(state => state.userAdmin.lengthUser);
  const loading = useSelector(state => state.userAdmin.loading);
  const loadingDeleteAccount = useSelector(state => state.userAdmin.loadingDeleteAccount);
  // data comment list user
  const listCommentUser = useSelector(state => state.userAdmin.comment);
  const loadingComments = useSelector(state => state.userAdmin.loadingComments);
  const lengthComment = useSelector(state => state.userAdmin.lengthComment);
  // get list user
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    const params = {
      page: page,
      limit: limit
    };
    actionGetUsers(params, token);
  }, [page, limit]);
  // get list comment
  useEffect(() => {
    if (idUser) {
      const paramComment = {
        page: 1,
        limit: limitCMT,
        id_user: idUser
      };
      actionGetListCommentsUser(paramComment);
    }
  }, [idUser, limitCMT]);
  useEffect(() => {
    setLimitCMT(5);
  }, [idUser]);
  return (
    <>
      {loadingDeleteAccount && <LoadingPage />}
      {loading && <Loading />}
      <div className="ground-user-manage">
        <div className="container-user-manage">
          <h3>Có tất cả {length} tài khoản </h3>
          <div className="main-user-manage">
            {!loading && listAccount.length > 0
              && <ListUser
                listAccount={listAccount}
                length={length}
                setPage={setPage}
                setLimit={setLimit}
                page={page}
                limit={limit}
                setOpenFromComment={setOpenFromComment}
                setIdUser={setIdUser}
                token={token}
                actionDeleteAccountUser={actionDeleteAccountUser}
              />
            }
            {idUser &&
              <CommentUser
                token={token}
                openFromComment={openFromComment}
                setOpenFromComment={setOpenFromComment}
                listCommentUser={listCommentUser}
                loadingComments={loadingComments}
                LoadingBtn={LoadingBtn}
                lengthComment={lengthComment}
                limitCMT={limitCMT}
                setLimitCMT={setLimitCMT}
                actionDeleteCommentUser={actionDeleteCommentUser}
              />
            }
          </div>
        </div>
      </div>
    </>
  )
};


