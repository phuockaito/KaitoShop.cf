import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';
import {
    UserOutlined,
    HistoryOutlined,
    MailOutlined,
    LoginOutlined,
    ShoppingCartOutlined,
    WomanOutlined,
} from '@ant-design/icons';
// API 
import { updateNameSexUser, uploadImageUser } from 'features/User/patchAPI';
// Component
import UpdateUser from './UpdateSexName';
import UploadImage from './UploadImage';
import './Style/style.css';
moment.locale('vi');
export default function InForUser({ user, token, setUser}) {
    const dispatch = useDispatch();
    // dispatch API
    const actionUpdateNameSexUser = (data, token) => dispatch(updateNameSexUser(data, token));
    const actionUploadImageUser = (image, token) => dispatch(uploadImageUser(image, token));
    // create State
    const [isInformation, setIsInformation] = useState(false);
    const [loadingUpdateNameSexUser, setLoadingUpdateNameSexUser] = useState(false);
    const [visible, setVisible] = useState(false);
    const LoginOutlinedUser = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    //show inFor


    return (
        <>
            <div className="frofile">
                <div className="avartar-user">
                    <img src={user[0].avatar} alt={user[0].name} onClick={() => setVisible(true)} />
                </div>
                <div className="group-information">
                    <Drawer
                        title="Thông tin"
                        width={400}
                        onClose={() => setVisible(false)}
                        visible={visible}
                        className="container-information"
                    >
                        <div className="information">
                            <UploadImage
                                avatar={user[0].avatar}
                                token={token}
                                actionUploadImageUser={actionUploadImageUser}
                                setUser={setUser}
                            />
                            <div className="create-account">
                                {
                                    user[0].createdAt && (
                                        <>
                                            <span>
                                                {moment(user[0].createdAt).fromNow()}
                                            </span>
                                            <span>
                                                {moment(user[0].createdAt).subtract(1, 'days').format('DD/MM/YYYY')}
                                            </span>
                                        </>
                                    )
                                }

                            </div>
                            <div className="group-name hover-group-information">
                                <div className="icon-name">
                                    <UserOutlined className="icon-user-information" />
                                </div>
                                <div className="name-information">
                                    <p className="inforUser" style={{ 'fontWeight': '600' }}>{user[0].name}</p>
                                </div>
                            </div>
                            <div className="group-email hover-group-information">
                                <div className="icon-email">
                                    <MailOutlined className="icon-user-information" />
                                </div>
                                <div className="email-information">
                                    <p className="inforUser">{user[0].email}</p>
                                </div>
                            </div>
                            <div className="group-sex hover-group-information">
                                <div className="icon-sex">
                                    <WomanOutlined className="icon-user-information" />
                                </div>
                                <div className="sex-information">
                                    <p className="inforUser">{user[0].sex}</p>
                                </div>
                            </div>
                            <div className="group-buy-cart">
                                <div className="icon-bay-cart">
                                    <ShoppingCartOutlined className="icon-user-information" />
                                </div>
                                <div className="buy-cart-information">
                                    <Link
                                        onClick={() => { setVisible(false) }}
                                        className="inforUser"
                                        to="/history-cart"
                                    >Lịch sử mua hàng
                                         </Link>
                                </div>
                            </div>
                            <div className="group-comments">
                                <div className="icon-bay-cart">
                                    <HistoryOutlined className="icon-user-information" />
                                </div>
                                <div className="comments-information">
                                    <Link
                                        onClick={() => { setVisible(false) }}
                                        className="inforUser"
                                        to="/history-comment"
                                    >Nhật ký hoạt động
                                     </Link>
                                </div>
                            </div>
                            <div className="group-loginout hover-group-information">
                                <div className="icon-information">
                                    <LoginOutlined className="icon-user-information" style={{ 'color': '#ec1839' }} />
                                </div>
                                <div className="loginout-information hover-group-information">
                                    <button className="inforUser" style={{ 'color': '#ec1839' }} onClick={LoginOutlinedUser}>
                                        Đăng xuất
                                     </button>
                                </div>
                            </div>
                            <div className="change-information">
                                <Button
                                    block
                                    type="primary"
                                    onClick={() => setIsInformation(true)}
                                >
                                    Đổi Thông Tin
                                    </Button>
                            </div>

                        </div>
                    </Drawer>
                </div>
            </div>
            <UpdateUser
                setUser={setUser}
                user={user}
                token={token}
                isInformation={isInformation}
                setIsInformation={setIsInformation}
                actionUpdateNameSexUser={actionUpdateNameSexUser}
                loadingUpdateNameSexUser={loadingUpdateNameSexUser}
                setLoadingUpdateNameSexUser={setLoadingUpdateNameSexUser}
            />

        </>
    )
}