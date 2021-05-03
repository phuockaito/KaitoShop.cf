import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// patch API
import { getUser } from 'features/Admin/User/pathAPI';
// Context
import { UserContext } from 'contexts/UserContext';
// Component
import ListUser from './ListUser';
import Loading from 'loading/index';
// Css
import './style.css';
export default function UserManage() {
  const dispatch = useDispatch();
  // dispatch API
  const actionGetUsers = (params, token) => dispatch(getUser(params, token));
  // create state
  const state = useContext(UserContext);
  const [token] = state.token;
  // store
  const listAccount = useSelector(state => state.userAdmin.data);
  const length = useSelector(state => state.userAdmin.length);
  const loading = useSelector(state => state.userAdmin.loading);

  // userEffect
  useEffect(() => {
    const params = {
      page: 1,
      limit: 20
    };
    actionGetUsers(params, token);
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div className="ground-user-manage">
        <div className="container-user-manage">
          <h3>Có tất cả {length} tài khoản </h3>
          <div className="main-user-manage">
            <ListUser
              listAccount={listAccount}
              length={length}
            />
          </div>
        </div>
      </div>
    </>
  )
};


