import { useContext } from 'react';
import { Link } from 'react-router-dom';
// -- Context
import { UserContext } from 'contexts/UserContext';
// --ComPonent
import InForUser from './inforUser/index';
// --CSS
import './style.css';
export default function User() {
    // create State
    const [user, setUser] = useContext(UserContext);
    const { token, dataUser } = user;
    // state
    return (
        <>
            <div className="ground-user">
                {!token && (
                    <Link
                        to='/login'
                        className="items-login"

                    >
                        đăng nhập
                    </Link>
                )}
                <div className="main-user">
                    <div className="frofile-login">
                        {
                            token ? (
                                <InForUser
                                    dataUser={dataUser}
                                    token={token}
                                    setUser={setUser}
                                />
                            ) : (
                                    <div className="login">
                                        <i style={{ 'display': 'none' }} className="fa fa-user btn-show-login" />
                                        <div className="show-login">
                                            <i className="fa fa-long-arrow-left btn-close-login" />
                                            <Link to="/login" className="item-login btn-close-login" >đăng nhập</Link>
                                            <Link to="/register" className="item-login btn-close-login">đăng ký</Link>
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
