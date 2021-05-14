import { useEffect } from 'react';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
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
          <Badge
            count={dataCart.length}
            overflowCount={9}
            showZero
            className="length-cart"
          >
            <Link
              to="/cart"
              className="head-example"
            >
              <ShoppingCartOutlined
                className="icon-cart"
              />
            </Link>
          </Badge>
        </div>
      </div>
    </>
  )
};
