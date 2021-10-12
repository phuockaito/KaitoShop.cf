import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Pagination, Select } from 'antd';
import queryString from 'query-string';
// API
import { getProductTrademarkType } from 'features/Product/pathAPI';
// Component
import Loading from 'loading/index';
import ListItems from './ListItems';
// Css
import './style.css';
export default function TrademarkType({ location }) {
  const { nsx } = queryString.parse(location.search);
  document.querySelector('title').innerHTML = nsx.replace(/-/g, ' ').toUpperCase();
  const page = Number(queryString.parse(location.search).page) || 1;
  const sort_price = Number(queryString.parse(location.search).sort_price) || 0;
  const dispatch = useDispatch();
  const history = useHistory();
  const { Option } = Select;
  // state
  const items = 20;
  // store
  const dataTrademarkType = useSelector(state => state.trademarkType.data);
  const loadingTrademarkType = useSelector(state => state.trademarkType.loading);
  const lengthTrademarkType = useSelector(state => state.trademarkType.length);
  // dispatch Api
  const actionGetProductTrademarkType = params => dispatch(getProductTrademarkType(params));
  //useEffect
  const fetchAPi = () => {
    const params = {
      page: page,
      sort_price: sort_price,
      items: items,
      nsx: nsx,
    };
    actionGetProductTrademarkType(params);
  };
  useEffect(() => {
    if (nsx) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      fetchAPi();
    }
  }, [nsx, sort_price, page]);
  const onChangePagination = (page) => {
    const data = {
      nsx: nsx,
      page: page,
      sort_price: sort_price,
      items: items,
    };
    const params = queryString.stringify(data);
    const url = `/product-type?${params}`;
    history.push(url);
  };
  const onChangeSortPrice = e => {
    const data = {
      nsx: nsx,
      page: page,
      sort_price: e.value,
      items: items,
    };
    const params = queryString.stringify(data);
    const url = `/product-type?${params}`;
    history.push(url);
  };
  return (
    <>
      {loadingTrademarkType && <Loading />}
      <div className="container-products-nsx">
        <div className="products-nsx">
          <div className="group-products-nsx">
            <h3>{nsx.replace(/-/g, ' ')}</h3>
            <div className="filter-price">
              <Select
                labelInValue
                defaultValue={{ value: sort_price || 0 }}
                style={{ width: 150 }}
                onChange={onChangeSortPrice}
              >
                <Option value={0}>Mới nhất</Option>
                <Option value={1}>Giá  thấp đến cao</Option>
                <Option value={-1}>Giá  cao đến thấp</Option>
              </Select>
            </div>
            {
              (!loadingTrademarkType && dataTrademarkType.length > 0) &&
              <ListItems
                items={dataTrademarkType}
              />
            }
            {
              (!loadingTrademarkType && dataTrademarkType.length > 0) &&
              <Pagination
                onChange={onChangePagination}
                total={lengthTrademarkType}
                defaultPageSize={items}
                current={page || 1}
              />
            }
          </div>
        </div>
      </div>
    </>
  )
};