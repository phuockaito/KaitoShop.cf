
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { LazyLoadImage } from 'react-lazy-load-image-component';
const formatter = new Intl.NumberFormat('vn');
export default function ListItems({ items }) {
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
    <div className="list-products-nsx">
      {items.map((products_nsx) => (
        <div className="item-products-nsx" key={products_nsx._id} data-aos="zoom-in">
          <Link
            to={`/detail-products?id_product=${products_nsx._id}&key=${products_nsx.key}`}
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
  )
};

