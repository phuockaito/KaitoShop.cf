import { useState, useEffect } from "react";
import { Comment, Tooltip, List, Popover, Button, Form, Input } from "antd";
import moment from "moment";
import "moment/locale/vi";
import StarRatings from "react-star-ratings";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
// --Components
import LoadingBtn from "component/LoadingBtn/index";
// --CSS
import "./style.css";
moment.locale("vi");
const avatarLogo = "https://res.cloudinary.com/phuockaito/image/upload/v1618158354/tich-xanh-fanpage-va-quang-cao-livestream-fanpage-tich-xanh_ttn2e7.png"
export default function ListComment({
  dataComment,
  onChangePageComment,
  token,
  id_user,
  idProduct,
  socket,
  actionCheckDeleteCmt,
  lengthComment,
}) {
  const [loading, setLoading] = useState(false);
  const [loadingSubmitCmt, setLoadingSubmitCmt] = useState(false);
  const [isEditFromComment, setIsEditFromComment] = useState(false);
  const [idEditFromComment, setIdEditFromComment] = useState(null);
  const [content, setContent] = useState('');
  const [start, setStart] = useState(0);
  const [startOldEdit, setStartOldEdit] = useState(0);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  useEffect(() => {
    setLoading(false);
  }, [dataComment.length]);
  const deleteComment = (id) => {
    socket.emit("userDeleteComment", {
      _id: id,
      id_product: idProduct,
      token: token,
    });
    actionCheckDeleteCmt();
  };
  const onEditComment = (id, start) => {
    setIdEditFromComment(id);
    setIsEditFromComment(true);
    setStartOldEdit(start);
    setStart(start);
  }

  const cancelFromEdit = () => {
    setIsEditFromComment(false);
    setContent('');
  }
  const onChangeTextArea = (e) => {
    setContent(e.target.value);
  };
  const onFinish = (e) => {
    try {
      if (content || startOldEdit !== start) {
        socket.emit("userUpdateComment", {
          _id: idEditFromComment,
          content: content,
          start: start,
          token: token,
          idProduct: idProduct,
        });
        setTimeout(() => {
          setIsEditFromComment(false);
          setLoadingSubmitCmt(false);
          setContent('');
        }, 1000);
      } else {
        setIsEditFromComment(false);
        setLoadingSubmitCmt(false);

      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = (newRating) => {
    setStart(newRating);

  };
  return (
    <div className="group-list-comment">
      <div className="item-comment">
        {dataComment.length > 0 && (
          <>
            <div className="group-review">
              <h3>Khách Hàng Nhận Xét</h3>
              <p>
                {dataComment.length} /{lengthComment} bình luận
							</p>
            </div>
            <List
              className="comment-list"
              itemLayout="horizontal"
              dataSource={dataComment}
              renderItem={(item) => (
                <li>
                  <Comment
                    avatar={item.avatar}
                    content={
                      !(isEditFromComment && item._id === idEditFromComment) &&
                      <div className='list-content'>
                        {item.content}
                      </div>
                    }
                    author={
                      <div className="group-avatar-logo-name">
                        <h3 className={item.role === 1 && 'admin'}>
                          {item.name}
                          {item.role === 1 && <img src={avatarLogo} alt={item.name} />}
                        </h3>
                        {item.role === 1 && <p>Quản trị viên</p>}
                      </div>
                    }
                    datetime={
                      <Tooltip>
                        {isEditFromComment && item._id === idEditFromComment ? (
                          <Form form={form} onFinish={onFinish}>
                            <div className="group-time-tart">
                              <div className="group-time">
                                <span>
                                  {moment(item.timeComment).fromNow()}
                                </span>
                              </div>
                              <div className="group-start">
                                {item.start > 0 && (
                                  <StarRatings
                                    numberOfStars={5}
                                    rating={start}
                                    changeRating={handleChange}
                                    name="start"
                                    starDimension="18px"
                                    starRatedColor="#fed330"
                                    starHoverColor="#fed330"
                                    starEmptyColor="none"
                                  />
                                )}
                              </div>
                            </div>
                            <TextArea
                              name="content"
                              style={{ marginTop: "20px" }}
                              placeholder="Mời bạn để lại bình luận"
                              rows={7}
                              max={20}
                              defaultValue={item.content}
                              onChange={onChangeTextArea}
                              maxLength={700}
                            />
                            <div className="man-edit-btn">
                              <Button
                                type="primary"
                                htmlType="submit"
                                loading={loadingSubmitCmt}
                                onClick={() => { setLoadingSubmitCmt(true) }}
                                disabled={(content.trim().length >= 1) ? false : true}
                              >
                                Lưu Lại
															</Button>
                              <Button
                                type="primary"
                                danger
                                onClick={cancelFromEdit}
                              >
                                Hủy
															</Button>
                            </div>
                          </Form>
                        ) : (
                          <div className="group-time-tart">
                            <div className="group-time">
                              <span>{moment(item.timeComment).fromNow()}</span>
                              {item.editComment && <span>Đã chỉnh sửa</span>}
                            </div>
                            <div className="group-start">
                              {item.start > 0 && (
                                <StarRatings
                                  numberOfStars={5}
                                  starDimension="18px"
                                  starEmptyColor="rgb(203, 211, 227)"
                                  starEmptyColor="none"
                                  starRatedColor="#fed330"
                                  rating={item.start}
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </Tooltip>
                    }
                    children={
                      token &&
                      item.id_user === id_user &&
                      !(
                        idEditFromComment === item._id && isEditFromComment
                      ) && (
                        <div className="group-delete">
                          <Popover
                            trigger="click"
                            placement="leftBottom"
                            content={
                              <div className="man-group-delete">
                                <div className="btn-delete">
                                  <Button
                                    className="delete"
                                    onClick={() => {
                                      deleteComment(item._id);
                                    }}
                                  >
                                    <DeleteOutlined />
																		Xóa
																	</Button>
                                </div>
                                <div className="btn-delete">
                                  <Button
                                    className="edit"
                                    onClick={() => { onEditComment(item._id, item.start) }}
                                  >
                                    <EditOutlined />
																		Chỉnh sữa
																	</Button>
                                </div>
                              </div>
                            }
                          >
                            <MoreOutlined />
                          </Popover>
                        </div>
                      )
                    }
                  />
                </li>
              )}
            />
          </>
        )}
        {loading && <LoadingBtn />}
        {!loading && dataComment.length < lengthComment && (
          <button
            className="load-data-comment"
            onClick={() => {
              setLoading(true);
              onChangePageComment(1);
            }}
          >
            Tải Thêm
          </button>
        )}
      </div>
    </div>
  );
};
