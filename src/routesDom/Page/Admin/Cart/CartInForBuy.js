import { useState } from 'react';
import { Button, Drawer, Modal, Form, Input } from 'antd';
import { unwrapResult } from "@reduxjs/toolkit";
import moment from 'moment';
import 'moment/locale/vi';
import {
  LoadingOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  FileSearchOutlined,
  ExclamationCircleOutlined,
  MessageOutlined
} from '@ant-design/icons';
const formatter = new Intl.NumberFormat('vn');
export default function CartInForBuy({ data, token, id_cart, actionCheckOutCart, actionDeleteCart, actionMessagesCart }) {
  //store
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [visible, setVisible] = useState(false);
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
  }
  const onChangeTextArea = e => {
    setContentMessage(e.target.value.trim());
  }
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
  }
  return (
    <>
      <div className="group-info-buy-cart">
        <h5>Tổng Số Tiền<p>{formatter.format(data.totalSum)} <u>đ</u></p></h5>
        <div className="button-more-info">
          <Button
            type="primary"
            className="btn-error"
            onClick={() => setIsMessage(true)}
          >
            <MessageOutlined /> Báo cáo lỗi
          </Button>
          {data.status_order && (
            <Button
              disabled={data.success ? true : false}
              type="primary"
              className={data.success ? "btn-success-order" : "btn-wait-order"}
              onClick={() => { onSuccess(id_cart) }}
            >
              {data.success ? <CheckCircleOutlined /> : <LoadingOutlined />} Trạng Thái:  {!data.success ? 'Chờ Phê Duyệt' : 'Đã Phê Duyệt'}
            </Button>
          )}
          <Button
            type="primary"
            onClick={() => { setVisible(true) }}
          >
            <FileSearchOutlined />  Xem chi tiết đơn hàng
        </Button>
          <Button
            type="primary"
            className="btn-delete-order"
            onClick={() => { deleteCart(data._id) }}
          >
            <DeleteOutlined />  Xóa giỏ hàng
          </Button>
          {data.message && <p className="message">{data.message}</p>}
        </div>
        {!data.status_order && <span className="cancel">Đơn hàng đã hủy</span>}
      </div>
      <Drawer
        title="Chi tiết Đơn Hàng"
        width={500}
        onClose={() => setVisible(false)}
        visible={visible}
        bodyStyle={{ padding: 10 }}
        className="container-information"
        placement="bottom"
      >
        <div className="group-modal-cart">
          <div className="group-address-modal">
            <span>Địa Chỉ:</span> <p>{data.address}</p>
          </div>
          <div className="group-phone-modal">
            <span>Số Điện Thoại:</span> <p>{data.phone}</p>
          </div>
          <div className="group-payment-modal">
            <span>Thanh Toán:</span> <p>{data.payment}</p>
          </div>
          <div className="group-time-modal">
            <span>Ngày Đặt Hàng:</span>
            <p>
              {moment(data.timeCart).fromNow()}
            </p>
            <p> {moment(data.timeCart).format('LLLL')}</p>
          </div>
        </div>
      </Drawer>

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