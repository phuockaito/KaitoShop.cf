import { useEffect, useContext } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import $ from "jquery";
import AOS from 'aos';
import Search from './Search/index';
import Cart from './User/cart/index';
import User from './User/index';
import logo from 'image/logo.png';
// -- Context
import { UserContext } from "contexts/UserContext";
// Css
import './style.css';
export default function Header() {
  // create State
  const state = useContext(UserContext);
  const { socket } = state;
  const [user, setUser] = state.user;
  const [idUser, setIdUser] = state.idUser;
  const [token, setToken] = state.token;
  const [, setPatchCart] = state.patchCart;
  //  store
  const dataCart = useSelector(state => state.cart.dataCart);
  const loadingGetProfile = useSelector((state) => state.user.loadingGetProfile);
  // useEffect
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      initClassName: 'aos-init',
    })
  }, []);
  const onClickOpenMenu = () => {
    document.querySelector('.ground-menu').classList.add('open');
    document.querySelector('body').classList.add('active');
    document.querySelector('.main-container').classList.add('active');
  }
  return (
    <>
      <button className="scrollTop">
        <i className="fa fa-angle-up"></i>
      </button>
      <div className="ground-header">
        <div className="main-header">
          <div className="main-item-logo">
            <Link
              to="/"
              onClick={() => { $("html ,body").animate({ scrollTop: 0 }, 800); }}
            >
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <Search />
          <div style={{ 'display': 'none' }} className="totle-menu">
            <i className="fa fa-bars" onClick={onClickOpenMenu} />
          </div>
          <Cart setPatchCart={setPatchCart} dataCart={dataCart} />
          <User
            socket={socket}
            user={user}
            setUser={setUser}
            idUser={idUser}
            setIdUser={setIdUser}
            token={token}
            setToken={setToken}
            loadingGetProfile={loadingGetProfile}
          />
        </div>
      </div>
    </>
  )
};