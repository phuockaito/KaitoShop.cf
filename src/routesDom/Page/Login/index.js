import { unwrapResult } from '@reduxjs/toolkit';
import { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// Context
import { UserContext } from 'contexts/UserContext';
//API
import { loginUser } from 'features/User/patchAPI';
import './style.css';
const tokenLocal = localStorage.getItem('token');
export default function Login() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    const [user, setUser] = useContext(UserContext);
    const loadingSubmit = useSelector(state => state.user.loadingSlice);
    const { token } = user;
    const [form] = Form.useForm();
    document.querySelector('title').innerHTML = 'Đăng Nhập';
    const dispatch = useDispatch();
    const history = useHistory();
    console.log({history})
    //check data user is
    if (tokenLocal || token) {
        history.push("/");
    }
    //function
    const onFinish = async (values) => {
        const data = {
            email: values.email,
            password: values.password,
        }
        const actionResult = await dispatch(loginUser(data));
        const currentUser = unwrapResult(actionResult);
        setUser({
            token: currentUser.accesToken,
            dataUser: currentUser.user
        })
    };
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