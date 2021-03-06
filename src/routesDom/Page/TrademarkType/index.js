import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Link } from "react-router-dom";
import { Pagination, Select } from 'antd';
import StarRatings from "react-star-ratings";
import { LazyLoadImage } from 'react-lazy-load-image-component';
// API
import { getProductTrademarkType } from 'features/Product/pathAPI';
import Loading from 'loading/index';
import './style.css';
const { Option } = Select;
const formatter = new Intl.NumberFormat('vn');

export default function TrademarkType() {
    const dispatch = useDispatch();
    const { NSX, key } = useRouteMatch().params;
    document.querySelector('title').innerHTML = NSX.replace(/-/g, ' ').toUpperCase();
    // state
    const [page, setPage] = useState(1);
    const [sort_price, sort_price_Set] = useState(1);
    const [current, setCurrent] = useState(1);
    // store
    const dataTrademarkType = useSelector(state => state.trademarkType.data);
    const loadingTrademarkType = useSelector(state => state.trademarkType.loading);
    const lengthTrademarkType = useSelector(state => state.trademarkType.length);
    const paramsType = {
        key: key,
        NSX: NSX,
        page: page,
        sort_price: sort_price
    }

    //useEffect
    useEffect(() => {
        setCurrent(1);
        setPage(1);
        const fetchTrademarkTypeAPI = async () => {
            await dispatch(getProductTrademarkType(paramsType));
        };
        fetchTrademarkTypeAPI();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [NSX]);
    useEffect(() => {
        const fetchTrademarkTypeAPI = async () => {
            await dispatch(getProductTrademarkType(paramsType));
        }
        setCurrent(page);
        fetchTrademarkTypeAPI();

    }, [page, sort_price]);
    // funtions
    const onChangePagination = (page) => {
        setPage(page);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    const onChangeFilter = value => {
        sort_price_Set(value.value)
    }
    const showPagination = length => {
        if (length > 0) {
            return (
                <Pagination
                    onChange={onChangePagination}
                    total={length}
                    defaultPageSize={12}
                    current={current}
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
                            starDimension="16px"
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
                        starDimension="16px"
                        starRatedColor="#fed330"
                        starHoverColor="#fed330"
                        starEmptyColor="none"
                        numberOfStars={5}
                    />
                    <p >Chưa có đánh giá</p>
                </>
            )
        }
    }
    return (
        <div className="container-products-nsx">
            <div className="products-nsx">
                <div className="group-products-nsx">
                    <h3>{NSX.replace(/-/g, ' ')}</h3>
                    <div className="filter-price">
                        <Select
                            labelInValue
                            defaultValue={{ value: 'Giá tăng dần' }}
                            style={{ width: 140 }}
                            onChange={onChangeFilter}
                        >
                            <Option value="1">Giá tăng dần</Option>
                            <Option value="-1">Giá giảm dần</Option>
                        </Select>
                    </div>
                    <div className="list-products-nsx">
                        {dataTrademarkType.map((products_nsx) => (
                            <div className="item-products-nsx" key={products_nsx._id} data-aos="zoom-in">
                                <Link
                                    to={`/${products_nsx.key}/${products_nsx.NSX.replace(/ /g, '-')}/${products_nsx.name.replace(/ /g, '-')}/${products_nsx._id}`}
                                >
                                    <div className="ig-products-nsx">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={products_nsx.poster[0].url}
                                            alt={products_nsx._id}
                                            key={products_nsx._id}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="name-products-nsx">
                                        <p>{products_nsx.name}</p>
                                    </div>
                                </Link>
                                <div className="price-products-nsx">
                                    <div className="group-price">
                                        <span>{formatter.format(products_nsx.price)}đ</span>
                                    </div>
                                </div>
                                <div className="group-start-review">
                                    {
                                        showReview(products_nsx.rating, products_nsx.numReviews)
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    {
                        showPagination(lengthTrademarkType)
                    }
                </div>
                {loadingTrademarkType && <Loading />}
            </div>
        </div>
    )
}