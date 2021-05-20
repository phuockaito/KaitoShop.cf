import { useState } from 'react';
import { Link } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
// --ComPonent
import InForUser from "./inforUser/index";
import Loading from "component/LoadingBtn/index";
// --CSS
import "./style.css";
export default function User({
  socket,
  user,
  setUser,
  idUser,
  setIdUser,
  token,
  setToken,
  loadingGetProfile
}) {
  const [openUser, setOpenUser] = useState(false);
  const closeOpenUser = () => {
    setOpenUser(false);
  };
  { openUser ? document.querySelector('body').classList.add('active') : document.querySelector('body').classList.remove('active') }

  return (
    <>
      <div className="ground-user">
        {loadingGetProfile && <Loading />}
        {/* không có token hiện button đăng nhập */}
        {!token && !loadingGetProfile && (
          <Link to="/login" className="items-login">
            đăng nhập
          </Link>
        )}
        {!loadingGetProfile && (
          <div className="main-user">
            <div className="profile-login">
              {/* hiện thông tin user nếu có token */}
              {token && user ? (
                <InForUser
                  user={user}
                  token={token}
                  setUser={setUser}
                  socket={socket}
                  setToken={setToken}
                  idUser={idUser}
                  setIdUser={setIdUser}
                />
              ) : (
                <>
                  {/* không có token */}
                  <UserOutlined style={{ fontSize: '1.2em', color: '#ffff' }} onClick={() => setOpenUser(true)} />
                  <div className={`show-login ${openUser && 'open'}`}>
                    <Link
                      to="/login"
                      onClick={closeOpenUser}
                    >
                      đăng nhập
										</Link>
                    <Link
                      to="/register"
                      onClick={closeOpenUser}
                    >
                      đăng ký
										</Link>
                  </div>
                  {openUser && <div className="active-before" onClick={closeOpenUser}></div>}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
