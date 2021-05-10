import { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileTextOutlined } from '@ant-design/icons';
import { Select } from 'antd';
// API
import { checkOutCart, deleteCart, messagesCart, getCart } from 'features/Admin/Cart/pathAPI';
// component
import CartItem from './CartItem';
import Loading from 'component/LoadingBtn/index';
import LoadingPage from 'component/LoadingPage/index';
import CartInForBuy from './CartInForBuy';
// Context
import { UserContext } from 'contexts/UserContext';
// css
import './style.css';
export default function ListProduct() {
  document.querySelector('title').innerHTML = 'Danh sách mua hàng';
  const dispatch = useDispatch();
  const { Option } = Select;
  const state = useContext(UserContext);
  const [token,] = state.token;
  // store
  const data = useSelector(state => state.cartAdmin.data);
  const loading = useSelector(state => state.cartAdmin.loading);
  const loadingDeleteCartAPI = useSelector(state => state.cartAdmin.loadingDeleteCartAPI);
  const length = useSelector(state => state.cartAdmin.length);
  const [statusOrder, setStatusOrder] = useState('true-false');
  const [success, setSuccess] = useState('true-false');
  // dispatch API
  const actionCheckOutCart = (id_cart, token) => dispatch(checkOutCart(id_cart, token));
  const actionDeleteCart = (id_cart, token) => dispatch(deleteCart(id_cart, token));
  const actionMessagesCart = (data, token) => dispatch(messagesCart(data, token));
  const actionGetCart = param => dispatch(getCart(param));
  useEffect(() => {
    const param = {
      success: success,
      status_order: statusOrder,
    };
    actionGetCart(param);
  }, [success, statusOrder]);
  const onChangeFilter = e => {
    setSuccess(e.value[0])
    setStatusOrder(e.value[1])
  }
  return (
    <div className="ground-admin-list">
      <div className="container-admin-list">
        <h3>Tất Cả {length === 0 ? '' : length} Danh Sách Mua Hàng </h3>
        <div className="filter-success">
          <Select
            labelInValue
            defaultValue={{ value: 'Tất cả giỏ hàng' }}
            onChange={onChangeFilter}
            style={{ width: '160px', textAlign: 'left' }}
          >
            <Option value={['true-false', 'true-false']}>Tất Cả Giỏ Hàng</Option>
            <Option value={[false, true]} >Chờ Xét Duyệt</Option>
            <Option value={[false, false]} >Đã Hủy</Option>
            <Option value={[true, true]}>Đã Duyệt</Option>
          </Select>
        </div>
        <div className="main-admin-list">
          {loading && <Loading />}
          {loadingDeleteCartAPI && <LoadingPage />}
          {
            (!loading && length === 0) && <div className="no-cart">
              <FileTextOutlined style={{ fontSize: '2em' }} />
              <h4>Không có gì để hiển thị</h4>
            </div>
          }
          {
            !loading && data.map((cartItems, index) => (
              <div className="cart-items" key={index}>
                <CartItem
                  data={cartItems}
                  key={index}
                />
                <CartInForBuy
                  data={cartItems}
                  token={token}
                  id_cart={cartItems._id}
                  actionCheckOutCart={actionCheckOutCart}
                  actionDeleteCart={actionDeleteCart}
                  actionMessagesCart={actionMessagesCart}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}