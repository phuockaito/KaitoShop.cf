import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import StarRatings from "react-star-ratings";
const formatter = new Intl.NumberFormat('vn');
export default function ListItems({ items }) {
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
  };
  return (
    <div className="product-trademark">
      {
        items.map((listProduct) => (
          <div className="item-products-trademark" key={listProduct._id} data-aos="zoom-in">
            <Link
              to={`/detail-products?id_product=${listProduct._id}&key=${listProduct.key}`}
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
        ))}
    </div>
  )
};


