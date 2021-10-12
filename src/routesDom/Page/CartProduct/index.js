import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FileTextOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
//dispatch
import { deleteCartProduct, updateCartProduct } from "features/Cart/CartSlice";
import { postCartAPI } from "features/Cart/pathAPI";
// --Contexts
import { UserContext } from "contexts/UserContext";
// Component
import CartItems from "./CartItems";
import CheckOut from "./CheckOut";
// --CSS
import "./style.css";
export default function CartProduct() {
  document.querySelector("title").innerHTML = "Giỏ hàng";
  const dispatch = useDispatch();

  // dispatch API
  const actionToCarAPI = (data, token) => dispatch(postCartAPI(data, token));
  const actionDeleteCart = (index) => dispatch(deleteCartProduct(index));
  const actionUpdateCartProduct = (dataCart) =>
    dispatch(updateCartProduct(dataCart));
  // --Contexts
  const state = useContext(UserContext);
  const [token,] = state.token;
  // create state
  const [visible, setVisible] = useState(false);
  // store
  const dataCart = useSelector((state) => state.cart.dataCart);
  const loadingPostCartAPI = useSelector((state) => state.cart.loadingPostCartAPI);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="container-card">
      <div className="group-card">
        <h3>
          GIỎ HÀNG <span>({dataCart.length} sản phẩm)</span>
        </h3>
        <CartItems
          setVisible={setVisible}
          dataCart={dataCart}
          token={token}
          actionUpdateCartProduct={actionUpdateCartProduct}
          actionDeleteCart={actionDeleteCart}
        />
        {dataCart.length > 0 && (
          <CheckOut
            visible={visible}
            loadingPostCartAPI={loadingPostCartAPI}
            setVisible={setVisible}
            useState={useState}
            useEffect={useEffect}
            dataCart={dataCart}
            actionToCarAPI={actionToCarAPI}
            token={token}
          />
        )}
        {dataCart.length === 0 && (
          <div className="no-data-cart">
            <FileTextOutlined
              style={{
                fontSize: "2em",
                margin: "15px auto",
              }}
            />
            <h3>Không có sản phẩm nào trong giỏ hàng của bạn.</h3>
            <Link to="/">Tiếp tục mua sắm</Link>
          </div>
        )}
      </div>
    </div>
  );
}
