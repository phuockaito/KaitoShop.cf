import { Table, Image, Tag, Tooltip, Button, Popconfirm } from 'antd';
import moment from "moment";
import "moment/locale/vi";
export default function ListUser({ listAccount, length }) {


  const Columns = [
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
    }
    ,
    {
      title: 'Hành Động',
      key: '_id',
      dataIndex: '_id',
      fixed: 'right',
      render: _id => {
        return (
          <>
            <Button type="primary">Chỉnh Sữa</Button>
            <Popconfirm
              title="Chắc chắn để xóa ?"
              onConfirm={() => deleteProduct(_id)}
              okText="Có"
              cancelText="Không"
              placement="leftTop"
            >
              <Button
                type="primary" danger
                style={{
                  margin: '5px'
                }}
              >Xóa</Button>
            </Popconfirm>
          </>
        );
      }
    }
  ];
  const deleteProduct = _id => {
    console.log({ _id })
  };
  const pagination = {
    total: length,
    position: ['bottomCenter']
  };
  return (
    <>
      <Table
        className="ground-table"
        columns={Columns}
        dataSource={listAccount}
        pagination={pagination}
        // onChange={handleTableChange}
        scroll={{ x: 1000 }}
      />
    </>
  )
}


