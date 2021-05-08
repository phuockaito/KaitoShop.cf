import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Pagination, Select } from 'antd';
// API
import { getProductType } from 'features/Product/pathAPI';
// Component
import Loading from 'loading/index';
import ListItems from './ListItems';
// CSS
import './style.css';
const { Option } = Select;
export default function Trademark() {
  const { name_Trademark } = useRouteMatch().params;
  const dispatch = useDispatch();
  document.querySelector('title').innerHTML = name_Trademark.toUpperCase();

  // state
  const [page, setPage] = useState(1);
  const [sortPrice, setSortPrice] = useState(0);
  const [current, setCurrent] = useState(1);
  const items = 20;
  // store
  const dataProductsType = useSelector(state => state.type.listProductSlider);
  const loadingProductsType = useSelector(state => state.type.loading);
  const lengthProductsType = useSelector(state => state.type.length);
  //useEffect
  useEffect(() => {
    const fetchTypeAPI = () => {
      const params = {
        page: page,
        sort_price: sortPrice,
        items: items,
        name: name_Trademark,
      };
      dispatch(getProductType(params));
    }
    fetchTypeAPI();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setCurrent(page);
  }, [page, sortPrice]);
  //function
  const onChangePage = (page) => {
    setPage(page);
  }
  const onChangeSortPrice = (e) => {
    setSortPrice(e.value);
  }
  const showPagination = length => {
    if (length > 0) {
      return (
        <Pagination
          onChange={onChangePage}
          total={length}
          defaultPageSize={items}
          current={current}
        />
      )
    }
  }

  return (
    <>
      {loadingProductsType && <Loading />}
      <div className="group-product-trademark">
        <div className="container-product-trademark">
          <h3> {name_Trademark}</h3>
          <div className="filter-price">
            <Select
              labelInValue
              defaultValue={{ value: 'Mới nhất' }}
              style={{ width: 150 }}
              onChange={onChangeSortPrice}
            >
              <Option value={0}>Mới nhất</Option>
              <Option value={1}>Giá  thấp đến cao</Option>
              <Option value={-1}>Giá  cao đến thấp</Option>
            </Select>
          </div>
          {
            !loadingProductsType && dataProductsType.length > 0 && <ListItems items={dataProductsType} />
          }
          {
            !loadingProductsType && dataProductsType.length > 0 && showPagination(lengthProductsType)
          }
        </div>
      </div>
    </>
  )
};