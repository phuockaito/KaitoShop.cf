import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// image
import logoWeb from 'image/logo.png';
// API
import { getMenu } from 'features/Menu/pathAPI';
// component
import MenuUser from './MenuUser/index';
import MenuAdmin from './MenuAdmin/index';
import './style.css';
export default function Menu() {
  const dispatch = useDispatch();
  const actionGetMenu = () => dispatch(getMenu());
  const list_menu = useSelector(state => state.menu);
  const isAdmin = useSelector(state => state.user.isAdmin);
  useEffect(() => {
    actionGetMenu();
  }, []);

  const CloseMenu = () => {
    document.querySelector('.ground-menu').classList.remove('open');
    document.querySelector('body').classList.remove('active');
    document.querySelector('.main-container').classList.remove('active');
  };
  return (
    <div className="ground-menu">
      <div className="nav-toggle">
        <span>
          <i className="fa fa-times" />
          <Link to="/" className="logo" onClick={CloseMenu}>
            <img src={logoWeb} alt="logo" />
          </Link>
        </span>
      </div>
      {!isAdmin && (
        <MenuUser
          list_menu={list_menu}
          CloseMenu={CloseMenu}
          Link={Link}
        />
      )}
      {isAdmin && (
        <MenuAdmin
          Link={Link}
        />
      )}
    </div>
  )
};