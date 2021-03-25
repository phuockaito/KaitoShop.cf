import { useEffect, useState, useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
// API
import { getProductId, getProductType } from "features/Product/pathAPI";
import { getCommentOne } from "features/Comment/pathAPI";
// --Components
import InForProduct from "./InForProduct";
import SeeMoreProduct from "./SeeMoreProduct/index";
import Comment from "./Comment/index";
import Loading from "loading/index";
import HistoryProduct from "./HistoryProduct/index";
import LoadingPage from "component/LoadingPage/index";
// Context
import { UserContext } from "contexts/UserContext";
// --CSS
import "./style.css";
export default function DetailProducts() {
  let historyProduct = JSON.parse(localStorage.getItem("historyProduct")) || [];
  const { key, name, _id, nsx } = useRouteMatch().params;
  document.querySelector("title").innerHTML = name
    .replace(/-/g, " ")
    .toUpperCase();
  const dispatch = useDispatch();
  // API
  const getProductTypePage = (param) => dispatch(getProductType(param));
  // create state
  const [pageComment, setPageComment] = useState(1);
  const state = useContext(UserContext);
  const { socket } = state;
  const [user] = state.user;
  const [token] = state.token;
  // Data Product ID
  const loading = useSelector((state) => state.productId.loading);
  const [dataProductsId, setDataProductsId] = useState([]);
  // Data Product See More
  const dataProductsType = useSelector((state) => state.type.listProductSlider);
  const lengthProductsType = useSelector((state) => state.type.length);
  const loadingProductsType = useSelector((state) => state.type.loading);
  // Data Comment
  const loadingComet = useSelector((state) => state.comment.loading);
  const [lengthComment, setLengthComment] = useState(null);
  const [dataComment, setDataComment] = useState([]);
  const [checkDeleteCmt, setCheckDeleteCmt] = useState(false);
  // useEffect
  const fetchComment = async () => {
    const paramsComment = {
      _id_product: _id,
      page: pageComment,
      limit: 10,
    };
    const comment = await dispatch(getCommentOne(paramsComment));
    setDataComment(comment.payload.data);
    setLengthComment(comment.payload.length);
  };
  // create Comment Socket
  useEffect(() => {
    if (socket) {
      socket.on("ServerUserCreateComment", (msg) => {
        const { comment, length, product } = msg;
        if (msg) {
          setLengthComment(length);
          setDataComment([comment, ...dataComment]);
          setCheckDeleteCmt(false);
          console.log([product]);
          setDataProductsId([product]);
        }
      });
      return () => socket.off("ServerUserCreateComment");
    }
  }, [socket, dataComment]);
  // delete Comment Socket
  useEffect(() => {
    if (socket) {
      socket.on("serverUserDeleteComment", (msg) => {
        const { comment, length } = msg;
        const dataCommentNew = [...dataComment];
        const index = dataCommentNew.findIndex(
          (cmt) => cmt._id === comment._id
        );
        dataCommentNew.splice(index, 1);
        setLengthComment(length);
        setDataComment(dataCommentNew);
        if (token && checkDeleteCmt) {
          notification.open({
            message: "Thông Báo",
            description: "Xóa Thành Công",
            icon: <CheckCircleOutlined style={{ color: "#1fbb4f" }} />,
          });
        }
        setCheckDeleteCmt(false);
      });
      return () => socket.off("serverUserDeleteComment");
    }
  }, [socket, dataComment]);

  // // get comment
  useEffect(() => {
    fetchComment();
  }, [pageComment, _id]);
  //  get one product
  useEffect(() => {
    const fetchProductIdAPI = async () => {
      const paramsType = {
        name: key,
        page: 1,
        sort_price: 0,
      };
      // fetch API Product See More
      const resultProduct = await dispatch(getProductId(_id));
      dispatch(getProductType(paramsType));
      const currentProduct = unwrapResult(resultProduct);
      setDataProductsId(currentProduct.data);
    };
    fetchProductIdAPI();
    const historyProductOld = [...historyProduct];
    historyProductOld.forEach((product, index) => {
      if (product === null || product._id === _id) {
        historyProductOld.splice(index, 1);
      }
    });
    historyProductOld.unshift(dataProductsId[0]);
    localStorage.setItem("historyProduct", JSON.stringify(historyProductOld));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [_id, key]);
  // onClick
  const onChangePage = (_page) => {
    const param = {
      name: key,
      page: _page,
      sort_price: 0,
    };
    getProductTypePage(param);
  };
  const onChangePageComment = (_page) => {
    setPageComment(pageComment + _page);
  };
  //
  const actionCheckDeleteCmt = () => {
    setCheckDeleteCmt(true);
  };

  return (
    <div className="container-detail-products">
      <div className="group-detail">
        <div className="link-group">
          <Link to="/">Trang chủ</Link>
          <Link to={`/product/${key}`}>{key}</Link>
          <Link to={`/products/${key}/${nsx}`}>{nsx.replace(/-/g, " ")}</Link>
          <span style={{ color: "#ec1839" }}>{name.replace(/-/g, " ")}</span>
        </div>
        {loading && <Loading />}
        {checkDeleteCmt && <LoadingPage />}
        <InForProduct dataProductsId={dataProductsId} />
        <Comment
          idProduct={_id}
          lengthComment={lengthComment}
          dataComment={dataComment}
          onChangePageComment={onChangePageComment}
          dataProductsId={dataProductsId}
          loadingComet={loadingComet}
          socket={socket}
          token={token}
          user={user}
          actionCheckDeleteCmt={actionCheckDeleteCmt}
        />
        <SeeMoreProduct
          data={dataProductsType}
          onChangePage={onChangePage}
          lengthProductsType={lengthProductsType}
          loading={loadingProductsType}
        />
        <HistoryProduct historyProduct={historyProduct} _id={_id} />
      </div>
    </div>
  );
}
