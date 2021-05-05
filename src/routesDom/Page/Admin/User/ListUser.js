import { DeleteOutlined, CommentOutlined } from '@ant-design/icons';
import { Table, Image, Tag, Tooltip, Badge, Popconfirm } from 'antd';
import moment from "moment";
import "moment/locale/vi";
export default function ListUser({
  listAccount,
  length,
  setPage,
  setLimit,
  limit,
  page,
  setOpenFromComment,
  setIdUser
}) {

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
      title: 'Hình Ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      ellipsis: {
        showTitle: false,
      },
      render: avatar => (
        <Image
          width={50}
          style={{
            borderRadius: '50%'
          }}
          src={avatar}
        />
      )
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      render: name => (
        <Tag color="#096dd9" key={name}>
          {name}
        </Tag>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: {
        showTitle: false,
      },
      render: email => (
        <Tag color="#092b00" key={email}>
          {email}
        </Tag>
      )
    },
    {
      title: 'Thời Gian',
      dataIndex: 'createdAt',
      key: 'createdAt',
      ellipsis: {
        showTitle: false,
      },
      render: createdAt => (
        <Tooltip placement="bottom" title={moment(createdAt).format('LLLL')}>
          <Tag color="#237804" key={createdAt}>
            {moment(createdAt).fromNow()}
          </Tag>
        </Tooltip>
      )
    },
    {
      title: 'Vài Trò',
      dataIndex: 'role',
      key: 'role',
      ellipsis: {
        showTitle: false,
      },
      render: role => (
        <>
          {role === 1 ? <Tag color="#f5222d" key={role}>
            Quản trị viên
          </Tag> : <Tag color="#5c0011" key={role}>
            Người dùng
          </Tag>}
        </>
      )
    },
    {
      title: 'Bình Luận',
      dataIndex: '_id',
      key: '_id',
      fixed: 'right',
      ellipsis: {
        showTitle: false,
      },
      render: (_id, item) => (
        <>
          <span
            style={{ paddingRight: '5px' }}
          >
            <Badge
              style={{ backgroundColor: '#1890ff' }}
              count={item.__v}
            // overflowCount={99}
            >
            </Badge>
          </span>
          <CommentOutlined
            onClick={
              () => {
                setIdUser(_id);
                setOpenFromComment(true)
              }
            }
            style={{
              color: '#1890ff',
              fontSize: '1.2em'
            }}
          />
        </>
      )
    },
    {
      title: 'Hành Động',
      key: '_id',
      dataIndex: '_id',
      fixed: 'right',
      render: _id => {
        return (
          <>
            <Popconfirm
              title="Chắc chắn để xóa ?"
              onConfirm={() => deleteProduct(_id)}
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
          </>
        );
      },

    }
  ];

  const deleteProduct = _id => {
    console.log({ _id })
  };

  const handleTableChange = (pagination) => {
    const { current, pageSize } = pagination;
    setPage(current);
    setLimit(pageSize);
  };
  const pagination = {
    total: length,
    current: page,
    pageSize: limit,
    position: ['bottomCenter']
  };

  return (
    <>
      <Table
        className="ground-table"
        columns={Columns}
        dataSource={listAccount}
        pagination={pagination}
        onChange={handleTableChange}
        position={'bottomCenter'}
        scroll={{ x: 1000 }}
      />
    </>
  )
}


