import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
//API
import { getListProduct } from 'features/Admin/Product/pathAPI';
// Component
import LoadingPage from 'loading/index';
import Columns from './Columns';
// css
import './style.css';
export default function Product() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const dataProducts = useSelector(state => state.productAdmin.data);
  const loading = useSelector(state => state.productAdmin.loading);
  const length = useSelector(state => state.productAdmin.length);

  useEffect(() => {
    const fetchAPIListProduct = async () => {
      const params = {
        page: page,
        limit: limit
      }
      await dispatch(getListProduct(params));
    };
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    fetchAPIListProduct();
  }, [page, limit]);
  const handleTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    setPage(current);
    setLimit(pageSize);
  }
  const pagination = {
    total: length,
    position: ['bottomCenter']
  }

  return (
    <div className="ground-admin-product">
      <div className="container-admin-cart">
        <Link to="/admin-new-product"> <Button className="add-product" type="primary">Thêm Sản Phẩm</Button></Link>
        {loading && <LoadingPage />}
        {dataProducts.length > 0 &&
          <Table
            className="ground-table"
            columns={Columns}
            dataSource={dataProducts}
            pagination={pagination}
            onChange={handleTableChange}
            position={'bottomCenter'}
            scroll={{ x: 1100 }}
          />}
      </div>
    </div>
  )
}