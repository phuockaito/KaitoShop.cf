import { Link } from 'react-router-dom';
const formatter = new Intl.NumberFormat('vn');
export default function CartItem({ cart }) {
  return (
    cart.map((items) => (
      <div className="group-card-buy-admin" key={items.product._id}>
        <div className="information-cart-admin">
          <div className="group-cart-img-name">
            <div className="history-cart-product-img">
              <img src={items.product.poster} alt={items.product._id} />
            </div>
            <div className="history-card-name">
              <Link
                to={`/detail-products?id_product=${items.product._id}&key=${items.product.key}`}
              >
                <p>{items.product.name} - <span>Size: {items.product.size}</span> </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="group-card-price-quantity">
          <div className="group-card-price">
            <span>Giá</span>
            <p>{formatter.format(items.product.price)} <u>đ</u></p>
          </div>
          <div className="group-cart-quantity">
            <span>Số lượng</span>
            <p>{items.quantity}</p>
          </div>
        </div>
      </div>
    ))
  )
};