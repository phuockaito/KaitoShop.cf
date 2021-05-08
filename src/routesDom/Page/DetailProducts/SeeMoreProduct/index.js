import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Pagination } from 'antd';
import StarRatings from "react-star-ratings";
import { Link } from 'react-router-dom';
import $ from "jquery";
import Loading from 'component/LoadingBtn/index';
import './style.css';
const formatter = new Intl.NumberFormat('vn');
export default function SeeMoreProduct({ items, data, onChangePage, lengthProductsType, loading }) {
  // state
  const onChangePagination = (page) => {
    onChangePage(page);
    $("body,html").animate({ scrollTop: $(".group-see-more-products").offset().top - 160 }, 500);
  }
  const showPagination = length => {
    if (length > 0) {
      return (
        <Pagination
          onChange={onChangePagination}
          total={length}
          defaultPageSize={items}
        />
      )
    }
  }
  const showReview = (rating, numReviews) => {
    const rate = (rating / numReviews);
    if (numReviews > 0) {
      return (
        <div className="review-products">
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
          <p > Chưa có đánh giá</p>
        </>
      )
    }
  }
  const ShowSeeMore = data => {
    if (data.length > 0) {
      return (
        <div className="list-see-more">
          {
            data.map((listProduct) => (
              <div className="item-products-see-more" key={listProduct._id} data-aos="zoom-in">
                <Link
                  to={`/${listProduct.key}/${listProduct.NSX.replace(/ /g, '-')}/${listProduct.name.replace(/ /g, '-')}/${listProduct._id}`}
                >
                  <div className="ig-see-more">
                    <LazyLoadImage
                      effect="blur"
                      src={listProduct.poster[0].url}
                      alt={listProduct._id}
                      key={listProduct._id}
                      height="100%"
                      width="100%"
                    />
                  </div>
                  <div className="name-see-more">
                    <p>{listProduct.name}</p>
                  </div>
                </Link>
                <div className="price-see-more">
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
    <>
      <div className="group-see-more-products">
        <h3> SẢN PHẨM TƯƠNG TỰ</h3>
        {loading && <Loading />}
        {
          ShowSeeMore(data)
        }
        {
          showPagination(lengthProductsType)
        }
      </div>
    </>
  )
}