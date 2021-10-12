
import { useDispatch } from 'react-redux';
// API
import { checkOutCart, deleteCart } from 'features/Admin/Cart/pathAPI';
// component
import CartItem from './CartItem';
import CartInForBuy from './CartInForBuy';
// css
import './style.css';
export default function ListProduct({ cart, token }) {
  document.querySelector('title').innerHTML = 'Danh sách mua hàng';
  const dispatch = useDispatch();

  // dispatch API
  const actionCheckOutCart = (id_cart, token) => dispatch(checkOutCart(id_cart, token));
  const actionDeleteCart = (id_cart, token) => dispatch(deleteCart(id_cart, token));

  return (
    <div className="container-admin-list">
      <div className="main-admin-list">
        {
          cart.map((cartItems, index) => (
            <div className="cart-items" key={index}>
              <CartItem
                cart={cartItems.cart}
                key={index}
              />
              <CartInForBuy
                cart={cartItems}
                token={token}
                id_cart={cartItems._id}
                actionCheckOutCart={actionCheckOutCart}
                actionDeleteCart={actionDeleteCart}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
};