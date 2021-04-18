import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { unwrapResult } from "@reduxjs/toolkit";
// dispatch AP
import { registerUser } from "features/User/patchAPI";
// context
import { UserContext } from "contexts/UserContext";
import "./style.css";
const tokenLocal = localStorage.getItem("token");
document.querySelector("title").innerHTML = "Đăng Ký";
export default function Register() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  const loadingSubmit = useSelector((state) => state.user.loadingSlice);
  const state = useContext(UserContext);
  const [token, setToken] = state.token;
  const [, setUser] = state.user;
  const [, setIdUser] = state.idUser;
  const history = useHistory();
  if (tokenLocal || token) {
    history.push("/");
  }

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  //function
  const onFinish = async (values) => {
    const data = {
      name: values.name,
      email: values.email.toLowerCase().trim(),
      password: values.password,
    };
    if (values) {
      const actionResult = await dispatch(registerUser(data));
      const currentUser = unwrapResult(actionResult);
      if (currentUser) {
        setToken(currentUser.token);
        setUser(currentUser.data);
        setIdUser(currentUser.data[0]._id);
      }
    }
  };

  return (
    <div className="group-register">
      <div className="main-register">
        <div className="container-register">
          <h3>Đăng Ký</h3>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              className="input-email"
              name="email"
              rules={[
                {
                  max: 50,
                  message: "E-mail quá dài!",
                },
                {
                  type: "email",
                  message: "Đầu vào không hợp lệ E-mail !",
                },
                {
                  required: true,
                  message: "Vui lòng nhập đúng E-mail !",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              className="input-password"
              name="password"
              rules={[
                {
                  min: 8,
                  message: "Mật khẩu quá ngắn ít nhất 8 ký tự !",
                },
                {
                  required: true,
                  type: "string",
                  message: "Vui lòng nhập mật khẩu của bạn !",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận lại mật khẩu !",
                  type: "string",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu bạn đã nhập không khớp !");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhận lại mật khẩu" />
            </Form.Item>
            <Form.Item
              name="name"
              pattern={[/^[a-z0-9]+$/]}
              rules={[
                {
                  required: true,
                  message: "Nhập đầy đủ tên bạn !",
                  whitespace: true,
                  type: "string",
                },
                {
                  min: 1,
                  max: 25,
                  message: "Vui lòng nhập đúng tên của bạn !",
                },
              ]}
            >
              <Input placeholder="Họ và tên" />
            </Form.Item>
            <div className="group-register-link">
              <Form.Item shouldUpdate={true}>
                {() => (
                  <Button
                    loading={loadingSubmit}
                    type="primary"
                    htmlType="submit"
                    className="btn-register"
                    disabled={
                      !form.isFieldsTouched(true) ||
                      form
                        .getFieldsError()
                        .filter(({ errors }) => errors.length).length
                    }
                  >
                    Đăng ký
                  </Button>
                )}
              </Form.Item>
            </div>
          </Form>
          <div className="connect-link">
            <p>Bạn đã có tài khoản?</p>
            <Link to="/login" className="Login-form">
              Đăng nhập
							</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
