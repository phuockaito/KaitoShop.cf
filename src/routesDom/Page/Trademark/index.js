import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Pagination, Select } from 'antd';
import queryString from 'query-string';
// API
import { getProductType } from 'features/Product/pathAPI';
// Component
import Loading from 'loading/index';
import ListItems from './ListItems';
// CSS
import './style.css';
export default function Trademark({ location }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { Option } = Select;
  const { trademark } = queryString.parse(location.search);
  const page = Number(queryString.parse(location.search).page) || 1;
  const sort_price = Number(queryString.parse(location.search).sort_price) || 0;
  document.querySelector('title').innerHTML = trademark.toUpperCase();
  // state
  const [pageUrl, setPageUrl] = useState(page);
  const [sortPrice, setSortPrice] = useState(sort_price);
  const [current, setCurrent] = useState(page);
  const items = 20;
  // store
  const dataProductsType = useSelector(state => state.type.listProductSlider);
  const loadingProductsType = useSelector(state => state.type.loading);
  const lengthProductsType = useSelector(state => state.type.length);
  // dispatch API
  const actionGetProductType = params => dispatch(getProductType(params));
  //function
  const onChangePage = (page) => {
    setPageUrl(page);
    setCurrent(page);
    const data = {
      trademark: trademark,
      page: page,
      sort_price: sortPrice,
      items: items,
    };
    const params = queryString.stringify(data);
    const url = `/product?${params}`;
    history.push(url);
  };
  const onChangeSortPrice = (e) => {
    setSortPrice(e.value);
    const data = {
      trademark: trademark,
      page: pageUrl,
      sort_price: e.value,
      items: items,
    };
    const params = queryString.stringify(data);
    const url = `/product?${params}`;
    history.push(url);
  };
  //useEffect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    const params = {
      page: pageUrl,
      sort_price: sortPrice,
      items: items,
      name: trademark,
    };
    actionGetProductType(params);
  }, [pageUrl, sortPrice]);

  return (
    <>
      {loadingProductsType && <Loading />}
      <div className="group-product-trademark">
        <div className="container-product-trademark">
          <h3> {trademark}</h3>
          <div className="filter-price">
            <Select
              labelInValue
              defaultValue={{ value: sortPrice }}
              style={{ width: 150 }}
              onChange={onChangeSortPrice}
            >
              <Option value={0}>Mới nhất</Option>
              <Option value={1}>Giá  thấp đến cao</Option>
              <Option value={-1}>Giá  cao đến thấp</Option>
            </Select>
          </div>
          {
            (!loadingProductsType && lengthProductsType > 0) &&
            <ListItems
              items={dataProductsType}
            />
          }
          {
            (!loadingProductsType && lengthProductsType > 0) &&
            <Pagination
              onChange={onChangePage}
              total={lengthProductsType}
              defaultPageSize={items}
              current={current || 1}
            />
          }
        </div>
      </div>
    </>
  )
};