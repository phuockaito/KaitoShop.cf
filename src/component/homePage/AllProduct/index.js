import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings";
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './style.css';
import Loading from 'component/LoadingBtn/index';
export default function AllProduct({ data, loading, lengthAllProduct, onChangePage }) {
    const formatter = new Intl.NumberFormat('vn');
    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => {
        setBtnLoading(false);
    }, [data.length]);
    const showReview = (rating, numReviews) => {
        const rate = (rating / numReviews);
        if (numReviews > 0) {
            return (
                <>
                    <StarRatings
                        starDimension="16px"
                        starRatedColor="#fed330"
                        starHoverColor="#fed330"
                        rating={rate}
                        starEmptyColor="white"
                    />
                    <p>{numReviews} Đánh giá</p>

                </ >
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
                    <p> Chưa có đánh giá</p>
                </>
            )
        }
    }
    const showListProducts = (data) => {
        if (data.length > 0) {

            return (
                <div className="list-Products">
                    {
                        data.map((listProduct) => (
                            <div className="item-products-list" key={listProduct._id} data-aos="zoom-in">
                                <Link
                                    to={`/${listProduct.key}/${listProduct.NSX.replace(/ /g, '-')}/${listProduct.name.replace(/ /g, '-')}/${listProduct._id}`}
                                >
                                    <div className="ig-products-list">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={listProduct.poster[0].url}
                                            alt={listProduct._id}
                                            key={listProduct._id}
                                            height="100%"
                                            width="100%"
                                        />
                                    </div>
                                    <div className="name-products-list">
                                        <p>{listProduct.name}</p>
                                    </div>
                                </Link>
                                <div className="price-products-list">
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
                        ))}
                </div>
            )
        }
    }
    return (
        <div className="group-list-Products">
            <h3>TẤT CẢ SẢN PHẨM</h3>
            {loading && <Loading />}
            {
                 showListProducts(data)
            }
            {(btnLoading) && (<Loading />)}
            {
                (!btnLoading && data.length < lengthAllProduct) && (
                    <button
                        className="load-data"
                        onClick={() => { onChangePage(1); setBtnLoading(true) }}
                    >
                        xem thêm
                    </button>
                )}
        </div>
    )
}