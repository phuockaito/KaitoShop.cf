import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
// API
import { getSearch } from 'features/Search/patchAPI';
// Component
import Loading from "loading/index";
import ListItems from './ListItems';
//Css
import './style.css';
export default function Search({ location }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = queryString.parse(location.search).query.replace(/-/g, ' ');
  const page = Number(queryString.parse(location.search).page);
  // dispatch API
  const actionsGetSearch = params => dispatch(getSearch(params));
  document.querySelector('title').innerHTML = `Tìm kiếm - ${query}`;
  // create state
  const [pageUrl, setPageUrl] = useState(page);
  const [current, setCurrent] = useState(page);
  const items = 28;
  // fetch API
  const functionGetActionsGetSearch = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    const params = {
      page: page || 1,
      items: items,
      keyword: query
    };
    actionsGetSearch(params);
  };
  useEffect(() => {
    if (!page) {
      setPageUrl(1);
      setCurrent(1);
    }
    functionGetActionsGetSearch();
  }, [query]);
  useEffect(() => {
    functionGetActionsGetSearch();
    setCurrent(pageUrl);
  }, [pageUrl]);
  // Data Search
  const dataSearch = useSelector(state => state.search.data);
  const lengthSearch = useSelector(state => state.search.length);
  const loadingSearch = useSelector(state => state.search.loading);
  // function
  const onChangePage = (page) => {
    setPageUrl(page);
    const data = {
      query: query,
      page: page
    };
    const params = queryString.stringify(data);
    const url = `/search?${params}`;
    history.push(url);
  };
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
          <h3>{lengthSearch > 0 ? "Có " + lengthSearch : null} kết quả tìm kiếm cho '{query === 'undefined' ? '' : query}'</h3>
          <ListItems data={dataSearch} />
          {
            showPagination(lengthSearch)
          }
          {lengthSearch === 0 &&
            (
              <div className="group-no-data">
                <FileSearchOutlined
                  style={{ fontSize: '1.5em', color: '#596275' }}
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