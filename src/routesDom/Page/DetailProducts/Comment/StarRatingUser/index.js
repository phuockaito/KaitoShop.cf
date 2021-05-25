import { Progress } from 'antd';
import StarRatings from "react-star-ratings";
import './style.css'
export default function StarRatingUser({ starRating, sumStarRating, nameProduct, reviewRating }) {
  const { oneStars, twoStars, threeStars, fourStars, fiveStart } = starRating;
  return (
    <div className="ground-start-rating">
      <h3>{sumStarRating} Đánh giá {nameProduct}</h3>
      <div className="main-start-rating">

        <div className="start-rating">
          <h3>Đánh Giá Trung Bình</h3>
          <p>{(reviewRating).toFixed(1)}/5</p>
          <StarRatings
            starDimension="22px"
            starRatedColor="#fed330"
            starHoverColor="#fed330"
            rating={reviewRating}
            starEmptyColor="white"
          />
        </div>
        <div className="control-start-rating">
          <div className="items-start-rating">
            <div className="control-start">
              <p>1</p>
              <StarRatings
                numberOfStars={1}
                name="start"
                starDimension="18px"
                starRatedColor="#fed330"
                starHoverColor="#fed330"
                starEmptyColor="#fed330"
              />
            </div>
            <Progress
              percent={(oneStars / sumStarRating * 100).toFixed(1)}
              size="small"
              strokeColor={{
                from: '#f25800',
                to: '#ff7d26',
              }}
              status="active"
            />
            <p><span>{oneStars}</span> đánh giá</p>

          </div>
          <div className="items-start-rating">
            <div className="control-start">
              <p>2</p>
              <StarRatings
                numberOfStars={1}
                name="start"
                starDimension="18px"
                starRatedColor="#fed330"
                starHoverColor="#fed330"
                starEmptyColor="#fed330"
              />
            </div>
            <Progress
              percent={(twoStars / sumStarRating * 100).toFixed(1)}
              size="small"
              strokeColor={{
                from: '#f25800',
                to: '#ff7d26',
              }}
              status="active"
            />
            <p><span>{twoStars} </span> đánh giá</p>

          </div>
          <div className="items-start-rating">
            <div className="control-start">
              <p>3</p>
              <StarRatings
                numberOfStars={1}
                name="start"
                starDimension="18px"
                starRatedColor="#fed330"
                starHoverColor="#fed330"
                starEmptyColor="#fed330"
              />
            </div>
            <Progress
              percent={(threeStars / sumStarRating * 100).toFixed(1)}
              size="small"
              strokeColor={{
                from: '#f25800',
                to: '#ff7d26',
              }}
              status="active"
            />
            <p><span>{threeStars}</span> đánh giá</p>

          </div>
          <div className="items-start-rating">
            <div className="control-start">
              <p>4</p>
              <StarRatings
                numberOfStars={1}
                name="start"
                starDimension="18px"
                starRatedColor="#fed330"
                starHoverColor="#fed330"
                starEmptyColor="#fed330"
              />
            </div>
            <Progress
              percent={(fourStars / sumStarRating * 100).toFixed(1)}
              size="small"
              strokeColor={{
                from: '#f25800',
                to: '#ff7d26',
              }}
              status="active"
            />
            <p><span>{fourStars}</span> đánh giá</p>

          </div>
          <div className="items-start-rating">
            <div className="control-start">
              <p>5</p>
              <StarRatings
                numberOfStars={1}
                name="start"
                starDimension="18px"
                starRatedColor="#fed330"
                starHoverColor="#fed330"
                starEmptyColor="#fed330"
              />
            </div>
            <Progress
              percent={(fiveStart / sumStarRating * 100).toFixed(1)}
              size="small"
              strokeColor={{
                from: '#f25800',
                to: '#ff7d26',
              }}
              status="active"
            />
            <p><span>{fiveStart}</span> đánh giá</p>
          </div>
        </div>
      </div>
    </div>
  )
};