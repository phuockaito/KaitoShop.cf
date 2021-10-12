import { Modal } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Table, Avatar, Tag, Tooltip, Popconfirm } from 'antd';
import StarRatings from "react-star-ratings";
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from "moment";
import "moment/locale/vi";
export default function CommentUser({
  token,
  openFromComment,
  setOpenFromComment,
  listCommentUser,
  loadingComments,
  LoadingBtn,
  lengthComment,
  limitCMT,
  setLimitCMT,
  actionDeleteCommentUser
}) {
  const deleteComment = (idComment, item) => {
    const params = {
      _id_comment: idComment,
      _id_product: item.id_product,
      _id_user: item.id_user
    };
    actionDeleteCommentUser(params, token);
  };
  const Columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      ellipsis: {
        showTitle: false,
      },
      render: _id => (
        <Tooltip placement="top" title={_id}>
          <Tag color="red-inverse" key={_id}>
            {_id}
          </Tag>
        </Tooltip>
      )
    },
    {
      title: 'Ảnh Sản Phẩm',
      dataIndex: 'array_product',
      key: 'array_product',
      ellipsis: {
        showTitle: false,
      },
      render: array_product => (
        <Tooltip placement="top" title='Click để xem'>
          <Link
            to={`/detail-products?id_product=${array_product[0]._id}&key=${array_product[0].key}`}
          >
            < Avatar
              size={64}
              style={{
                borderRadius: '50%'
              }}
              src={array_product[0].poster}
            />
          </Link>
        </Tooltip>
      )
    },
    {
      title: 'Đánh Giá',
      dataIndex: 'start',
      key: 'start',
      ellipsis: {
        showTitle: false,
      },
      render: start => (
        <>
          {start > 0 ? (
            <>
              <span style={{ fontSize: '1.2em', marginRight: '5px' }}>
                {start}
              </span>
              <StarRatings
                starDimension="20px"
                starRatedColor="#fed330"
                starHoverColor="#fed330"
                rating={start}
                starEmptyColor="white"
                numberOfStars={1}
              />
            </>
          ) : (
            <span>
              Không
            </span>
          )}
        </>
      )
    },
    {
      title: 'Thời Gian',
      dataIndex: 'timeComment',
      key: 'timeComment',
      ellipsis: {
        showTitle: false,
      },
      render: timeComment => (
        <Tooltip placement="topRight" title={moment(timeComment).format('LLLL')}>
          <Tag color="#000080" key={timeComment}>
            {moment(timeComment).fromNow()}
          </Tag>
        </Tooltip>
      )
    },
    {
      title: 'Nội Dung',
      dataIndex: 'content',
      key: 'content',
      ellipsis: {
        showTitle: false,
      },
      render: content => (
        <Tooltip
          placement="left"
          color='purple'
          key='white'
          title={content}
          trigger='click'
        >
          <Tag color="purple-inverse" key={content}>
            {content.length > 30 ? `${content.slice(0, 30)}...` : `${content}`}
          </Tag>
        </Tooltip>
      )
    },
    {
      title: 'Hành Động',
      dataIndex: '_id',
      key: '_id',
      fixed: 'right',
      ellipsis: {
        showTitle: false,
      },
      render: (_id, item) => (
        <Popconfirm
          title="Bạn có chắc chắn xóa bình luận này không ?"
          onConfirm={() => deleteComment(_id, item)}
          okText="Có"
          cancelText="Không"
          placement="leftTop"
        >
          <DeleteOutlined
            style={{
              color: 'red',
              fontSize: '1.3em'
            }}
          />
        </Popconfirm>
      )
    }
  ];
  return (
    <>
      <Modal
        title={`Tất cả có ${lengthComment} bình luận`}
        visible={openFromComment}
        footer={false}
        centered
        onCancel={() => setOpenFromComment(false)}
        width={1200}
        className="list-ground-comment-user"
      >
        {/* loading */}
        {
          loadingComments &&
          <div style={{ padding: '20px 0' }}>
            <LoadingBtn />
          </div>
        }
        {/* nếu có bình luận */}
        {
          !loadingComments && lengthComment > 0 &&
          <>
            <Table
              className="ground-table"
              columns={Columns}
              dataSource={listCommentUser}
              pagination={false}
              position={'bottomCenter'}
              scroll={{ x: 1000, y: 490 }}
            />
            {
              lengthComment > 5 && listCommentUser.length < lengthComment &&
              <button
                className="load-data-comment"
                onClick={() => setLimitCMT(limitCMT + 5)}
              >Tải Thêm
              </button>
            }
          </>
        }
        {/* nếu không có bình luận nào */}
        {
          !loadingComments && listCommentUser.length === 0 &&
          (
            <div
              style={{
                textAlign: 'center',
                padding: '30px 0'
              }}
            >
              <FileSearchOutlined
                style={{
                  fontSize: '1.5em'
                }}
              />
              <p>Không có gì để hiển thị</p>
            </div>
          )
        }
      </Modal>
    </>
  )
};


