import { useContext, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// Context
import { UserContext } from 'contexts/UserContext';
//API
import { loginUser } from 'features/User/patchAPI';
import './style.css';
document.querySelector('title').innerHTML = 'Đăng Nhập';
const tokenLocal = localStorage.getItem('token');
export default function Login() {
    const state = useContext(UserContext);
    const [token, setToken] = state.token;
    const [user, setUser] = state.user;
    const [patchCart, setPatchCart] = state.patchCart;
    const loadingSubmit = useSelector(state => state.user.loadingSlice);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    //function
    const onFinish = async (values) => {
        const data = {
            email: values.email,
            password: values.password,
        }
        const resultLogin = await dispatch(loginUser(data));
        const currentUser = unwrapResult(resultLogin);
        if (currentUser) {
            setToken(currentUser.accesToken);
            setUser(currentUser.user);
        }
    };
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        if (token && patchCart) {
            history.push('/cart');
        }
        else if (tokenLocal || token) {
            history.push("/");
        };

    }, [tokenLocal, token])
    return (
        < div className="group-login" >
            <div className="main-login">
                <div className="container-login">
                    <h3>Chào Mừng</h3>
                    <Form
                        form={form}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            className="input-email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'E-mail không hợp lệ !',
                                },
                                {
                                    required: true,
                                    message: 'Vui lòng nhập đúng E-mail !',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            className="input-password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    type: 'string',
                                    message: 'Vui lòng nhập mật khẩu của bạn !',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <div className='group-login-link'>
                            <Form.Item
                                shouldUpdate={true}
                            >
                                {
                                    () => (
                                        <Button
                                            type="primary"
                                            loading={loadingSubmit}
                                            htmlType="submit"
                                            className="login-form-button btn-login"
                                            disabled={
                                                !form.isFieldsTouched(true) ||
                                                form.getFieldsError().filter(({ errors }) => errors.length).length
                                            }
                                        >
                                            Đăng Nhập
                                        </Button>
                                    )
                                }
                            </Form.Item>

                            <Link
                                to="/register"
                                className="btn-register"
                            >Tạo tài khoản</Link>
                        </div>
                    </Form>
                </div>
            </div>
        </ div>
    )
};