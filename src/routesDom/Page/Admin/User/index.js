import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';
// patch API
import {
  getUser,
  getListCommentsUser,
  deleteCommentUser,
  deleteAccountUser,
  getListCartUser,
  postActiveRoleUser
} from 'features/Admin/User/pathAPI';
// Context
import { UserContext } from 'contexts/UserContext';
// Component
import ListUser from './ListUser';
import Loading from 'loading/index';
import CommentUser from './CommentUser';
import CartUser from './CartUser';
import LoadingBtn from 'component/LoadingBtn/index';
import LoadingPage from 'component/LoadingPage/index';
// Css
import './style.css';
export default function UserManage() {
  const { Option } = Select;
  const dispatch = useDispatch();
  // dispatch API
  const actionGetUsers = (params, token) => dispatch(getUser(params, token));
  const actionGetListCommentsUser = (params, token) => dispatch(getListCommentsUser(params, token));
  const actionGetListCartUser = (params, token) => dispatch(getListCartUser(params, token));
  const actionDeleteCommentUser = (params, token) => dispatch(deleteCommentUser(params, token));
  const actionDeleteAccountUser = (params, token) => dispatch(deleteAccountUser(params, token));
  const actionPostActiveRoleUser = (id_user, token) => dispatch(postActiveRoleUser(id_user, token));
  // create state
  const state = useContext(UserContext);
  const [token] = state.token;
  const [openFromComment, setOpenFromComment] = useState(false);
  const [openCartUser, setOpenCartUser] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  // list comments
  const [limitCMT, setLimitCMT] = useState(5);
  const [limitCart, setLimitCart] = useState(2);
  // filter admin and user
  const [role, setRole] = useState('all');
  // store
  const listAccount = useSelector(state => state.userAdmin.user);
  const length = useSelector(state => state.userAdmin.lengthUser);
  const loading = useSelector(state => state.userAdmin.loading);
  const loadingDeleteAccount = useSelector(state => state.userAdmin.loadingDeleteAccount);
  // data comment list user
  const listCommentUser = useSelector(state => state.userAdmin.comment);
  const loadingComments = useSelector(state => state.userAdmin.loadingComments);
  const lengthComment = useSelector(state => state.userAdmin.lengthComment);
  // data cart user
  const listCartUser = useSelector(state => state.userAdmin.cart);
  const loadingCart = useSelector(state => state.userAdmin.loadingCart);
  const lengthCart = useSelector(state => state.userAdmin.lengthCart);
  // get list user
  const functionGetUser = () => {
    const params = {
      page: page,
      limit: limit,
      role: role
    };
    actionGetUsers(params, token);
  };
  useEffect(() => {
    setPage(1);
    setLimit(10);
  }, [role]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    functionGetUser();
  }, [page, limit, role]);
  // get list comment
  useEffect(() => {
    if (idUser && openFromComment) {
      const paramComment = {
        page: 1,
        limit: limitCMT,
        id_user: idUser
      };
      actionGetListCommentsUser(paramComment);
    }
    if (idUser && openCartUser) {
      const paramCart = {
        page: 1,
        limit: limitCart,
        id_user: idUser
      };
      actionGetListCartUser(paramCart);
    }
  }, [idUser, limitCart, limitCMT, openFromComment, openCartUser]);
  useEffect(() => {
    setLimitCMT(5);
  }, [idUser, openFromComment, openCartUser]);
  const onChangeUser = e => {
    setRole(e.value);
  };

  return (
    <>
      {loadingDeleteAccount && <LoadingPage />}
      {loading && <Loading />}
      <div className="ground-user-manage">
        <div className="container-user-manage">
          <h3>Có tất cả {length} tài khoản </h3>
          <div className="filter-role">
            <Select
              labelInValue
              defaultValue={{ value: 'Tất cả' }}
              style={{ width: 150 }}
              onChange={onChangeUser}
            >
              <Option value="all">Tất cả</Option>
              <Option value="admin">Quản trị viên	</Option>
              <Option value="user">Người dùng</Option>
            </Select>
          </div>
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
                setOpenCartUser={setOpenCartUser}
                setIdUser={setIdUser}
                token={token}
                actionDeleteAccountUser={actionDeleteAccountUser}
                actionPostActiveRoleUser={actionPostActiveRoleUser}
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
            {idUser &&
              <CartUser
                token={token}
                openCartUser={openCartUser}
                setOpenCartUser={setOpenCartUser}
                listCartUser={listCartUser}
                lengthCart={lengthCart}
                loadingCart={loadingCart}
                LoadingBtn={LoadingBtn}
                limitCart={limitCart}
                setLimitCart={setLimitCart}
              />
            }
          </div>
        </div>
      </div>
    </>
  )
};


