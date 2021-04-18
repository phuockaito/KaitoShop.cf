import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// -- Context
import { UserContext } from "contexts/UserContext";
// --ComPonent
import InForUser from "./inforUser/index";
import Loading from "component/LoadingBtn/index";
// --CSS
import "./style.css";
export default function User() {
  // create State
  const state = useContext(UserContext);
  const { socket } = state;
  const [user, setUser] = state.user;
  const [idUser,] = state.idUser;
  const [token] = state.token;
  const loadingGetProfile = useSelector((state) => state.user.loadingGetProfile);
  // state
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
              {token && user.length > 0 ? (
                <InForUser
                  user={user}
                  token={token}
                  setUser={setUser}
                  socket={socket}
                  idUser={idUser}
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
