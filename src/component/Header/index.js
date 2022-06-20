import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AlignLeftOutlined } from "@ant-design/icons";
import AOS from "aos";
// --Component
import Search from "./Search/index";
import Cart from "./User/cart/index";
import User from "./User/index";
import logo from "image/logo.png";
// -- Context
import { UserContext } from "contexts/UserContext";
// Css
import "./style.css";
export default function Header({ setOpenMenu }) {
    // create State
    const state = useContext(UserContext);
    const { socket } = state;
    const [user, setUser] = state.user;
    const [idUser, setIdUser] = state.idUser;
    const [token, setToken] = state.token;
    const [, setPatchCart] = state.patchCart;
    //  store
    const dataCart = useSelector((state) => state.cart.dataCart);
    const loadingGetProfile = useSelector(
        (state) => state.user.loadingGetProfile
    );
    // useEffect
    useEffect(() => {
        AOS.init({
            duration: 500,
            once: true,
            initClassName: "aos-init",
        });
    }, []);

    return (
        <>
            <button className="scrollTop">
                <i className="fa fa-angle-up"></i>
            </button>
            <div className="ground-header">
                <div className="main-header">
                    <div className="main-item-logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <Search />
                    <div className="toggle-menu">
                        <AlignLeftOutlined
                            onClick={() => setOpenMenu(true)}
                            style={{
                                fontSize: "1.2em",
                                color: "white",
                            }}
                        />
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
    );
}
