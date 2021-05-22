import { useState } from 'react';
import { Button, Modal, Form, Input, Image } from 'antd';
import { unwrapResult } from "@reduxjs/toolkit";
import moment from 'moment';
import 'moment/locale/vi';
import {
  LoadingOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MessageOutlined
} from '@ant-design/icons';
const formatter = new Intl.NumberFormat('vn');
export default function CartInForBuy({
  cart,
  userByCart,
  token,
  id_cart,
  actionCheckOutCart,
  actionDeleteCart,
  actionMessagesCart
}) {
  //store
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [isMessage, setIsMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contentMessage, setContentMessage] = useState('');
  // function

  const onChangeFromMessage = async () => {
    if (contentMessage) {
      setLoading(true);
      const dataMessage = {
        id_cart: id_cart,
        message: contentMessage
      };
      const result = await actionMessagesCart(dataMessage, token);
      const resultCart = unwrapResult(result);
      if (resultCart) {
        setLoading(false);
        setIsMessage(false)
      }
    }
  };
  const onChangeTextArea = e => {
    setContentMessage(e.target.value.trim());
  };
  const onSuccess = _id => {
    actionCheckOutCart(_id, token);
  };

  const deleteCart = (id_cart) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn xóa những giỏ hàng này không ?.',
      icon: <ExclamationCircleOutlined />,
      width: 500,
      okText: 'tiếp tục',
      cancelText: 'hủy',
      onOk() {
        actionDeleteCart(id_cart, token);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <>
      <div className="group-info-buy-cart">
        <h5>Tổng Số Tiền<p>{formatter.format(cart.totalSum)} <u>đ</u></p></h5>
        <div className="button-more-info">
          <Button
            type="primary"
            className="btn-error"
          // onClick={() => setIsMessage(true)}
          >
            <MessageOutlined /> Báo cáo lỗi
          </Button>
          {cart.status_order && (
            <Button
              disabled={cart.success ? true : false}
              type="primary"
              className={cart.success ? "btn-success-order" : "btn-wait-order"}
              onClick={() => { onSuccess(id_cart) }}
            >
              {cart.success ? <CheckCircleOutlined /> : <LoadingOutlined />} Trạng Thái:  {!cart.success ? 'Chờ Phê Duyệt' : 'Đã Phê Duyệt'}
            </Button>
          )}
          <Button
            type="primary"
            className="btn-delete-order"
            onClick={() => { deleteCart(cart._id) }}
          >
            <DeleteOutlined />  Xóa giỏ hàng
          </Button>
          {cart.message && <p className="message">{cart.message}</p>}
        </div>
        {!cart.status_order && <span className="cancel">Đơn hàng đã hủy</span>}
        <div className="ground-address-cart">
          <div className="group-address-modal">
            <span>Địa Chỉ:</span> <p>{cart.address}</p>
          </div>
          <div className="group-phone-modal">
            <span>Số Điện Thoại:</span> <p>{cart.phone}</p>
          </div>
          <div className="group-payment-modal">
            <span>Thanh Toán:</span> <p>{cart.payment}</p>
          </div>
          <div className="group-time-modal">
            <span>Ngày Đặt Hàng:</span>
            <p>
              {`${moment(cart.timeCart).fromNow()}, ${moment(cart.timeCart).format('LLLL')}`}
            </p>
          </div>
          <div className="ground-user-by-cart">
            <ul>
              <li> <span>Ảnh:</span><p> <Image style={{ width: '50px', borderRadius: '50%' }} src={userByCart.avatar} /></p></li>
              <li> <span>Tên:</span><p class="name-user-by-cart">{userByCart.name}</p></li>
              <li> <span>Email:</span><p>{userByCart.email}</p></li>
            </ul>
          </div>
        </div>
      </div>
      {/*  */}
      <Modal
        visible={isMessage}
        title="Thông Báo Message"
        onCancel={() => setIsMessage(false)}
        className="ground-message"
        footer={[
          <Form form={form} onFinish={onChangeFromMessage}>
            <Button key="back" onClick={() => setIsMessage(false)}>
              Hủy
					</Button>
            <Button
              key="submit"
              htmlType="submit"
              type="primary"
              loading={loading}
              disabled={contentMessage ? false : true}
            >
              cập Nhật
					</Button>
          </Form>,
        ]}
      >
        <Form.Item name="message">
          <TextArea
            placeholder="Mời bạn để lại bình luận"
            rows={5}
            max={20}
            onChange={onChangeTextArea}
            maxLength={150}
            id="message"
          />
          <p className="length-content-message">{contentMessage.length}/100</p>
        </Form.Item>
      </Modal>
    </>
  )
}