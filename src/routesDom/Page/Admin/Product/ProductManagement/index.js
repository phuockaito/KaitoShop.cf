import { useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag, Table, Tooltip, Avatar, Image, Popconfirm, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EditOutlined, CommentOutlined } from '@ant-design/icons';
//API
import { getListProduct, deleteToProduct, getCommentProduct } from 'features/Admin/Product/pathAPI';
import { deleteCommentUser } from 'features/Admin/User/pathAPI';

// context
import { UserContext } from 'contexts/UserContext';
// Component
import LoadingBtn from 'component/LoadingBtn/index';
import Loading from 'loading/index';
import LoadingPage from "component/LoadingPage/index";
import CommentProduct from "./CommentProduct";
// css
import './style.css';
export default function ProductManagement() {
  const dispatch = useDispatch();
  // create state
  const state = useContext(UserContext);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isOpenDialogComment, setIsOpenDialogComment] = useState(false);
  const [idProduct, setIdProduct] = useState(null);
  const [token] = state.token;
  // create comment
  const [limitCmt, setLimitCmt] = useState(5);
  const [pageCmt, setPageCmt] = useState(1);
  //store
  const dataProducts = useSelector(state => state.productAdmin.productData);
  const loading = useSelector(state => state.productAdmin.loading);
  const length = useSelector(state => state.productAdmin.length);
  const loadingDelete = useSelector(state => state.productAdmin.loadingDelete);
  // comment product
  const commentProduct = useSelector(state => state.productAdmin.commentProduct);
  const lengthCommentProduct = useSelector(state => state.productAdmin.lengthCommentProduct);
  const loadingGetComment = useSelector(state => state.productAdmin.loadingGetComment);
  //dispatch API
  const actionGetListProduct = params => dispatch(getListProduct(params));
  const actionGetCommentProduct = (params, token) => dispatch(getCommentProduct(params, token));
  const actionDeleteProduct = (id, token) => dispatch(deleteToProduct(id, token));
  const actionDeleteCommentUser = (params, token) => dispatch(deleteCommentUser(params, token));
  //useEffect
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    const params = {
      page: page,
      limit: limit
    };
    actionGetListProduct(params);
  }, [page, limit, page]);
  const functionActionGetCommentProduct = () => {
    const params = {
      id_product: idProduct,
      limit: limitCmt,
      page: pageCmt
    }
    actionGetCommentProduct(params, token)
  };
  //
  useEffect(() => {
    if (idProduct) {
      functionActionGetCommentProduct();
    }
  }, [pageCmt]);
  // set page if id product onchange
  useEffect(() => {
    if (idProduct) {
      functionActionGetCommentProduct();
      setPageCmt(1)
    }
  }, [idProduct]);
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
      dataIndex: 'product',
      key: 'product',
      ellipsis: {
        showTitle: false,
      },
      render: (product) => (

        <Tooltip Tooltip placement="topLeft" title={product.name} >
          <Link
            to={`/detail-products?id_product=${product._id}&key=${product.key}`}
          >
            <Tag
              color="#f5222d"
              key={product.name}
            >
              {product.name}
            </Tag>
          </Link>
        </Tooltip >
      )
    },
    {
      title: 'Ảnh',
      dataIndex: 'product',
      key: 'product',
      ellipsis: {
        showTitle: false,
      },
      render: product => (
        <Image.PreviewGroup>
          <Avatar.Group>
            <Image src={product.poster[0].url} />
            <Image src={product.poster[1].url} />
            <Image src={product.poster[2].url} />
            <Image src={product.poster[3].url} />
          </Avatar.Group>
        </Image.PreviewGroup>
      )
    },
    {
      title: 'Màu sắc',
      dataIndex: 'product',
      key: 'product',
      dataIndex: 'product',
      render: product => {
        return (
          product.color.map((color, index) => (
            <Tag color="#092b00" key={index}>
              {color}
            </Tag>
          ))
        );
      }
    },
    {
      title: 'Giới Tính',
      dataIndex: 'product',
      key: 'product',
      dataIndex: 'product',
      render: product => {
        return (
          <Tag sex="#092b00" key={product.sex}>
            {product.sex.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Nhà Xản Xuất',
      dataIndex: 'product',
      key: 'product',
      dataIndex: 'product',
      render: product => {
        return (
          <Tag color="#1890ff" key={product.key}>
            {product.key.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Bình Luận	',
      key: 'length_comment',
      dataIndex: 'length_comment',
      render: (length_comment, { product }) => {
        return (
          <>
            <span
              style={{ paddingBottom: '5px', display: 'block' }}
            >
              <Badge
                style={{ backgroundColor: '#1890ff' }}
                count={length_comment}
                overflowCount={9}
              />
            </span>
            <CommentOutlined
              style={{
                color: '#1890ff',
                fontSize: '1.2em',
                cursor: 'pointer'
              }}
              onClick={
                () => (setIsOpenDialogComment(true),
                  setIdProduct(product._id))
              }
            />
          </>
        );
      }
    },
    {
      title: 'Hoạt Động',
      key: 'product',
      dataIndex: 'product',
      fixed: 'right',
      render: product => {
        return (
          <>
            <Link to={`/admin-edit-product/${product._id}`}>
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
              onConfirm={() => deleteProduct(product._id)}
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
    <>
      <div className="ground-admin-product">
        <div className="container-admin-cart">
          {length > 0 && <h3>Có tất cả {length} sản phẩm</h3>}
          {loading && <Loading />}
          {loadingDelete && <LoadingPage />}
          {!loading && length > 0 &&
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
      {/* show list comment product */}
      {
        idProduct &&
        <CommentProduct
          token={token}
          isOpenDialogComment={isOpenDialogComment}
          setIsOpenDialogComment={setIsOpenDialogComment}
          loadingGetComment={loadingGetComment}
          lengthCommentProduct={lengthCommentProduct}
          LoadingBtn={LoadingBtn}
          commentProduct={commentProduct}
          limitCmt={limitCmt}
          setLimitCmt={setLimitCmt}
          pageCmt={pageCmt}
          setPageCmt={setPageCmt}
          actionDeleteCommentUser={actionDeleteCommentUser}
        />
      }
    </>
  )
};
