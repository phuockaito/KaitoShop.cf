import { useContext, useEffect, useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Input, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined, GooglePlusOutlined } from "@ant-design/icons";
import { GoogleLogin } from 'react-google-login';
// Context
import { UserContext } from "contexts/UserContext";
//API
import { loginUser, loginGoogle, postForgotPassword } from "features/User/patchAPI";
import "./style.css";
document.querySelector("title").innerHTML = "Đăng Nhập";
const tokenLocal = localStorage.getItem("token");
export default function Login() {
  const [form] = Form.useForm();
  const [formForget] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useContext(UserContext);
  // state
  const [token, setToken] = state.token;
  const [, setUser] = state.user;
  const [, setIdUser] = state.idUser;
  const [patchCart,] = state.patchCart;
  const [isForgotPassword, setIsForgetPassword] = useState(false);
  // store
  const loadingSubmit = useSelector((state) => state.user.loadingSlice);
  // dispatch api
  const actionPostForgotPassword = email => dispatch(postForgotPassword(email));
  // from login
  const onFinish = async (values) => {
    const data = {
      email: values.email.toLowerCase().trim(),
      password: values.password,
    };
    const resultLogin = await dispatch(loginUser(data));
    const currentUser = unwrapResult(resultLogin);
    if (currentUser) {
      setToken(currentUser.accessToken);
      setUser(currentUser.user);
      setIdUser(currentUser.user._id);
    }
  };
  // show from forget password
  const onChangeForgetPassword = value => {
    if (value) {
      actionPostForgotPassword(value);
    }
  }
  //useEffect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (token && patchCart) {
      history.push(patchCart);
    } else if (tokenLocal || token) {
      history.push("/");
    };
    document.getElementById('email-login').addEventListener('blur', (e) => {
      let email = e.target.value.toLowerCase();
      form.setFieldsValue({ email: email });
    })
  }, [tokenLocal, token]);
  // login with google
  const responseGoogle = async (response) => {
    const { tokenId } = response;
    try {
      const resultLogin = await dispatch(loginGoogle(tokenId));
      const currentUser = unwrapResult(resultLogin);
      if (currentUser) {
        setToken(currentUser.accessToken);
        setUser(currentUser.user);
        setIdUser(currentUser.user._id);
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="group-login">
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
                    type: "email",
                    message: "E-mail không hợp lệ !",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập đúng E-mail !",
                  },
                ]}
                hasFeedback
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  id="email-login"
                />
              </Form.Item>
              <Form.Item
                className="input-password"
                name="password"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Vui lòng nhập mật khẩu của bạn !",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <div className="group-login-link">
                <Form.Item shouldUpdate={true}>
                  {() => (
                    <Button
                      type="primary"
                      loading={loadingSubmit}
                      htmlType="submit"
                      className="login-form-button btn-login"
                      disabled={
                        !form.isFieldsTouched(true) ||
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                    >
                      Đăng Nhập
                    </Button>
                  )}
                </Form.Item>
              </div>
            </Form>
            <div className="connect-with-internet">
              <p>hoặc đăng nhập bằng</p>
              <GoogleLogin
                className="btn-google-login"
                clientId="122492016743-0svnvv3husl2v3mo7kpcvuaubt2t10t6.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className="connect-link">
              <p>Bạn chưa có tài khoản?</p>
              <Link to="/register" className="btn-register">
                Đăng ký ngay
							</Link>
            </div>
            <div className="forgot-password">
              <p onClick={() => (setIsForgetPassword(true))}>Quên mật khẩu</p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        title="Nhập Email khôi phục mật khẩu"
        visible={isForgotPassword}
        onCancel={() => (setIsForgetPassword(false))}
        cancelText="Hủy"
        okText="Gửi Email"
        footer={[
          <Form form={formForget} onFinish={onChangeForgetPassword}>
            <Button key="back" onClick={() => setIsForgetPassword(false)}>
              Hủy
          </Button>
            <Button
              key="submit"
              htmlType="submit"
              type="primary"
            // loading={loading}
            >
              Gửi Email
          </Button>
          </Form>,
        ]}
      >
        <Form form={formForget}>
          <Form.Item
            name="email"
            className="input-email"
            rules={[
              {
                type: "email",
                message: "E-mail không hợp lệ !",
              },
              {
                required: true,
                message: "Vui lòng nhập đúng E-mail !",
              },
            ]}
            hasFeedback
          >
            <Input
              prefix={<GooglePlusOutlined />}
              placeholder="Email"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
