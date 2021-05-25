import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StarRatings from "react-star-ratings";
// Component
import Loading from 'component/LoadingBtn/index';
import './style.css';
function ProductsType({ data, loading }) {
  const formatter = new Intl.NumberFormat('vn');
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
  const ShowProducts = data => {
    if (data.length > 0) {
      return (
        <div className="products-type">
          {
            data.map(product => (
              <div className="item-products-type" key={product._id} data-aos="zoom-in">
                <Link
                  to={`/detail-products?id_product=${product._id}&key=${product.key}`}
                >
                  <div className="ig-products-type">
                    <LazyLoadImage
                      effect="blur"
                      src={product.poster[0].url}
                      alt={product._id}
                      key={product._id}
                      height="100%"
                      width="100%"
                    />                            </div>
                  <div className="name-products-type">
                    <p>{product.name}</p>
                  </div>
                </Link>
                <div className="price-products-type">
                  <div className="group-price">
                    <span>{formatter.format(product.price)} <u>đ</u> </span>
                  </div>
                </div>
                <div className="group-start-review">
                  {
                    showReview(product.rating, product.numReviews)
                  }
                </div>
              </div>
            ))
          }
        </div>
      )
    }
  };
  return (
    <>
      <div className="group-products-type">
        <h3> DÀNH RIÊNG CHO BẠN</h3>
        {loading && (<Loading />)}
        {
          !loading && ShowProducts(data)
        }
      </div>
    </>
  )
};
export default React.memo(ProductsType);