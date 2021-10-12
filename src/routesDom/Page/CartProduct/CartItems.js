import { Link, useHistory } from 'react-router-dom';
import { Tooltip } from 'antd';
const formatter = new Intl.NumberFormat('vn');
export default function CartItems({
  dataCart,
  setVisible,
  token,
  actionDeleteCart,
  actionUpdateCartProduct
}) {
  // const
  const history = useHistory();
  let totalSumCart = 0;
  // function
  const deleteCart = (index) => {
    actionDeleteCart(index);
  }
  const onUpdateQuantity = (index, quantity) => {
    const dataCart = {
      index: index,
      quantity: quantity
    }
    if (quantity > 0) {
      actionUpdateCartProduct(dataCart);
    }
  };
  const totalSum = cart => {
    return cart.product.price * cart.quantity;
  }
  const checkToken = () => {
    if (token) {
      setVisible(true);
    } else {
      history.push("/login");
    }
  }
  const showTotalAmount = cart => {
    if (cart.length > 0) {
      for (let index = 0; index < cart.length; index++) {
        totalSumCart += cart[index].product.price * cart[index].quantity;
      }
    };
    return totalSumCart;
  }
  return (
    dataCart.length > 0 && (
      <div className="group-card-item">
        <div className="frames-card-item">
          {
            dataCart.map((card, index) => (
              <div className="card-items" key={index}>
                <button
                  className="delete-item"
                  onClick={() => { deleteCart(index) }}
                >
                  <Tooltip placement="right" title='Xóa sản phẩm'>
                    <i className="fa fa-trash-o" />
                  </Tooltip>
                </button>
                <div className="card-image">
                  <img src={card.product.poster} alt={card.product._id} title='Xem chi tiết' />
                </div>
                <div className="card-name">
                  <Link title='Xem chi tiết'
                    to={`/detail-products?id_product=${card.product._id}&key=${card.product.key}`}
                  >
                    <p>{card.product.name} - <span>size {card.product.size}</span></p>
                  </Link>
                </div>
                <div className="card-rice">
                  <span>Giá</span>
                  <p>{formatter.format(card.product.price)} <u>đ</u></p>
                </div>
                <div className="card-quantity">
                  <span>Số lượng</span>
                  <div className="quantity-number">
                    <button
                      className="click-left"
                      onClick={() => { onUpdateQuantity(index, card.quantity - 1) }}
                    >
                      -
							      </button>
                    <div>{card.quantity}</div>
                    <button
                      className="click-right"
                      onClick={() => { onUpdateQuantity(index, card.quantity + 1) }}
                      onClick={() => card.quantity < 5 ? onUpdateQuantity(index, card.quantity + 1) : card.quantity}
                    >
                      +
							      </button>
                  </div>
                </div>
                <p className='total-sum'>Tổng cộng: {formatter.format(totalSum(card))} <u>đ</u> </p>
              </div>
            ))
          }
        </div>
        <div className="card-total-money">
          <div className="total-money">
            <h3>Thành tiền</h3>
            <div className="group-total-money">
              <p>{formatter.format(showTotalAmount(dataCart))} <u>đ</u></p>
              <span>(Đã bao gồm VAT nếu có)</span>
            </div>
            <button className="check-out" onClick={checkToken}>Tiến hành đặt hàng</button>
          </div>
        </div>
      </div>
    )
  )
}