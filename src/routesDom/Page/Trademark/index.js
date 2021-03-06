import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Pagination, Select } from 'antd';
import StarRatings from "react-star-ratings";
// API
import { getProductType } from 'features/Product/pathAPI';
// Component
import Loading from 'loading/index';
// CSS
import './style.css';
const { Option } = Select;
export default function Trademark() {
    const { name_Trademark } = useRouteMatch().params;
    const dispatch = useDispatch();
    document.querySelector('title').innerHTML = name_Trademark.toUpperCase();
    const formatter = new Intl.NumberFormat('vn');
    // state
    const [page, setPage] = useState(1);
    const [sort_price, sort_price_Set] = useState(1);
    // store
    const dataProductsType = useSelector(state => state.type.listProductSlider);
    const loadingProductsType = useSelector(state => state.type.loading);
    const lengthProductsType = useSelector(state => state.type.length);
    //useEffect
    useEffect(() => {
        const fetchTypeAPI = async () => {
            const paramsType = {
                name: name_Trademark,
                page: page,
                sort_Price: sort_price
            }
            await dispatch(getProductType(paramsType));
        }
        fetchTypeAPI();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page, sort_price]);
    //function
    const onChangePage = (page) => {
        setPage(page);
    }
    const onChangeFilter = value => {
        sort_price_Set(value.value)
    }
    const showPagination = length => {
        if (length > 0) {
            return (
                <Pagination
                    onChange={onChangePage}
                    total={length}
                    defaultPageSize={16}
                />
            )
        }
    }
    const showReview = (rating, numReviews) => {
        const rate = (rating / numReviews);
        if (numReviews > 0) {
            return (
                <div className="revews-products">
                    <div className="start-review">
                        <StarRatings
                            starDimension="20px"
                            starRatedColor="#fed330"
                            starHoverColor="#fed330"
                            rating={rate}
                            starEmptyColor="white"
                        />
                    </div>
                    <p>{numReviews} đánh giá</p>

                </div >
            )
        }
        else {

            return (
                <>
                    <StarRatings
                        starDimension="20px"
                        starRatedColor="#fed330"
                        starHoverColor="#fed330"
                        starEmptyColor="none"
                        numberOfStars={5}
                    />
                    <p > Chưa có đánh giá !</p>
                </>
            )
        }
    }
    const ShowProducts = data => {
        if (data.length > 0) {
            return (
                <div className="product-trademark">
                    {
                        data.map((listProduct) => (
                            <div className="item-products-trademark" key={listProduct._id} data-aos="zoom-in">
                                <Link
                                    to={`/${listProduct.key}/${listProduct.NSX.replace(/ /g, '-')}/${listProduct.name.replace(/ /g, '-')}/${listProduct._id}`}
                                >
                                    <div className="ig-products-trademark">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={listProduct.poster[0].url}
                                            alt={listProduct._id}
                                            key={listProduct._id}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="name-products-trademark">
                                        <p>{listProduct.name}</p>
                                    </div>
                                </Link>
                                <div className="price-products-trademark">
                                    <div className="group-price">
                                        <span>{formatter.format(listProduct.price)} <u>đ</u></span>
                                    </div>
                                </div>
                                <div className="group-start-review">
                                    {
                                        showReview(listProduct.rating, listProduct.numReviews)
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
    }
    return (
        <div className="group-product-trademark">
            <div className="container-product-trademark">
                <h3> {name_Trademark}</h3>
                <div className="filter-price">
                    <Select
                        labelInValue
                        defaultValue={{ value: 'Giá tăng dần' }}
                        style={{ width: 140 }}
                        onChange={onChangeFilter}
                    >
                        <Option value={1}>Giá tăng dần</Option>
                        <Option value={-1}>Giá giảm dần</Option>
                    </Select>

                </div>
                {
                    ShowProducts(dataProductsType)
                }
                {
                    showPagination(lengthProductsType)
                }
                {loadingProductsType && <Loading />}
            </div>
        </div>
    )
}