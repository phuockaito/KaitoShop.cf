import { Modal, Table, Avatar, Tag, Tooltip, Popconfirm } from 'antd';
import { FileSearchOutlined, DeleteOutlined } from '@ant-design/icons';
import StarRatings from "react-star-ratings";
import moment from "moment";
import "moment/locale/vi";
export default function CommentProduct({
  token,
  isOpenDialogComment,
  setIsOpenDialogComment,
  loadingGetComment,
  lengthCommentProduct,
  LoadingBtn,
  commentProduct,
  limitCmt,
  setLimitCmt,
  pageCmt,
  setPageCmt,
  actionDeleteCommentUser
}) {
  const deleteComment = (_idComment, item) => {
    const params = {
      _id_comment: _idComment,
      _id_product: item.id_product,
      _id_user: item.id_user
    };
    actionDeleteCommentUser(params, token);
  }
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
      title: 'Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      ellipsis: {
        showTitle: false,
      },
      render: avatar => (
        < Avatar
          size={50}
          style={{
            borderRadius: '50%'
          }}
          src={avatar}
        />
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
            {content.length > 30 ? `${content.slice(0, 15)}...` : `${content}`}
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
  const pagination = {
    total: lengthCommentProduct,
    current: pageCmt,
    pageSize: limitCmt,
    position: ['bottomCenter']
  };
  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    setPageCmt(current);
    setLimitCmt(pageSize);
  };
  return (
    <>
      <Modal
        title={`Tất cả có ${commentProduct.length} / ${lengthCommentProduct} bình luận`}
        visible={isOpenDialogComment}
        footer={false}
        centered
        onCancel={() => setIsOpenDialogComment(false)}
        width={1200}
        className="list-ground-comment-user"
      >
        {/* loading khi click vào icon comment */}
        {loadingGetComment && <LoadingBtn />}
        {/* show thông tin bình luận sản phẩm đó */}
        {
          (!loadingGetComment && lengthCommentProduct > 0) &&
          <Table
            className="ground-table-comment"
            columns={Columns}
            dataSource={commentProduct}
            onChange={handleTableChange}
            pagination={pagination}
            scroll={{ x: 1000, y: 490 }}
          />
        }
        {/* nếu không có bình luận */}
        {
          (!loadingGetComment && lengthCommentProduct === 0) &&
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


