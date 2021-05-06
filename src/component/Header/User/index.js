import { useEffect } from 'react';
import { Link } from "react-router-dom";
// --ComPonent
import InForUser from "./inforUser/index";
import Loading from "component/LoadingBtn/index";
// --CSS
import "./style.css";
const tokenLocal = localStorage.getItem("token");
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
  useEffect(() => {
    if (!token || !tokenLocal) {
      document.querySelector('.btn-show-login').addEventListener('click', () => {
        document.querySelector('.show-login').classList.add('open');
        document.querySelector('body').classList.add('active');
        document.querySelector('.main-container').classList.add('active');
      });
      const closeLogin = document.querySelectorAll('.btn-close-login');
      for (let index = 0; index < closeLogin.length; index++) {
        const element = closeLogin[index];
        element.addEventListener('click', () => {
          document.querySelector('.show-login').classList.remove('open');
          document.querySelector('body').classList.remove('active');
          document.querySelector('.main-container').classList.remove('active');
        })
      }
    };
  }, [token, tokenLocal]);
  return (
    <>
      <div className="ground-user">
        {loadingGetProfile && <Loading />}
        {!token && !loadingGetProfile && (
          <Link to="/login" className="items-login">
            đăng nhập
          </Link>
        )}
        {!loadingGetProfile && (
          <div className="main-user">
            <div className="profile-login">
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
                <div className="login">
                  <i
                    style={{ display: "none" }}
                    className="fa fa-user btn-show-login"

                  />
                  <div className="show-login">
                    <i className="fa fa-long-arrow-left btn-close-login" />
                    <Link to="/login" className="item-login btn-close-login">
                      đăng nhập
										</Link>
                    <Link to="/register" className="item-login btn-close-login">
                      đăng ký
										</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
