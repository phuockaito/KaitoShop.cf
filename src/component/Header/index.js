import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";
import AOS from 'aos';
import Search from './Search/index';
import Cart from './User/cart/index';
import User from './User/index';
import logo from 'image/logo.png';
import './style.css';
export default function Header() {
    useEffect(() => {
        AOS.init({
            duration: 500,
            once: true,
            initClassName: 'aos-init',
        })
    }, []);
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
                        <i className="fa fa-bars" />
                    </div>
                    <Cart />
                    <User />
                </div>
            </div>
        </>
    )
}