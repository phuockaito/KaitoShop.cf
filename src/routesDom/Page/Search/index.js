import { useRouteMatch } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
// API
import { getSearch } from 'features/Search/patchAPI';
// Component
import Loading from "loading/index";
import ListItems from './ListItems';
//Css
import './style.css';
export default function Search() {
  const dispatch = useDispatch();
  // dispatch API
  const actionsGetSearch = params => dispatch(getSearch(params));
  const { keyWord } = useRouteMatch().params;
  document.querySelector('title').innerHTML = `Tìm kiếm - ${keyWord.trim()}`;
  // create state
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(1);
  const items = 20;
  // fetch API
  const params = { keyword: keyWord.trim(), page: page, items: items };
  useEffect(() => {
    setPage(1);
    setCurrent(1);
    actionsGetSearch(params);
  }, [keyWord]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    actionsGetSearch(params);
    setCurrent(page);
  }, [page]);
  // Data Search
  const dataSearch = useSelector(state => state.search.data);
  const lengthSearch = useSelector(state => state.search.length);
  const loadingSearch = useSelector(state => state.search.loading);
  // function
  const onChangePage = (page) => {
    setPage(page);

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
  };
  return (
    <>
      {loadingSearch && <Loading />}
      <div className="main-search">
        <div className="group-product-search">
          <h3>Kết quả tìm kiếm cho '{keyWord === 'undefined' ? '' : keyWord}'</h3>
          <ListItems data={dataSearch} />
          {
            showPagination(lengthSearch)
          }
          {lengthSearch === 0 &&
            (
              <div className="group-no-data">
                <FileSearchOutlined
                  style={{ fontSize: '4.5em', color: '#596275' }}
                />
                <p>Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn</p>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
};