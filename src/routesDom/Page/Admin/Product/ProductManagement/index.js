import { useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag, Table, Tooltip, Avatar, Image, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
//API
import { getListProduct, deleteToProduct } from 'features/Admin/Product/pathAPI';
// context
import { UserContext } from 'contexts/UserContext';
// Component
import Loading from 'loading/index';
import LoadingPage from "component/LoadingPage/index";
// css
import './style.css';
export default function ProductManagement() {
  const dispatch = useDispatch();
  // create state
  const state = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [token] = state.token;
  //State
  const dataProducts = useSelector(state => state.productAdmin.data);
  const loading = useSelector(state => state.productAdmin.loading);
  const length = useSelector(state => state.productAdmin.length);
  const loadingDelete = useSelector(state => state.productAdmin.loadingDelete);
  //dispatch API
  const actionGetListProduct = params => dispatch(getListProduct(params));
  const actionDeleteProduct = (id, token) => dispatch(deleteToProduct(id, token));
  //useEffect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    const params = {
      page: page,
      limit: limit
    }
    actionGetListProduct(params);
  }, [page, limit]);
  // function
  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    setPage(current);
    setLimit(pageSize);
  };

  const pagination = {
    total: length,
    current: page,
    pageSize: limit,
    position: ['bottomCenter']
  };

  const deleteProduct = id => {
    actionDeleteProduct(id, token);
  };

  const Columns = [
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: (name, product) => (
        <Tooltip placement="topLeft" title={name}>
          <Link
            to={`/${product.key}/${product.NSX.replace(/ /g, '-')}/${product.name.replace(/ /g, '-')}/${product._id}`}>
            <Tag
              color="#f5222d"
              key={name}
            >
              {name}
            </Tag>
          </Link>
        </Tooltip>
      )
    },
    {
      title: 'Ảnh',
      dataIndex: 'poster',
      key: 'poster',
      ellipsis: {
        showTitle: false,
      },
      render: poster => (
        <Image.PreviewGroup>
          <Avatar.Group>
            <Image src={poster[0].url} />
            <Image src={poster[1].url} />
            <Image src={poster[2].url} />
            <Image src={poster[3].url} />
          </Avatar.Group>
        </Image.PreviewGroup>
      )
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      key: 'color',
      dataIndex: 'color',
      render: color => {
        return (
          color.map((color, index) => (
            <Tag color="#092b00" key={index}>
              {color}
            </Tag>
          ))
        );
      }
    },
    {
      title: 'Giới Tính',
      dataIndex: 'sex',
      key: 'sex',
      dataIndex: 'sex',
      render: sex => {
        return (
          <Tag sex="#092b00" key={sex}>
            {sex.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Nhà Xản Xuất',
      dataIndex: 'key',
      key: 'key',
      dataIndex: 'key',
      render: key => {
        return (
          <Tag color="#1890ff" key={key}>
            {key.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Bộ Sưu Tập',
      dataIndex: 'collections',
      key: 'collections',
      render: collections => {
        return (
          <Tooltip placement="topLeft" title={collections}>
            <Tag color="#389e0d" key={collections}>
              {collections.toUpperCase()}
            </Tag>
          </Tooltip>
        );
      }
    },
    {
      title: 'Loại Sản Phẩm',
      dataIndex: 'productType',
      key: 'productType',
      render: productType => {
        return (
          <Tooltip placement="topLeft" title={productType}>
            <Tag color="#fa8c16" key={productType}>
              {productType.toUpperCase()}
            </Tag>
          </Tooltip>
        );
      }
    },
    {
      title: 'Dòng Sản Phẩm',
      key: 'NSX',
      dataIndex: 'NSX',
      render: NSX => {
        return (
          <Tooltip placement="topLeft" title={NSX}>
            <Tag color="#eb2f96" key={NSX}>
              {NSX.toUpperCase()}
            </Tag>
          </Tooltip>
        );
      }
    },
    {
      title: 'Hoạt Động',
      key: '_id',
      dataIndex: '_id',
      fixed: 'right',
      render: _id => {
        return (
          <>
            <Link to={`/admin-edit-product/${_id}`}>
              <EditOutlined
                style={{
                  fontSize: '1.5em',
                  padding: '0 7px',
                  color: '#1890ff'
                }}
              />
            </Link>
            <Popconfirm
              title="Chắc chắn để xóa ?"
              onConfirm={() => deleteProduct(_id)}
              okText="Có"
              cancelText="Không"
              placement="leftTop"
            >

              <DeleteOutlined
                style={{
                  fontSize: '1.5em',
                  padding: '0 7px',
                  color: '#f5222d'
                }}
              />
            </Popconfirm>
          </>
        );
      }
    }
  ];

  return (
    <div className="ground-admin-product">
      <div className="container-admin-cart">
        {dataProducts.length > 0 && <h3>Có tất cả {length} sản phẩm</h3>}
        {loading && <Loading />}
        {loadingDelete && <LoadingPage />}
        {!loading && dataProducts.length > 0 &&
          <Table
            className="ground-table"
            columns={Columns}
            dataSource={dataProducts}
            pagination={pagination}
            onChange={handleTableChange}
            scroll={{ x: 1100 }}
          />
        }
      </div>
    </div>
  )
};
