import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// API
import { getMenu } from 'features/Menu/pathAPI';
// component
import MenuUser from './MenuUser/index';
import MenuAdmin from './MenuAdmin/index';
import './style.css';
export default function Menu({ token, openMenu, setOpenMenu }) {
  const dispatch = useDispatch();
  // dispatch API
  const actionGetMenu = () => dispatch(getMenu());
  //store
  const list_menu = useSelector(state => state.menu);
  const isAdmin = useSelector(state => state.user.isAdmin);
  //useEffect
  useEffect(() => {
    actionGetMenu();
  }, []);

  //function
  const onClickCloseMenu = () => {
    setOpenMenu(false)
  };
  { openMenu ? document.querySelector('body').classList.add('active') : document.querySelector('body').classList.remove('active') }

  return (
    <>
      <div className={`ground-menu ${openMenu && 'open'}`} >
        {
          (isAdmin && token) ? (
            <MenuAdmin
              Link={Link}
              onClickCloseMenu={onClickCloseMenu}
            />
          ) : (<MenuUser
            list_menu={list_menu}
            onClickCloseMenu={onClickCloseMenu}
            Link={Link}
          />)
        }
      </div>
      {openMenu && <div className="active-before" onClick={onClickCloseMenu} />}
    </>
  )
};