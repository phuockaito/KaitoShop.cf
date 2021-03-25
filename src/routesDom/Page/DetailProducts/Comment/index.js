import FormWrite from './FormWrite/index';
import ListComment from './ListComment/index';
export default function Comment({ dataComment, idProduct, lengthComment, onChangePageComment, dataProductsId, loadingComet, socket, token, user,actionCheckDeleteCmt }) {
    return (
        <div className="group-comment" >
            <div className="container-comment">
                <FormWrite
                    idProduct={idProduct}
                    dataProductsId={dataProductsId}
                    token={token}
                    user={user}
                    loadingComet={loadingComet}
                    lengthComment={dataComment.length}
                    socket={socket}
                />
                <ListComment
                    onChangePageComment={onChangePageComment}
                    dataComment={dataComment}
                    lengthComment={lengthComment}
                    token={token}
                    id_user={user.length > 0 && user[0]._id}
                    idProduct={idProduct}
                    socket={socket}
                    actionCheckDeleteCmt={actionCheckDeleteCmt}
                />
            </div>
        </div>
    )
}