import React from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined } from '@ant-design/icons';

import './style.css'
 
export default function Cart() {
    const dataCard = useSelector(state => state.cart.dataCart);
    return (
        <>
            <div className="ground-card">
                <div className="main-card">
                    <div className="card-user">
                        <Badge 
                        count={dataCard.length} 
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
}
