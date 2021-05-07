import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, Form, Input, Drawer, Tooltip, notification } from "antd";
import "moment/locale/vi";
import {
  UserOutlined,
  HistoryOutlined,
  MailOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
  EditOutlined
} from "@ant-design/icons";
// API
import { uploadImageUser, ChangePassword } from "features/User/patchAPI";
// Component
import LoadingPage from "component/LoadingPage/index";
import UpdatePassword from "./UpdatePassword";
import UploadImage from "./UploadImage";
import "./Style/style.css";
moment.locale("vi");
export default function InForUser({ user, token, setToken, setUser, socket, idUser, setIdUser }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // dispatch API
  const actionUploadImageUser = (image, token) => dispatch(uploadImageUser(image, token));
  const actionUpChangePassword = (password, token) => dispatch(ChangePassword(password, token));
  // create State
  const [isFormValid, setIsFormValid] = useState(true);
  const [isInformation, setIsInformation] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isNameUpdate, setIsNameUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const LoginOutlinedUser = () => {
    setLoading(true);
    setVisible(false);
    setTimeout(() => {
      setToken(null);
      setUser(null);
      setIdUser(null)
      localStorage.removeItem("token");
      setLoading(false);
      notification['success']({
        message: 'Thông Báo',
        description:
          'Đăng xuất thành công.',
      });
    }, 1500);
  };
  const onChangeInformationUser = async (value) => {
    if (value) {
      socket.emit("userUpdateInformation", {
        name: value.name.trim(),
        token,
        idUser,
      });
      setIsNameUpdate(false);
      setIsFormValid(true);
      form.resetFields(["name"]);
    } else {
      setIsNameUpdate(false);
    }
  };
  const onChangeInput = e => {
    if (e.target.value.length > 0) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on("serverUpdateInformation", (data) => {
        try {
          const { id_user, user } = data;
          if (idUser == id_user) {
            setUser(user);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
    return () => socket.off("serverUpdateInformation");
  }, [socket, idUser]);
  return (
    <>
      {/* loading khi đăng xuất */}
      {loading && <LoadingPage />}
      {/* <LoadingPage /> */}
      {/* show thông tin tài khoản */}
      <div className="profile">
        <div className="avatar-user">
          <img
            src={user.avatar}
            alt={user.name}
            onClick={() => setVisible(true)}
          />
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
                avatar={user.avatar}
                token={token}
                actionUploadImageUser={actionUploadImageUser}
                setUser={setUser}
                socket={socket}
                idUser={idUser}
              />
              <div className="create-account">
                <Tooltip placement="top" title={moment(user.createdAt).format('LLLL')}>
                  <span>{moment(user.createdAt).fromNow()}</span>
                </Tooltip>
              </div>
              <div className="ground-information"><div className="group-name">
                <div className="icon-name">
                  <UserOutlined className="icon-user-information" />
                </div>
                <div className="name-information">
                  {!isNameUpdate && <>
                    <p>{user.name}</p>
                    <EditOutlined
                      className="i-edit"
                      onClick={() => { setIsNameUpdate(true) }}
                    />
                  </>}
                  {
                    isNameUpdate &&
                    <Form
                      form={form}
                      onFinish={onChangeInformationUser}
                    >
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
                        <Input
                          onChange={onChangeInput}
                          defaultValue={user.name}
                        />
                      </Form.Item>
                      <div className="group-edit-user">
                        <Button key="back" onClick={() => setIsNameUpdate(false)}>
                          Hủy
				      	        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button btn-login"
                          disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length)
                              .length || isFormValid
                          }
                        >
                          Cập nhật
                            </Button>
                      </div>
                    </Form>
                  }
                </div>
              </div>
                <div className="group-email">
                  <div className="icon-email">
                    <MailOutlined className="icon-user-information" />
                  </div>
                  <div className="email-information">
                    <p className="inForUser">{user.email}</p>
                  </div>
                </div>
                <div className="group-buy-cart">
                  <div className="icon-bay-cart">
                    <ShoppingCartOutlined className="icon-user-information" />
                  </div>
                  <div className="buy-cart-information">
                    <Link
                      onClick={() => {
                        setVisible(false);
                      }}
                      className="inForUser"
                      to="/history-cart"
                    >
                      Lịch sử mua hàng
									</Link>
                  </div>
                </div>
                <div className="group-comments">
                  <div className="icon-bay-cart">
                    <HistoryOutlined className="icon-user-information" />
                  </div>
                  <div className="comments-information">
                    <Link
                      onClick={() => {
                        setVisible(false);
                      }}
                      className="inForUser"
                      to="/history-comment"
                    >
                      Nhật ký hoạt động
									</Link>
                  </div>
                </div>
                <div className="group-logout">
                  <div className="icon-information">
                    <LoginOutlined
                      className="icon-user-information btn-logout"
                    />
                  </div>
                  <div className="logout-information">
                    <button
                      className="inForUser"
                      onClick={LoginOutlinedUser}
                    >
                      Đăng xuất
									</button>
                  </div>
                </div>
              </div>
              <div className="change-information">
                <Button
                  block
                  type="primary"
                  onClick={() => setIsInformation(true)}
                >
                  Đổi mật khẩu
								</Button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
      <UpdatePassword
        isInformation={isInformation}
        setIsInformation={setIsInformation}
        token={token}
        actionUpChangePassword={actionUpChangePassword}
      />
    </>
  );
}
