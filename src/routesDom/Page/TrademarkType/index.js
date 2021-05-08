import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from "react-router-dom";
import { Pagination, Select } from 'antd';
// API
import { getProductTrademarkType } from 'features/Product/pathAPI';
// Component
import Loading from 'loading/index';
import ListItems from './ListItems';
// Css
import './style.css';
const { Option } = Select;

export default function TrademarkType() {
  const dispatch = useDispatch();
  const { NSX } = useRouteMatch().params;
  document.querySelector('title').innerHTML = NSX.replace(/-/g, ' ').toUpperCase();
  // state
  const [page, setPage] = useState(1);
  const [sortPrice, setSortPrice] = useState(0);
  const [current, setCurrent] = useState(1);
  const items = 20;
  // store
  const dataTrademarkType = useSelector(state => state.trademarkType.data);
  const loadingTrademarkType = useSelector(state => state.trademarkType.loading);
  const lengthTrademarkType = useSelector(state => state.trademarkType.length);
  const params = {
    page: page,
    sort_price: sortPrice,
    items: items,
    nsx: NSX,
  };
  //useEffect
  useEffect(() => {
    setCurrent(1);
    setPage(1);
    const fetchTrademarkTypeAPI = async () => {
      await dispatch(getProductTrademarkType(params));
    };
    fetchTrademarkTypeAPI();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [NSX]);
  useEffect(() => {
    const fetchTrademarkTypeAPI = async () => {
      await dispatch(getProductTrademarkType(params));
    }
    setCurrent(page);
    fetchTrademarkTypeAPI();
  }, [page, sortPrice]);
  const onChangePagination = (page) => {
    setPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  };
  const onChangeFilter = value => {
    setSortPrice(value.value)
  };
  const showPagination = length => {
    if (length > 0) {
      return (
        <Pagination
          onChange={onChangePagination}
          total={length}
          defaultPageSize={items}
          current={current}
        />
      )
    }
  };

  return (
    <>
      {loadingTrademarkType && <Loading />}
      <div className="container-products-nsx">
        <div className="products-nsx">
          <div className="group-products-nsx">
            <h3>{NSX.replace(/-/g, ' ')}</h3>
            <div className="filter-price">
              <Select
                labelInValue
                defaultValue={{ value: 'Mới nhất' }}
                style={{ width: 150 }}
                onChange={onChangeFilter}
              >
                <Option value={0}>Mới nhất</Option>
                <Option value={1}>Giá  thấp đến cao</Option>
                <Option value={-1}>Giá  cao đến thấp</Option>
              </Select>
            </div>
            {
              !loadingTrademarkType && dataTrademarkType.length > 0 && <ListItems items={dataTrademarkType} />
            }
            {
              !loadingTrademarkType && dataTrademarkType.length > 0 && showPagination(lengthTrademarkType)
            }
          </div>
        </div>
      </div>
    </>
  )
}