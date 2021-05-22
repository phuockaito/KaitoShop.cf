import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom';
import { FileTextOutlined } from '@ant-design/icons';
// API
import { getCartAPI, putCartStatusOrderAPI, putCartAddressesAPI, deleteCartAPI } from 'features/Cart/pathAPI';
// Component
import CartItem from './CartItem';
import CartInForBuy from './CartInForBuy';
import Loading from 'component/LoadingBtn/index';
import LoadingPage from 'component/LoadingPage/index';
import NotFount from "../NotFount/index";
// Context
import { UserContext } from 'contexts/UserContext';
// CSS
import './style.css';
const { TabPane } = Tabs;
const tokenLocal = localStorage.getItem('token');
export default function HistoryCart() {
  document.querySelector('title').innerHTML = 'Lịch sử mua hàng';
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useContext(UserContext);
  const [idUser,] = state.idUser;
  const [token,] = state.token;
  const { socket } = state;
  // useEffect
  useEffect(() => {
    if (!token && !tokenLocal) {
      history.push("/");
    }
  }, [token, tokenLocal]);

  // dispatch API
  const actionGetCartAPI = token => dispatch(getCartAPI(token));
  const actionPutCartStatusOrderAPI = (data, token) => dispatch(putCartStatusOrderAPI(data, token));
  const actionPutCartAddressesAPI = (data, token) => dispatch(putCartAddressesAPI(data, token));
  const actionDeleteCartAPI = (id_card, token) => dispatch(deleteCartAPI(id_card, token));
  // store
  const dataHistoryCart = useSelector(state => state.cart.historyCart);
  const loadingUpdateCartStatus = useSelector(state => state.cart.loadingUpdateCartStatus);
  const loadingHistoryCart = useSelector(state => state.cart.loadingHistoryCart);
  const loadingDeleteCartAPI = useSelector(state => state.cart.loadingDeleteCartAPI);
  // useEffect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    actionGetCartAPI(token);
  }, [token]);
  const showProductsBuyCartAll = CartData => {
    return (
      CartData.map((itemCart, index) => (
        <div className="cart-item-history" key={index}>
          {
            itemCart.cart.map((cart, index) => (
              <CartItem data={cart} key={index} />
            ))
          }
          <CartInForBuy
            socket={socket}
            idUser={idUser}
            token={token}
            data={itemCart}
            id_card={itemCart._id}
            actionDeleteCartAPI={actionDeleteCartAPI}
            useState={useState}
            actionPutCartStatusOrderAPI={actionPutCartStatusOrderAPI}
            actionPutCartAddressesAPI={actionPutCartAddressesAPI}
            loadingUpdateCartStatus={loadingUpdateCartStatus}
          />
        </div>
      ))
    )
  };
  // show Pending
  const showProductsBuyCartAllPending = CartData => {
    return (
      CartData.map((itemCart, index) => (!itemCart.success) && (
        <div className="cart-item-history" key={index}>
          {
            itemCart.cart.map((cart, index) => (
              <CartItem data={cart} key={index} />
            ))
          }
          <CartInForBuy
            socket={socket}
            idUser={idUser}
            token={token}
            data={itemCart}
            id_card={itemCart._id}
            actionDeleteCartAPI={actionDeleteCartAPI}
            useState={useState}
            actionPutCartStatusOrderAPI={actionPutCartStatusOrderAPI}
            actionPutCartAddressesAPI={actionPutCartAddressesAPI}
            loadingUpdateCartStatus={loadingUpdateCartStatus}
          />
        </div>
      ))
    )
  };

  // show Pending Finish
  const showProductsBuyCartAllFinish = CartData => {
    return (
      CartData.map((itemCart, index) => (itemCart.success) && (
        <div className="cart-item-history" key={index}>
          {
            itemCart.cart.map((cart, index) => (
              <CartItem data={cart} key={index} />
            ))
          }
          <CartInForBuy
            socket={socket}
            idUser={idUser}
            token={token}
            data={itemCart}
            id_card={itemCart._id}
            actionDeleteCartAPI={actionDeleteCartAPI}
            useState={useState}
            actionPutCartStatusOrderAPI={actionPutCartStatusOrderAPI}
            actionPutCartAddressesAPI={actionPutCartAddressesAPI}
            loadingUpdateCartStatus={loadingUpdateCartStatus}
          />
        </div>
      ))
    )
  };
  // show  status order
  const showProductsBuyCartStatusOrder = CartData => {
    return (
      CartData.map((itemCart, index) => (!itemCart.status_order) && (
        <div className="cart-item-history" key={index}>
          {
            itemCart.cart.map((cart, index) => (
              <CartItem data={cart} key={index} />
            ))
          }
          <CartInForBuy
            socket={socket}
            idUser={idUser}
            token={token}
            data={itemCart}
            id_card={itemCart._id}
            actionDeleteCartAPI={actionDeleteCartAPI}
            useState={useState}
            actionPutCartStatusOrderAPI={actionPutCartStatusOrderAPI}
            actionPutCartAddressesAPI={actionPutCartAddressesAPI}
            loadingUpdateCartStatus={loadingUpdateCartStatus}
          />
        </div>
      ))
    )

  };

  return (
    token ? (
      <div className="group-history-cart">
        <div className="container-history-cart">
          {loadingDeleteCartAPI && <LoadingPage />}
          <h3>LỊCH SỬ MUA HÀNG<span>({dataHistoryCart.length} sản phẩm)</span></h3>
          {loadingHistoryCart && <Loading />}
          {
            (!loadingHistoryCart && dataHistoryCart.length > 0) && (
              <Tabs defaultActiveKey="1"  >
                <TabPane
                  tab="Tất Cả"
                  key="1"
                >
                  {showProductsBuyCartAll(dataHistoryCart)}
                </TabPane>
                <TabPane
                  tab="Chờ Duyệt"
                  key="2"
                >
                  {showProductsBuyCartAllPending(dataHistoryCart)}
                </TabPane>
                <TabPane
                  tab="Đã Xét Duyệt"
                  key="3"
                >
                  {showProductsBuyCartAllFinish(dataHistoryCart)}
                </TabPane>
                <TabPane
                  tab="Đã Hủy"
                  key="4"
                >
                  {showProductsBuyCartStatusOrder(dataHistoryCart)}
                </TabPane>
              </Tabs>
            )
          }
          {
            (dataHistoryCart.length === 0 && !loadingHistoryCart) && (
              <div className="no-history-cart">
                <FileTextOutlined style={{
                  fontSize: '2em',
                  margin: '15px auto',
                }} />
                <h4>Không có gì để hiển thị</h4>
              </div>
            )
          }
        </div>
      </div>
    ) :
      (<NotFount />)
  )
};