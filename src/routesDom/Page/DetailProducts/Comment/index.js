import { useDispatch } from 'react-redux';
import { useContext } from 'react';
// -- Context
import { UserContext } from 'contexts/UserContext';
// --ComPonent
import FormWrite from './FormWrite/index';
import ListComment from './ListComment/index';
// dispatch API
import { postComment, deleteComment } from 'features/Comment/pathAPI';

export default function Comment({ dataComment, idProduct, lengthComment, onChangePageComment, dataProductsId, loadingComet }) {
    const dispatch = useDispatch();
    // create State
    const [user] = useContext(UserContext);
    const { token, dataUser } = user;
    // dispatch API
    const addComment = (data, token) => dispatch(postComment(data, token));
    const actionDeleteComment = (data, token) => dispatch(deleteComment(data, token));
    return (
        <div className="group-comment" >
            <div className="container-comment">
                <FormWrite
                    idProduct={idProduct}
                    dataProductsId={dataProductsId}
                    token={token}
                    dataUser={dataUser}
                    addComment={addComment}
                    loadingComet={loadingComet}
                    dataComment={dataComment}
                />
                <ListComment
                    onChangePageComment={onChangePageComment}
                    dataComment={dataComment}
                    lengthComment={lengthComment}
                    token={token}
                    id_user={dataUser.length > 0 && dataUser[0]._id}
                    idProduct={idProduct}
                    actionDeleteComment={actionDeleteComment}
                />
            </div>
        </div>
    )
}