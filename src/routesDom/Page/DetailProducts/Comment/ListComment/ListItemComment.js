import { useState } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import ItemComment from "./ItemComment";
import { useHistory } from 'react-router-dom';
export default function ListItemComment({
  dataComment,
  token,
  socket,
  idUser,
  user,
  idProduct,
  actionCheckDeleteCmt
}) {
  const history = useHistory();
  const [idComment, setIdComment] = useState('');
  const [replyComment, setReplyComment] = useState(false);
  const [isForm, setIsForm] = useState(false);

  const openFromReply = (_id) => {
    if (token) {
      setReplyComment(true);
      setIsForm(false);
      setIdComment(_id);
      setTimeout(() => {
        document.querySelector('.main-reply-comment').scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    } else {
      history.push('/login');
    }
  };
  return (
    <div className="list-item-comment" >
      {
        dataComment.map((item) => (
          <>
            <ItemComment
              item={item}
              token={token}
              socket={socket}
              idUser={idUser}
              user={user}
              idProduct={idProduct}
              actionCheckDeleteCmt={actionCheckDeleteCmt}
              replyComment={replyComment}
              setReplyComment={setReplyComment}
              idComment={idComment}
              setIdComment={setIdComment}
              isForm={isForm}
              setIsForm={setIsForm}
            >
              <p onClick={() => openFromReply(item._id)}> <MessageOutlined /> Trả Lời</p>
              {item.reply.map((rl) => (
                <div className="ground-reply-item">
                  <ItemComment
                    item={rl}
                    token={token}
                    socket={socket}
                    idUser={idUser}
                    user={user}
                    idProduct={idProduct}
                    actionCheckDeleteCmt={actionCheckDeleteCmt}
                    replyComment={replyComment}
                    setReplyComment={setReplyComment}
                    idComment={idComment}
                    setIdComment={setIdComment}
                    isForm={isForm}
                    setIsForm={setIsForm}
                  >
                    <p onClick={() => openFromReply(item._id)}><MessageOutlined /> Trả Lời</p>
                  </ItemComment>
                </div>
              ))}
            </ItemComment>
          </>
        ))
      }
    </div>
  )
};

