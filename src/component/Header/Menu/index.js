import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";
// image
import logoWeb from 'image/logo.png';
import logoAdidas from 'image/iconMenu/adidas.png';
import logoNike from 'image/iconMenu/nike.png';
import logoVans from 'image/iconMenu/Vans.png';
import logoNewBanner from 'image/iconMenu/newBalance.png';
import logoPuma from 'image/iconMenu/puma.png';
import logoConverse from 'image/iconMenu/converse.png';
import homePage from 'image/iconMenu/home.png';
// API
import { getMenu } from 'features/Menu/pathAPI';
import './style.css';
export default function Menu() {
    const dispatch = useDispatch();
    const actionGetMenu = () => dispatch(getMenu());
    const list_menu = useSelector(state => state.menu);
    const { Adidas } = list_menu.listMenu;
    const { Nike } = list_menu.listMenu;
    const { Vans } = list_menu.listMenu;
    const { NewBalance } = list_menu.listMenu;
    const { Puma } = list_menu.listMenu;
    const { Converse } = list_menu.listMenu;
    useEffect(() => {
        actionGetMenu();
    }, []);
    const CloseMenu = () => {
        $('.ground-menu').removeClass('open');
        $('body').removeClass('active');
        $('.main-container').removeClass('active');
    }

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

            <nav>
                <ul className="menu">
                    <li>
                        <Link to="/" className="active" onClick={CloseMenu}>
                            <img src={homePage} alt="homePage" /> trang chủ
                    </Link>
                    </li>
                    <li className="active-menu">
                        <a>
                            <img src={logoAdidas} alt="logoAdidas" />
                           Adidas
                        <i className="fa fa-caret-down" />
                        </a>
                        <ul className="sub-menu">
                            {
                                Adidas && (Adidas.map((menu, key) => (
                                    <li key={key}><Link to={`/products/adidas/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                )))
                            }
                        </ul>
                    </li>
                    <li className="active-menu">
                        <a>
                            <img src={logoNike} alt="logoNike" />
                            Nike
                         <i className="fa fa-caret-down" />
                        </a>
                        <ul className="sub-menu">
                            {
                                Nike && (Nike.map((menu, key) => (
                                    <li key={key}><Link to={`/products/nike/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                )))
                            }
                        </ul>
                    </li>
                    <li className="active-menu">
                        <a>
                            <img src={logoVans} alt="logoVans" />
                            Vans <i className="fa fa-caret-down" />
                        </a>
                        <ul className="sub-menu">
                            {
                                Vans && (Vans.map((menu, key) => (
                                    <li key={key}><Link to={`/products/vans/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                )))
                            }
                        </ul>
                    </li>
                    <li className="active-menu">
                        <a>
                            <img src={logoNewBanner} alt="logoNewBanner" />
                            new balance <i className="fa fa-caret-down" />
                        </a>
                        <ul className="sub-menu">
                            {
                                NewBalance && (NewBalance.map((menu, key) => (
                                    <li key={key}><Link to={`/products/new-balance/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                )))
                            }
                        </ul>
                    </li>
                    <li className="active-menu">
                        <a>
                            <img src={logoPuma} alt="logoPuma" />
                            puma <i className="fa fa-caret-down" />
                        </a>
                        <ul className="sub-menu">
                            {
                                Puma && (Puma.map((menu, key) => (
                                    <li key={key}><Link to={`/products/puma/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                )))
                            }
                        </ul>
                    </li>
                    <li className="active-menu">
                        <a>
                            <img src={logoConverse} alt="logoConverse" />
                            converse <i className="fa fa-caret-down" />
                        </a>
                        <ul className="sub-menu">
                            {
                                Converse && (Converse.map((menu, key) => (
                                    <li key={key}><Link to={`/products/converse/${menu.replace(/ /g, '-')}`} onClick={CloseMenu}>{menu}</Link></li>
                                )))
                            }
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}