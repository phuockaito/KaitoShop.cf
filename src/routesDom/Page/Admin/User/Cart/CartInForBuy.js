import { useState } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/vi';
import {
  LoadingOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
const formatter = new Intl.NumberFormat('vn');
export default function CartInForBuy({ cart, token, id_cart, actionCheckOutCart, actionDeleteCart }) {
  //store
  const [visible, setVisible] = useState(false);
  const onSuccessCart = _id => {
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
    });
  }
  return (
    <>
      <div className="group-info-buy-cart">
        <h5>Tổng Số Tiền<p>{formatter.format(cart.totalSum)} <u>đ</u></p></h5>
        <div className="button-more-info">
          {cart.status_order && (
            <Button
              disabled={cart.success ? true : false}
              type="primary"
              className={cart.success ? "btn-success-order" : "btn-wait-order"}
              onClick={() => { onSuccessCart(id_cart) }}
            >
              {cart.success ? <CheckCircleOutlined /> : <LoadingOutlined />} Trạng Thái:  {!cart.success ? 'Chờ Phê Duyệt' : 'Đã Phê Duyệt'}
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
            <span>Số Điện Thoại:</span> <p>+84{cart.phone}</p>
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
        </div>
      </div>
    </>
  )
};