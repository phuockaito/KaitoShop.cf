
import { useHistory } from "react-router-dom";
import { Input, Button, Form } from 'antd';
import ImageDefault from "image/Notoken.png";
const avatarLogo = "https://res.cloudinary.com/phuockaito/image/upload/v1618158354/tich-xanh-fanpage-va-quang-cao-livestream-fanpage-tich-xanh_ttn2e7.png";
export default function FromReply({
  setReplyComment,
  socket,
  token,
  user,
  idUser,
  idProduct,
  idComment,
}) {
  const history = useHistory();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  // function
  const onFinishReplyComment = value => {
    if (token) {
      if (value) {
        socket.emit("userCreateComment", {
          id_product: idProduct,
          idComment: idComment,
          content: value.content.trim(),
          token: token,
          idUser: idUser,
          send: 'repLyComment'
        });
        setReplyComment(false)
      };
    } else {
      history.push('/login')
    }
  };
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
    <div className="main-reply-comment">
      <div className="ground-user-reply">
        <img src={showIconImage(ImageDefault, user)} alt="" />
        {user && <div className="group-avatar-logo-name">
          <h3 className={user.role === 1 && 'admin'}>
            {user.name}
            {user.role === 1 && <img src={avatarLogo} alt={user.name} />}
          </h3>
          {user.role === 1 && <p>Quản trị viên</p>}
        </div>}
      </div>
      <Form form={form} onFinish={onFinishReplyComment} className="form-reply">
        <Form.Item name="content">
          <TextArea
            placeholder="Mời bạn để lại bình luận"
            rows={9}
            max={20}
            maxLength={700}
            className="input-reply"
          />
        </Form.Item>
        <div className="man-edit-btn">
          <Button type="primary" htmlType="submit" >
            Thêm Bình Luận
      </Button>
          <Button type="primary" danger onClick={() => setReplyComment(false)}>
            Hủy
      </Button>
        </div>
      </Form>
    </div>
  )
};


