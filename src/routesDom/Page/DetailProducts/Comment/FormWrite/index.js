import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { Comment, Avatar, Form, Button, Input } from "antd";
import ImageDefault from "image/Notoken.png";
import { useHistory } from 'react-router-dom';
import $ from "jquery";
import { Link } from "react-router-dom";
// --CSS
import "./style.css";

export default function FormWrite({
  idProduct,
  token,
  user,
  socket,
}) {
  // create State
  const history = useHistory();
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(true);
  const [start, setStart] = useState(0);
  const [contentCmt, setContentCmt] = useState(0);
  //function
  const onFinish = (values) => {
    if (token) {
      socket.emit("userCreateComment", {
        id_product: idProduct,
        content: values.content.trim(),
        start,
        token: token,
        idUser: user._id
      });
      form.resetFields(["content"]);
      setStart(0);
      setContentCmt(0);
      $("body,html").animate({ scrollTop: $(".list-item-comment").offset().top - 140 }, 1500);
    }
  };
  useEffect(() => {
    if (socket) {
      document.getElementById('message').addEventListener('focus', () => {
        if (token) {
          socket.emit('waitWriteComment', { idProduct, message: 'Ai đó đang viết bình luận...' });
        } else {
          history.push('/login');
        }
      });
      document.getElementById('message').addEventListener('blur', () => {
        socket.emit('waitWriteComment', { idProduct, message: '' });
      });
      socket.on('waitWriteComment', (msg) => {
        document.getElementById('waitWriteComment').innerHTML = msg;
      });
    }
    return () => socket.off("waitWriteComment");
  }, [contentCmt, token]);

  const onChangeTextArea = (e) => {
    setContentCmt(e.target.value.length);
    if (e.target.value.trim() === "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };
  const handleChange = (newRating) => {
    setStart(newRating);
  };
  // state
  const showIconImage = (image, data) => {
    let avatar = null;
    if (data) {
      avatar = data.avatar;
    } else {
      avatar = image;
    }
    return avatar;
  };

  return (
    <div className="group-form-comment">
      <Form form={form} onFinish={onFinish}>
        <Comment
          avatar={
            <Avatar src={showIconImage(ImageDefault, user)} alt="Han Solo" />
          }
        >
          <StarRatings
            numberOfStars={5}
            changeRating={handleChange}
            rating={start}
            name="start"
            starDimension="22px"
            starRatedColor="#fed330"
            starHoverColor="#fed330"
            starEmptyColor="none"
          />
          <div className="group-length-content">
            <p>{contentCmt}/700</p>
          </div>
          <Form.Item name="content">
            <TextArea
              placeholder="Mời bạn để lại bình luận"
              rows={8}
              max={20}
              onChange={onChangeTextArea}
              maxLength={700}
              id="message"
              className="from-write"
            />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            {token ?
              <Button
                htmlType="submit"
                type="primary"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length ||
                  isFormValid
                }
              >
                Thêm Bình Luận
              </Button>
              : <Button
                htmlType="submit"
                type="primary"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length ||
                  isFormValid
                }
              >
                <Link to="/login"> Thêm Bình Luận</Link>
              </Button>
            }
          </Form.Item>
        </Comment>
      </Form>
    </div>
  );
}
