import { Button, Modal } from 'antd';
import {
  EditOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
// Component
import EditAddress from './EditAddress';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
const formatter = new Intl.NumberFormat('vn');
export default function CartInForBuy({
  id_card,
  data,
  useState,
  actionPutCartStatusOrderAPI,
  token,
  actionPutCartAddressesAPI,
  loadingUpdateCartStatus,
  actionDeleteCartAPI }) {
  // create state

  const [visibleEditAddress, setVisibleEditAddress] = useState(false);
  // function
  const CancelOrder = (id_card) => {
    const data = {
      data_card: {
        status_order: false,
      },
      id_card: id_card
    }
    actionPutCartStatusOrderAPI(data, token);
  };
  const OrderCall = (id_card) => {
    const data = {
      data_card: {
        status_order: true,
      },
      id_card: id_card
    }
    actionPutCartStatusOrderAPI(data, token);
  };

  function deleteCart(id_card) {
    Modal.confirm({
      title: 'Bạn có chắc chắn xóa những giỏ hàng này không ?.',
      icon: <ExclamationCircleOutlined />,
      width: 500,
      okText: 'tiếp tục',
      cancelText: 'hủy',
      onOk() {
        actionDeleteCartAPI(id_card, token);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  return (
    <div className="group-info-buy-cart">
      <div className="group-sum-total">
        <h5>Tổng Số Tiền<p>{formatter.format(data.totalSum)} <u>đ</u></p></h5>
        <div className="button-more-info">
          <Button
            type="primary"
            className="btn-cancel-order-call"
            onClick={() => { deleteCart(id_card) }}
          >
            <DeleteOutlined /> Xóa giỏ hàng
          </Button>
          {
            !data.status_order && (<Button
              type="primary"
              className="btn-order-call"
              onClick={() => OrderCall(id_card)}
            >
              <ShoppingCartOutlined /> Đặt hàng lại
            </Button>)
          }
          {
            data.status_order ? (<Button
              type="primary"
              className="btn-cancel-order"
              onClick={() => CancelOrder(id_card)}
            >
              <CloseOutlined /> Hủy đơn hàng
            </Button>) : (
              <Button
                disabled
                type="primary"
                className="btn-cancel-order-uy"
              >
                <WarningOutlined />  Đơn hàng đã hủy
              </Button>
            )
          }
          {
            (data.status_order && !data.success) && (
              <Button
                disabled={data.success ? true : false}
                type="primary"
                className="btn-edit-address"
                onClick={() => setVisibleEditAddress(true)}
              >
                <EditOutlined />
                  Chỉnh sửa
              </Button>)
          }
          {
            data.status_order && (
              <Button
                disabled={true}
                className={`${data.success ? 'true' : 'false'}`}
              >
                {
                  data.success ? <CheckCircleOutlined /> : <LoadingOutlined />
                }
                Trạng Thái: {data.success ? 'Đã xét duyệt' : 'Chờ xét duyệt'}
              </Button>
            )
          }
          {data.message && <p className="message">{data.message}</p>}
        </div>
        <div className="ground-address-cart">
          <div className="group-address-modal">
            <span>Địa Chỉ:</span> <p>{data.address}</p>
          </div>
          <div className="group-phone-modal">
            <span>Số Điện Thoại:</span> <p>+84{data.phone}</p>
          </div>
          <div className="group-payment-modal">
            <span>Thanh Toán:</span> <p>{data.payment}</p>
          </div>
          <div className="group-time-modal">
            <span>Ngày Đặt Hàng:</span>
            <p>
              {`${moment(data.timeCart).fromNow()}, ${moment(data.timeCart).format('LLLL')}`}
            </p>
          </div>
        </div>
      </div>
      <Modal
        title="Chỉnh sửa giao hàng"
        onClose={() => setVisibleEditAddress(false)}
        visible={visibleEditAddress}
        centered
        onCancel={() => setVisibleEditAddress(false)}
        footer={null}
      >
        <EditAddress
          id_card={id_card}
          token={token}
          actionPutCartAddressesAPI={actionPutCartAddressesAPI}
          loadingUpdateCartStatus={loadingUpdateCartStatus}
          setVisibleEditAddress={setVisibleEditAddress}
        />
      </Modal>
    </div>
  )
}