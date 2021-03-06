import { useRouteMatch, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StarRatings from "react-star-ratings";
import { Pagination } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { getSearch } from 'features/Search/patchAPI';
import Loading from "loading/index";
import './style.css';
const formatter = new Intl.NumberFormat('vn');
export default function Search() {
    const dispatch = useDispatch();
    const { keyWord } = useRouteMatch().params;
    document.querySelector('title').innerHTML = `Tìm kiếm - ${keyWord.trim()}`;
    // create state
    const [page, setPage] = useState(1);
    const [current, setCurrent] = useState(1);
    // fetch API
    const params = { keyword: keyWord.trim(), page: page };
    useEffect(() => {
        setPage(1);
        setCurrent(1);
        const fetchSearchAPI = async () => {
            await dispatch(getSearch(params));
        };
        fetchSearchAPI();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [keyWord]);
    useEffect(() => {
        const fetchSearchAPI = async () => {
            await dispatch(getSearch(params));
        };
        setCurrent(page);
        fetchSearchAPI();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page]);
    // Data Search
    const dataSearch = useSelector(state => state.search.data);
    const lengthSearch = useSelector(state => state.search.lenght);
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
                    defaultPageSize={16}
                    current={current}
                />
            )
        }
    };

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
    };
    return (
        <>
            {loadingSearch && <Loading />}
            <div className="main-search">
                <div className="group-product-search">
                    <h3>Kết quả tìm kiếm cho '{keyWord === 'undefined' ? '' : keyWord}'</h3>
                    <div className="group-search">
                        {dataSearch.map(product => (
                            <div className="item-products-search" key={product._id} data-aos="zoom-in">
                                <Link
                                    to={`/${product.key}/${product.NSX.replace(/ /g, '-')}/${product.name.replace(/ /g, '-')}/${product._id}`}
                                >
                                    <div className="ig-products-search">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={product.poster[0].url}
                                            alt={product._id}
                                            key={product._id}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="name-products-search">
                                        <p>{product.name}</p>
                                    </div>
                                </Link>
                                <div className="price-products-search">
                                    <div className="group-price">
                                        <span>{formatter.format(product.price)} <u>đ</u></span>
                                    </div>
                                </div>
                                <div className="group-start-review">
                                    {
                                        showReview(product.rating, product.numReviews)
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    {
                        showPagination(lengthSearch)
                    }
                    {lengthSearch === 0 && (
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