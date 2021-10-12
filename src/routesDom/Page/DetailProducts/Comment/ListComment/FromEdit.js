import { useState } from 'react';
import { Button, Form, Input } from "antd";
import StarRatings from 'react-star-ratings';
export default function FromEdit({
  item,
  startOldEdit,
  start,
  setStart,
  token,
  socket,
  idUser,
  idComment,
  idProduct,
  setIsForm
}) {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  // create  state
  const [loadingSubmitCmt, setLoadingSubmitCmt] = useState(false);
  const [content, setContent] = useState('');
  // function
  const cancelFromEdit = () => {
    setIsForm(false);
    setContent('');
  };
  const handleChange = (newRating) => {
    setStart(newRating);
  };
  const onChangeTextArea = (e) => {
    setContent(e.target.value);
  };
  const onFinish = () => {
    try {
      if (content || startOldEdit !== start) {
        socket.emit("userUpdateComment", {
          _id: idComment,
          content: content,
          start: start,
          token: token,
          idUser: idUser,
          idProduct: idProduct,
        });
        setTimeout(() => {
          setIsForm(false);
          setLoadingSubmitCmt(false);
          setContent('');
        }, 500);
      } else {
        setIsForm(false);
        setLoadingSubmitCmt(false);
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="main-edit-comment">
      <Form form={form} onFinish={onFinish} className="form-edit">
        <div className="group-time-tart">
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
          placeholder="Mời bạn để lại bình luận"
          rows={9}
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
    </div>
  )
};

