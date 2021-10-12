import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Popconfirm } from 'antd';
import queryString from 'query-string';
// API
import { getProductId, getProductType } from "features/Product/pathAPI";
import { getCommentOne } from "features/Comment/pathAPI";
import { addCartProduct } from "features/Cart/CartSlice";
import { deleteToProduct } from 'features/Admin/Product/pathAPI';
// --Components
import InForProduct from "./InForProduct";
import SeeMoreProduct from "./SeeMoreProduct/index";
import Comment from "./Comment/index";
import Loading from "loading/index";
import HistoryProduct from "./HistoryProduct/index";
import LoadingPage from "component/LoadingPage/index";
import NotFount from '../NotFount/index';
// Context
import { UserContext } from "contexts/UserContext";
// --CSS
import "./style.css";
export default function DetailProducts({ location }) {
  const { id_product } = queryString.parse(location.search);
  const { key } = queryString.parse(location.search) || 'converse';
  const page_limit = Number(queryString.parse(location.search).page_limit) || 1;
  const page_cmt = Number(queryString.parse(location.search).page_cmt) || 1;
  let historyProduct = JSON.parse(localStorage.getItem("history_product")) || [];
  // state default
  const history = useHistory();
  const dispatch = useDispatch();
  // dispatch API
  const getProductTypeAPI = (param) => dispatch(getProductType(param));
  const actionAddToCart = cart => dispatch(addCartProduct(cart));
  const actionDeleteProduct = (id, token) => dispatch(deleteToProduct(id, token));
  // create state
  const state = useContext(UserContext);
  const { socket } = state;
  const [user,] = state.user;
  const [token,] = state.token;
  const items = 20;
  // Data Product ID
  const loading = useSelector(state => state.productId.loading);
  const [dataProductsId, setDataProductsId] = useState(null);
  const isAdmin = useSelector(state => state.user.isAdmin);
  { dataProductsId && (document.querySelector("title").innerHTML = dataProductsId.name) }
  // Data Product See More
  const dataProductsType = useSelector(state => state.type.listProductSlider);
  const lengthProductsType = useSelector(state => state.type.length);
  const loadingProductsType = useSelector(state => state.type.loading);

  // Data Comment
  const loadingComet = useSelector(state => state.comment.loading);
  const [lengthComment, setLengthComment] = useState(null);
  const [dataComment, setDataComment] = useState([]);
  const [checkDeleteCmt, setCheckDeleteCmt] = useState(false);
  const [sumStarRating, setSumStarRating] = useState(0);
  const [starRating, setStarRating] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [loadingDeleteProduct, setLoadingDeleteProduct] = useState(false);
  // Join room
  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", id_product);
    }
  }, [socket, id_product]);
  // delete reply comment
  useEffect(() => {
    if (socket) {
      socket.on("serverUserDeleteReplyComment", (msg) => {
        if (msg) {
          const { comment, id_array } = msg;
          const newReply = [...dataComment];
          const index = newReply.findIndex(comment => comment._id === id_array);
          if (index !== -1) {
            newReply[index] = comment;
          }
          setCheckDeleteCmt(false);
          setDataComment(newReply);
        }
      });
      return () => socket.off("serverUserDeleteReplyComment");
    }
  }, [socket, dataComment]);
  // crete reply comment
  useEffect(() => {
    if (socket) {
      socket.on("ServerUserCreateCommentReply", (msg) => {
        if (msg) {
          const newReply = [...dataComment];
          const index = newReply.findIndex(comment => comment._id === msg._id);
          if (index !== -1) {
            newReply[index] = msg;
          }
          setDataComment(newReply);
        }
      });
      return () => socket.off("ServerUserCreateCommentReply");
    }
  }, [socket, dataComment]);
  // update reply comment
  useEffect(() => {
    if (socket) {
      socket.on("serverUserUpdateReplyComment", (msg) => {
        if (msg) {
          const newReply = [...dataComment];
          const index = newReply.findIndex(comment => comment._id === msg._id);
          if (index !== -1) {
            newReply[index] = msg;
          }
          setDataComment(newReply);
        }
      });
      return () => socket.off("serverUserUpdateReplyComment");
    }
  }, [socket, dataComment]);
  // create Comment Socket
  useEffect(() => {
    if (socket) {
      socket.on("ServerUserCreateComment", (msg) => {
        document.getElementById('waitWriteComment').innerHTML = "";
        const { comment, length, product, starRating, sumStarRating, reviewRating } = msg;
        if (msg) {
          setStarRating(starRating);
          setSumStarRating(sumStarRating);
          setReviewRating(reviewRating);
          setLengthComment(length);
          setDataComment([comment, ...dataComment]);
          setCheckDeleteCmt(false);
          setDataProductsId(product);
        }
      });
      return () => socket.off("ServerUserCreateComment");
    }
  }, [socket, dataComment]);
  // delete Comment Socket
  useEffect(() => {
    if (socket) {
      socket.on("serverUserDeleteComment", (msg) => {
        const { comment, length, product, starRating, sumStarRating, reviewRating } = msg;
        if (msg) {
          const dataCommentNew = [...dataComment];
          const index = dataCommentNew.findIndex((cmt) => cmt._id === comment._id);
          dataCommentNew.splice(index, 1);
          setLengthComment(length);
          setDataComment(dataCommentNew);
          setCheckDeleteCmt(false);
          setDataProductsId(product);
          setStarRating(starRating);
          setSumStarRating(sumStarRating);
          setReviewRating(reviewRating);
        }
      });
      return () => socket.off("serverUserDeleteComment");
    }
  }, [socket, dataComment]);
  // up date comment
  useEffect(() => {
    if (socket) {
      socket.on("serverUserUpdateComment", (msg) => {
        const { comment, product, starRating, sumStarRating, reviewRating } = msg;
        if (msg) {
          const dataCommentNew = [...dataComment];
          const index = dataCommentNew.findIndex((cmt) => cmt._id === comment._id);
          if (index !== -1) {
            dataCommentNew[index] = comment;
          }
          setDataComment(dataCommentNew);
          setDataProductsId(product);
          setStarRating(starRating);
          setSumStarRating(sumStarRating);
          setReviewRating(reviewRating);
        }
      });
    }
    return () => socket.off("serverUserUpdateComment");
  }, [socket, dataComment]);
  // get comment
  const fetchComment = async (idProduct) => {
    const paramsComment = {
      _id_product: idProduct,
      page: page_cmt,
      limit: 5,
    };
    const resultComment = await dispatch(getCommentOne(paramsComment));
    const comment = unwrapResult(resultComment);
    if (comment) {
      setDataComment(comment.data);
      setLengthComment(comment.length);
      setStarRating(comment.starRating);
      setSumStarRating(comment.sumStarRating);
      setReviewRating(comment.reviewRating);
    }
  };
  useEffect(() => {
    if (id_product) {
      fetchComment(id_product);
    }
  }, [page_cmt, id_product]);

  // historyProductOld
  const showHistoryProduct = () => {
    const historyProductOld = [...historyProduct];
    historyProductOld.forEach((product, index) => {
      if (product === null || product._id === id_product) {
        historyProductOld.splice(index, 1);
      }
    });
    historyProductOld.unshift(dataProductsId);
    localStorage.setItem("history_product", JSON.stringify(historyProductOld));
  };
  //  get one product
  const fetchProductIdAPI = async (idProduct) => {
    const resultProduct = await dispatch(getProductId(idProduct));
    const currentProduct = unwrapResult(resultProduct);
    setDataProductsId(currentProduct.product);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (id_product) {
      fetchProductIdAPI(id_product);
    };
    showHistoryProduct();
  }, [id_product]);
  useEffect(() => {
    const param = {
      items: items,
      name: key,
      page: page_limit,
      sort_price: 0,
    };
    getProductTypeAPI(param);
  }, [page_limit, key]);
  // onClick
  const onChangePageSeenMoreProduct = (_page) => {
    const data = {
      id_product: id_product,
      key: key,
      page_limit: _page,
      page_cmt: page_cmt,
    };
    const params = queryString.stringify(data);
    const url = `/detail-products?${params}`;
    history.push(url);
  };
  const onChangePageComment = (_page) => {
    const data = {
      id_product: id_product,
      key: key,
      page_cmt: page_cmt + 1,
      page_limit: page_limit
    };
    const params = queryString.stringify(data);
    const url = `/detail-products?${params}`;
    history.push(url);
  };
  const actionCheckDeleteCmt = () => {
    setCheckDeleteCmt(true);
  };
  const onDeleteProduct = async (id) => {
    try {
      if (id) {
        setLoadingDeleteProduct(true)
        let result = await actionDeleteProduct(id, token);
        let reqDelete = unwrapResult(result);
        if (reqDelete) {
          setLoadingDeleteProduct(false);
          history.push('/');
        }
      }
    }
    catch (error) {
      setLoadingDeleteProduct(false);
      history.push('/');
    }
  };
  return (
    <>
      {/* tải trang khi vô sản phẩm or thay đổi sản phẩm đó */}
      {loading && <Loading />}
      {/* xóa bình luận sẽ show loading */}
      {checkDeleteCmt && <LoadingPage />}
      {/* loading khi admin xóa sản phẩm đó */}
      {loadingDeleteProduct && <LoadingPage />}
      {
        // kiểm tra sản phẩm có hay không
        dataProductsId ?
          <div className="container-detail-products">
            <div className="group-detail">
              {/* link nguồn sản phẩm */}
              <div className="link-group">
                <Link to="/">Trang chủ</Link>
                <Link to={`/product?trademark=${dataProductsId.key.replace(/ /g, '-')}`}>{dataProductsId.key}</Link>
                <Link to={`/product-type?nsx=${dataProductsId.NSX.replace(/ /g, '-')}`}>{dataProductsId.NSX}</Link>
                <span style={{ color: "#ec1839", fontWeight: '550' }}>{dataProductsId.name}</span>
              </div>
              {/* hiện chỉnh sữa và xóa nếu nó là  admin */}
              {
                isAdmin && token && <div className="ground-btn-admin">
                  <Popconfirm
                    title="Chắc chắn để xóa ?"
                    onConfirm={() => onDeleteProduct(id_product)}
                    okText="Có"
                    cancelText="Không"
                    placement="bottom"
                  >
                    <Button type="primary" danger Popconfirm>
                      Xóa
                  </Button>
                  </Popconfirm>
                  <Button type="primary">
                    <Link to={`/admin-edit-product/${id_product}`}> Chỉnh Sữa</Link>
                  </Button>
                </div>
              }
              {/* hiện thông tin về sản phẩm */}
              <InForProduct dataProductsId={dataProductsId} actionAddToCart={actionAddToCart} />
              {/* show tất cả bình luận và from viết bình luận */}
              <Comment
                idProduct={id_product}
                lengthComment={lengthComment}
                dataComment={dataComment}
                onChangePageComment={onChangePageComment}
                loadingComet={loadingComet}
                socket={socket}
                token={token}
                user={user}
                actionCheckDeleteCmt={actionCheckDeleteCmt}
                sumStarRating={sumStarRating}
                starRating={starRating}
                nameProduct={dataProductsId.name}
                reviewRating={reviewRating}
              />
              {/* sản phẩm đề xuất */}
              <SeeMoreProduct
                items={items}
                data={dataProductsType}
                onChangePage={onChangePageSeenMoreProduct}
                lengthProductsType={lengthProductsType}
                loading={loadingProductsType}
                pageUrl={page_limit}
              />
              {/* hiện các sản phẩm đã xem */}
              <HistoryProduct historyProduct={historyProduct} _id={id_product} />
            </div>
          </div>
          // nếu sản phẩm không có sẽ hiện trang rỗng
          : <NotFount />
      }
    </>
  );
};
