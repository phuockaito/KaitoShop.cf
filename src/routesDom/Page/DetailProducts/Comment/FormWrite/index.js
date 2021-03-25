import StarRatings from "react-star-ratings";
import { useState, useEffect } from "react";
import { Comment, Avatar, Form, Button, Input, notification } from "antd";
import ImageDefault from "image/Notoken.png";
import $ from "jquery";
// --CSS
import "./style.css";
export default function FormWrite({
  idProduct,
  dataProductsId,
  token,
  user,
  lengthComment,
  socket,
}) {
  // create State
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [start, setStart] = useState(0);
  const [contentCmt, setContentCmt] = useState(0);
  useEffect(() => {
    form.resetFields(["content"]);
    setStart(0);
    setContentCmt(0);
    setSubmitting(false);
  }, [lengthComment]);
  useEffect(() => {
    if (submitting) {
      $("body,html").animate(
        { scrollTop: $(".item-comment").offset().top - 90 },
        1200
      );
    }
  }, [submitting]);
  //function
  const onFinish = (values) => {
    const product = {
      _id: dataProductsId[0]._id,
      poster: dataProductsId[0].poster[0].url,
      key: dataProductsId[0].key,
      NSX: dataProductsId[0].NSX,
      name: dataProductsId[0].name,
    };
    if (token) {
      socket.emit("userCreateComment", {
        id_product: idProduct,
        array_product: product,
        content: values.content.trim(),
        start,
        token: token,
      });
      setSubmitting(true);
    } else {
      notification["error"]({
        message: "Vui lòng đăng nhập !",
      });
    }
  };

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
    if (data.length > 0) {
      avatar = data[0].avatar;
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
              rows={5}
              max={20}
              onChange={onChangeTextArea}
              maxLength={700}
            />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                htmlType="submit"
                type="primary"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length ||
                  isFormValid
                }
                loading={submitting}
              >
                Thêm Bình Luận
              </Button>
            )}
          </Form.Item>
        </Comment>
      </Form>
    </div>
  );
}
