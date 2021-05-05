import { useContext, useEffect, useState } from 'react';
import { Button, Form, Input } from "antd";
import { useParams, useHistory } from 'react-router-dom';
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
// dispatch AP
import { putResetPassword } from "features/User/patchAPI";
// context
import { UserContext } from "contexts/UserContext";
// component
import './style.css';
const tokenLocal = localStorage.getItem("token");
export default function ForgotPassword() {
  const history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { accessToken } = useParams();
  const [loadingFrom, setLoadingFrom] = useState(false);
  const state = useContext(UserContext);
  // create
  const [token, setToken] = state.token;
  const [, setUser] = state.user;
  const [, setIdUser] = state.idUser;
  const [patchCart,] = state.patchCart;
  // useEffect
  useEffect(async () => {
    try {
      if (token && patchCart) {
        history.push(patchCart);
      }
      else if (tokenLocal || token) {
        history.push("/");
      }
    } catch (error) {
      console.log(error)
    }
  }, [accessToken, token]);
  const onchangeResetPassword = async (value) => {
    if (value && accessToken) {
      setLoadingFrom(true)
      const data = { password: value.password.trim(), accessToken: accessToken };
      const actionResult = await dispatch(putResetPassword(data));
      const currentUser = unwrapResult(actionResult);
      if (currentUser) {
        setLoadingFrom(false);
        setToken(currentUser.token);
        setUser(currentUser.user);
        setIdUser(currentUser.user._id);
      };
    }
  };
  return (
    <>
      <div className="group-login">
        <div className="main-login">
          <div className="container-login">
            <h3>Mật Khẩu Mới</h3>
            <Form form={form} onFinish={onchangeResetPassword}>
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
                <Input.Password placeholder="Mật khẩu mới" />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhập lại mật khẩu !",
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
                <Input.Password placeholder="Nhập lại mật khẩu" />
              </Form.Item>
              <div className="group-login-link">
                <Form.Item shouldUpdate={true}>
                  {() => (
                    <Button
                      type="primary"
                      loading={loadingFrom}
                      htmlType="submit"
                      className="login-form-button btn-login"
                      disabled={
                        !form.isFieldsTouched(true) ||
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                    >
                      Lưu mật khẩu
                    </Button>
                  )}
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
};

