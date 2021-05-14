import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
// dispatch AP
import { registerUser } from "features/User/patchAPI";
import "./style.css";
const tokenLocal = localStorage.getItem("token");
document.querySelector("title").innerHTML = "Đăng Ký";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xl: {
      span: 24,
    },
  }
};
export default function Register() {
  const history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const actionRegisterAccount = account => dispatch(registerUser(account));
  //store
  const loadingSubmit = useSelector((state) => state.user.loadingSlice);
  //useEffect
  useEffect(() => {
    if (tokenLocal) {
      history.push("/");
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.getElementById('email-register').addEventListener('blur', (e) => {
      let email = e.target.value.toLowerCase();
      form.setFieldsValue({ email: email });
    })
  }, []);
  //function
  const onFinish = async (values) => {
    const data = {
      name: values.name,
      email: values.email.toLowerCase().trim(),
      password: values.password,
    };
    if (values) {
      actionRegisterAccount(data);
    }
  };

  return (
    <div className="group-register">
      <div className="main-register">
        <div className="container-register">
          <h3>Đăng Ký</h3>
          <Form
            {...formItemLayout}
            form={form}
            onFinish={onFinish}
            className="form-register"
          >
            <Form.Item
              label="Email"
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
              <Input id="email-register" className="height-min" placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
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
              <Input.Password className="height-min" placeholder="Nhập mật khẩu" />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu"
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
              <Input.Password placeholder="Nhận lại mật khẩu" className="height-min" />
            </Form.Item>
            <Form.Item
              name="name"
              label="Họ và tên"
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
              <Input placeholder="Nhập họ và tên" className="height-min" />
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
            <p>Bạn đã có tài khoản đăng nhập ngay </p>
            <Link to="/login" className="Login-form">
              tại đây
							</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
