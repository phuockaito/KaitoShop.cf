import React from 'react';
import Slider from "react-slick";
import StarRatings from "react-star-ratings";
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// Component
import Loading from 'component/LoadingBtn/index';
// CSS
import settings from './style';
import './style.css';
function SliderHome({ data, loading }) {
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
  const ShowSlider = data => {
    if (data.length > 0) {
      return (
        <Slider {...settings}>
          {
            data.map(slider => (
              <div className="iteml-silder" key={slider._id} data-aos="zoom-in">
                <Link
                  to={`/detail-products?id_product=${slider._id}&key=${slider.key}`}
                >
                  <div className="ig-silder">
                    <LazyLoadImage
                      effect="blur"
                      src={slider.poster[0].url}
                      alt={slider._id}
                      key={slider._id}
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <div className="name-silder">
                    <p>{slider.name}</p>
                  </div>
                  <div className="price-sidler">
                    <span>{formatter.format(slider.price)} <u>đ</u></span>
                  </div>
                  <div className="group-start-review">
                    {
                      showReview(slider.rating, slider.numReviews)
                    }
                  </div>
                </Link>
              </div>
            ))
          }
        </Slider>
      )
    }
  }
  return (
    <>
      <div className="group-silder">
        <h3>KHUYẾN MÃI HOT NHẤT</h3>
        <div className="silder">
          {loading && <Loading />}
          {
            !loading && ShowSlider(data)
          }
        </div>
      </div>
    </>
  )
};
export default React.memo(SliderHome);