import { useEffect, useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// API
import { getProductId, getProductType } from 'features/Product/pathAPI';
import { getCommentOne } from 'features/Comment/pathAPI';
// --Components
import InForProduct from './InForProduct';
import SeeMoreProduct from './SeeMoreProduct/index';
import Comment from './Comment/index';
import Loading from "loading/index";
import HistoryProduct from './HistoryProduct/index';
// --CSS
import './style.css';
export default function DetailProducts() {
    let historyProduct = JSON.parse(localStorage.getItem('historyProduct')) || [];
    const { key, name, _id, nsx } = useRouteMatch().params;
    document.querySelector('title').innerHTML = name.replace(/-/g, ' ').toUpperCase();
    const dispatch = useDispatch();
    const getProductTypePage = (param) => dispatch(getProductType(param));
    // create state
    const [pageComment, setPageComment] = useState(1);
    // Data Product ID
    const loading = useSelector(state => state.productId.loading);
    const dataProductsId = useSelector(state => state.productId.data);
    // Data Product See More
    const dataProductsType = useSelector(state => state.type.listProductSlider);
    const lengthProductsType = useSelector(state => state.type.length);
    const loadingProductsType = useSelector(state => state.type.loading);
    // Data Comment
    const dataComment = useSelector(state => state.comment.data);
    const lengthComment = useSelector(state => state.comment.length);
    const loadingComet = useSelector(state => state.comment.loading);
    // useEffect
    useEffect(() => {
        const fetchComment = async () => {
            const paramsComment = {
                _id_product: _id,
                page: pageComment,
                limit: 5
            }
            await dispatch(getCommentOne(paramsComment));
        }
        fetchComment();
    }, [pageComment, _id]);
    // get one product 
    useEffect(() => {
        const fetchProductIdAPI = async () => {
            // fetch API Product See More
            await dispatch(getProductId(_id));
            // fetch API Product See More
            const paramsType = {
                name: key,
                page: 1,
                sort_price: 0
            }
            await dispatch(getProductType(paramsType));
        }
        fetchProductIdAPI();
        const historyProductOld = [...historyProduct];
        historyProductOld.forEach((product, index) => {
            if (product === null || product._id === _id) {
                historyProductOld.splice(index, 1);
            }
        })
        historyProductOld.unshift(dataProductsId[0]);
        localStorage.setItem('historyProduct', JSON.stringify(historyProductOld));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [_id, key]);
    // onClick
    const onChangePage = _page => {
        const param = {
            name: key,
            page: _page,
            sort_price: 0
        }
        getProductTypePage(param);
    }
    const onChangePageComment = _page => {
        setPageComment(pageComment + _page)
    }
    //

    return (
        <div className="container-detail-products">
            <div className="group-detail">
                <div className="link-group">
                    <Link to='/'>Trang chủ</Link>
                    <Link to={`/product/${key}`}>{key}</Link>
                    <Link to={`/products/${key}/${nsx}`}>{nsx.replace(/-/g, ' ')}</Link>
                    <span>{name.replace(/-/g, ' ')}</span>
                </div>
                {loading && <Loading />}
                <InForProduct
                    dataProductsId={dataProductsId}
                    loading={loading}
                />
                <Comment
                    idProduct={_id}
                    lengthComment={lengthComment}
                    dataComment={dataComment}
                    onChangePageComment={onChangePageComment}
                    dataProductsId={dataProductsId}
                    loadingComet={loadingComet}
                />
                <SeeMoreProduct
                    data={dataProductsType}
                    onChangePage={onChangePage}
                    lengthProductsType={lengthProductsType}
                    loading={loadingProductsType}
                />
                < HistoryProduct
                    historyProduct={historyProduct}
                    _id={_id}
                />
            </div>
        </div>
    );

}