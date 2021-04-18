import { useContext, useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { GoogleLogin } from 'react-google-login';
// Context
import { UserContext } from "contexts/UserContext";
//API
import { loginUser, loginGoogle } from "features/User/patchAPI";
import "./style.css";
document.querySelector("title").innerHTML = "Đăng Nhập";
const tokenLocal = localStorage.getItem("token");
export default function Login() {
  const state = useContext(UserContext);
  const [token, setToken] = state.token;
  const [, setUser] = state.user;
  const [, setIdUser] = state.idUser;
  const [patchCart,] = state.patchCart;
  const loadingSubmit = useSelector((state) => state.user.loadingSlice);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  //function
  const onFinish = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    const resultLogin = await dispatch(loginUser(data));
    const currentUser = unwrapResult(resultLogin);
    if (currentUser) {
      setToken(currentUser.accessToken);
      setUser(currentUser.user);
      setIdUser(currentUser.user[0]._id);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (token && patchCart) {
      history.push("/cart");
    } else if (tokenLocal || token) {
      history.push("/");
    }
  }, [tokenLocal, token]);

  const responseGoogle = async (response) => {
    const { tokenId } = response;
    try {
      const resultLogin = await dispatch(loginGoogle(tokenId));
      const currentUser = unwrapResult(resultLogin);
      if (currentUser) {
        setToken(currentUser.accessToken);
        setUser(currentUser.user);
        setIdUser(currentUser.user[0]._id);
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
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
        </div>
      </div>
    </div>
  );
}
