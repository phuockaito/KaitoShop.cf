import { useState, useEffect } from 'react';
import { Comment, Tooltip, List, Popover, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import StarRatings from "react-star-ratings";
import { MoreOutlined, DeleteOutlined } from '@ant-design/icons';
// --Components
import LoadingBtn from 'component/LoadingBtn/index';
// --CSS
import './style.css';
moment.locale('vi');
export default function ListComment({ dataComment, lengthComment, onChangePageComment, token, id_user, idProduct, actionDeleteComment }) {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, [dataComment.length]);
    const deleteComment = id => {
        const data = {
            _id: id,
            _id_product: idProduct
        };
        actionDeleteComment(data, token);
    };
    return (
        <div className="group-list-comment">
            <div className="item-comment">
                {
                    dataComment.length > 0 && (
                        <>
                            <div className="group-review">
                                <h3>Khách Hàng Nhận Xét</h3>
                                <p>({dataComment.length} / {lengthComment} bình luận)</p>
                            </div>
                            <List
                                className="comment-list"
                                itemLayout="horizontal"
                                dataSource={dataComment}
                                renderItem={item => (
                                    <li data-aos="fade-left">
                                        <Comment
                                            avatar={item.avatar}
                                            content={item.content}
                                            author={item.name}
                                            datetime={
                                                <Tooltip>
                                                    <div className="group-time-tart">
                                                        <div className="group-time">
                                                            <span>
                                                                {moment(item.timeComment).fromNow()}
                                                            </span>
                                                            <span>
                                                                {moment(item.timeComment).subtract(1, 'days').format('DD/MM/YYYY')}
                                                            </span>
                                                        </div>
                                                        <div className="group-start">
                                                            {
                                                                item.start > 0 ? (<StarRatings
                                                                    numberOfStars={5}
                                                                    starDimension="18px"
                                                                    starEmptyColor="rgb(203, 211, 227)"
                                                                    starEmptyColor="none"
                                                                    starRatedColor="#fed330"
                                                                    rating={item.start}
                                                                />) : ('')
                                                            }
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                            }
                                            children={
                                                (token && item.id_user === id_user) && (
                                                    <div className="group-delete">
                                                        <Popover
                                                            trigger="click"
                                                            placement="leftBottom"
                                                            content={
                                                                <div className="man-group-delete">
                                                                    <div className="btn-delete">
                                                                        
                                                                        <Button
                                                                            onClick={() => { deleteComment(item._id) }}
                                                                        >
                                                                         <DeleteOutlined />    Xóa
                                                                     </Button>
                                                                    </div>
                                                                </div>
                                                            }
                                                        >
                                                            <MoreOutlined />
                                                        </Popover >
                                                    </div>
                                                )
                                            }
                                        />

                                    </li>
                                )}
                            />
                        </>
                    )
                }
                {loading && <LoadingBtn />}
                {(!loading && dataComment.length < lengthComment) && (<button
                    className="load-data-comment"
                    onClick={() => {
                        setLoading(true)
                        onChangePageComment(1)
                    }}
                >
                    Tải Thêm
                </button>)}
            </div>
        </div>
    )
}