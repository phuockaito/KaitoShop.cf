import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import StarRatings from "react-star-ratings";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");
export default function ListItem({
  dataHistoryComment,
  actionDeleteComment,
  token,
}) {
  // create State
  const [visible, setVisible] = useState(false);
  const [start, setStar] = useState(null);
  const [time, setTime] = useState(null);
  const [content, setContent] = useState(null);
  // function
  const showReviewContent = (content) => {
    setVisible(true);
    setStar(content.start);
    setContent(content.content);
    setTime(content.timeComment);
  };
  const deleteComment = (id_cmt, id_product) => {
    const data = {
      _id: id_cmt,
      _id_product: id_product,
    };
    actionDeleteComment(data, token);
  };
  return (
    <>
      {dataHistoryComment.map((comment) => (
        <div className="iteml-history-comment" key={comment._id}>
          <div className="group-name-img">
            <div className="margin-history-comment img-history-comment">
              <img
                src={comment.array_product[0].poster}
                alt={comment.array_product[0]._id}
              />
            </div>
            <div className="margin-history-comment name-history-comment">
              <Link
                to={`/detail-products?id_product=${comment.array_product[0]._id}&key=${comment.array_product[0].key}`}
              >
                {comment.array_product[0].name}
              </Link>
            </div>
          </div>
          <div className="group-info-detele">
            <div className="margin-history-comment content-history-comment">
              <button
                onClick={() => {
                  showReviewContent(comment);
                }}
              >
                Chi tiết
              </button>
            </div>
            <div className="margin-history-comment delete-comment-history-comment">
              <button
                onClick={() => { deleteComment(comment._id, comment.id_product) }}
              >
                Xóa bình luận
              </button>
            </div>
          </div>
        </div>
      ))}
      <Modal
        title="Chi tiết bình luận"
        centered
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
        width={1000}
      >
        <div className="group-content-product">
          <div className="group-star-modal">
            <h3>Đánh giá: </h3>
            {start > 0 ? (
              <StarRatings
                starDimension="20px"
                starRatedColor="#fed330"
                starHoverColor="#fed330"
                rating={start}
                starEmptyColor="white"
              />
            ) : (
              <StarRatings
                starDimension="20px"
                starRatedColor="#fed330"
                starHoverColor="#fed330"
                starEmptyColor="none"
                numberOfStars={5}
              />
            )}
          </div>
          <div className="group-time-modal">
            <h3>Thời gian:</h3>
            <span>{moment(time).fromNow()}</span>
            <span>
              {moment(time).format("LLLL")}
            </span>
          </div>
          <div className="group-content-modal">
            <h3>Nội dung: </h3>
            <p>{content}</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
