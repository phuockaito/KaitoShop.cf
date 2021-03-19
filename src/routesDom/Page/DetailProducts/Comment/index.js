import FormWrite from './FormWrite/index';
import ListComment from './ListComment/index';
export default function Comment({ dataComment, idProduct, lengthComment, onChangePageComment, dataProductsId, loadingComet,socket,token,dataUser }) {
    return (
        <div className="group-comment" >
            <div className="container-comment">
                <FormWrite
                    idProduct={idProduct}
                    dataProductsId={dataProductsId}
                    token={token}
                    dataUser={dataUser}
                    loadingComet={loadingComet}
                    lengthComment={dataComment.length}
                    socket={socket}
                />
                <ListComment
                    onChangePageComment={onChangePageComment}
                    dataComment={dataComment}
                    lengthComment={lengthComment}
                    token={token}
                    id_user={dataUser.length > 0 && dataUser[0]._id}
                    idProduct={idProduct}
                    socket={socket}
                />
            </div>
        </div>
    )
}