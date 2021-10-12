import { useState } from 'react';
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popover, Button, Tooltip } from "antd";
import StarRatings from 'react-star-ratings';
import moment from "moment";
import "moment/locale/vi";
// component
import FromEdit from './FromEdit';
import FromReply from './FromReply';
//
moment.locale("vi");
export default function ItemComment({
  item,
  token,
  socket,
  idUser,
  user,
  idProduct,
  actionCheckDeleteCmt,
  replyComment,
  setReplyComment,
  idComment,
  setIdComment,
  isForm,
  setIsForm,
  children,
}) {
  //
  const avatarLogo = "https://res.cloudinary.com/phuockaito/image/upload/v1618158354/tich-xanh-fanpage-va-quang-cao-livestream-fanpage-tich-xanh_ttn2e7.png";
  const [start, setStart] = useState(0);
  const [startOldEdit, setStartOldEdit] = useState(0);
  //
  const deleteComment = (_id) => {
    actionCheckDeleteCmt();
    socket.emit("userDeleteComment", {
      _id: _id,
      id_product: idProduct,
      token: token,
      idUser: idUser
    });
  };
  const onEditComment = (id, start) => {
    setIdComment(id);
    setIsForm(true);
    setStartOldEdit(start);
    setStart(start);
    setReplyComment(false);
  };
  return (
    <div className="item-comment" >
      <div className="avatar-author">
        <img src={item.avatar} alt="" />
      </div>
      <div className="content-author">
        <div className="ground-content-name-start">
          <div className="main-item-comment">
            <div className="group-avatar-logo-name">
              <h3 className={item.role === 1 && 'admin'}>
                {item.name}
                {item.role === 1 && <img src={avatarLogo} alt={item.name} />}
              </h3>
              {item.role === 1 && <p>Quản trị viên</p>}
            </div>
            <div className="time-content">
              <Tooltip placement="topLeft" title={moment(item.timeComment).format('LLLL')}>
                <span>
                  {moment(item.timeComment).fromNow()}
                </span >
              </Tooltip>
              {item.editComment && <span className="edit" >(đã chỉnh sửa)</span>}
            </div>
            {/* show from delete comment */}
            {
              (isForm && item._id === idComment && token) ? (
                // if right show from edit comment
                <FromEdit
                  item={item}
                  startOldEdit={startOldEdit}
                  start={start}
                  setStart={setStart}
                  token={token}
                  idUser={idUser}
                  socket={socket}
                  idComment={idComment}
                  idProduct={idProduct}
                  setIsForm={setIsForm}
                />
              ) : (
                <>
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
                  <div className="ground-content">
                    <p> {item.content}</p>
                  </div>
                </>
              )
            }
            {/* show icon delete and update edit comment */}
            {token && item.id_user === idUser && !(idComment === item._id && isForm) && (
              <div className="ground-show-edit-delete">
                <Popover
                  trigger="hover"
                  placement="leftTop"
                  content={
                    <div className="man-group-delete">
                      <div className="btn-delete">
                        <Button
                          className="delete"
                          onClick={() => { deleteComment(item._id) }}
                          type="primary" danger
                        >
                          <DeleteOutlined />
													Xóa
													</Button>
                      </div>
                      <div className="btn-delete">
                        <Button
                          type="primary"
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
                  <MoreOutlined style={{ fontSize: '1.5em' }} />
                </Popover>
              </div>
            )}

          </div>
          {/* <FromReply /> */}
          <div className="ground-reply">
            {children}
          </div>
          {
            (idComment === item._id && replyComment && token) && (
              <FromReply
                setReplyComment={setReplyComment}
                socket={socket}
                user={user}
                idUser={idUser}
                idProduct={idProduct}
                idComment={idComment}
                token={token}
              />
            )
          }
        </div>
      </div>
    </div>
  )
};

