import { useEffect } from 'react';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import './style.css'
export default function Cart({ setPatchCart, dataCart }) {
  useEffect(() => {
    if (dataCart.length > 0) {
      setPatchCart('/cart');
    } else {
      setPatchCart(null);
    }
  }, [dataCart.length]);
  return (
    <>
      <div className="ground-card">
        <div className="main-card">
          <div className="card-user">
            <Badge
              count={dataCart.length}
              overflowCount={9}
              showZero
            >
              <Link
                to="/cart"
                className="head-example"
              >
                <i className="fa fa-shopping-cart" />
              </Link>
            </Badge>
          </div>
        </div>
      </div>
    </>
  )
};
