import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StarRatings from "react-star-ratings";
const formatter = new Intl.NumberFormat('vn');
export default function ListItems({ data }) {
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
    <div className="group-search">
      {
        data.map(product => (
          <div className="item-products-search" key={product._id} data-aos="zoom-in">
            <Link
              to={`/detail-products?id_product=${product._id}&key=${product.key}`}
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
  )
};


