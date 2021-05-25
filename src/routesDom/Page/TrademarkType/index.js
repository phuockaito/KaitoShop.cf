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
  const page = Number(queryString.parse(location.search).page);
  const sort_price = Number(queryString.parse(location.search).sort_price);
  const dispatch = useDispatch();
  const history = useHistory();
  const { Option } = Select;
  document.querySelector('title').innerHTML = nsx.replace(/-/g, ' ').toUpperCase();
  // state
  const [pageUrl, setPageUrl] = useState(page);
  const [sortPrice, setSortPrice] = useState(sort_price);
  const [current, setCurrent] = useState(page);
  const items = 20;
  // store
  const dataTrademarkType = useSelector(state => state.trademarkType.data);
  const loadingTrademarkType = useSelector(state => state.trademarkType.loading);
  const lengthTrademarkType = useSelector(state => state.trademarkType.length);
  // dispatch Api
  const actionGetProductTrademarkType = params => dispatch(getProductTrademarkType(params));
  //useEffect
  useEffect(() => {
    if (!page && !sort_price) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      setCurrent(1);
      setSortPrice(0);
      setPageUrl(1);
      const params = {
        page: 1,
        sort_price: 0,
        items: items,
        nsx: nsx,
      };
      actionGetProductTrademarkType(params);
      console.log('nsx')
    }
  }, [nsx]);
  useEffect(() => {
    if (page || sort_price) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      const params = {
        page: pageUrl,
        sort_price: sortPrice,
        items: items,
        nsx: nsx,
      };
      actionGetProductTrademarkType(params);
      console.log('sortPrice')
    }
  }, [sortPrice]);
  useEffect(() => {
    if (page || sort_price) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      const params = {
        page: pageUrl,
        sort_price: sortPrice,
        items: items,
        nsx: nsx,
      };
      actionGetProductTrademarkType(params);
      console.log('pageUrl')
    }
  }, [pageUrl]);
  const onChangePagination = (page) => {
    setCurrent(page);
    setPageUrl(page);
    const data = {
      nsx: nsx,
      page: page,
      sort_price: sortPrice,
      items: items,
    };
    const params = queryString.stringify(data);
    const url = `/product-type?${params}`;
    history.push(url);
  };
  const onChangeSortPrice = e => {
    setSortPrice(e.value);
    const data = {
      nsx: nsx,
      page: pageUrl,
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
                defaultValue={{ value: sortPrice || 0 }}
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
                current={current || 1}
              />
            }
          </div>
        </div>
      </div>
    </>
  )
};