import { useState, useEffect } from 'react';
import { DeleteOutlined, CommentOutlined, ShoppingCartOutlined, LockOutlined } from '@ant-design/icons';
import { Table, Image, Tag, Tooltip, Badge, Popconfirm, Switch } from 'antd';
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
  setOpenCartUser,
  setIdUser,
  token,
  actionDeleteAccountUser,
  actionPostActiveRoleUser,
  actionDeleteAllCart
}) {
  const [idRole, setIdRole] = useState(null);
  const [booleanRole, setBooleanRole] = useState(null);
  const deleteAccountUser = _id => {
    const params = {
      _id_user: _id,
    }
    actionDeleteAccountUser({ params }, token);
  };
  const deleteAllCart = _id_user => {
    actionDeleteAllCart(_id_user, token);
  }
  const onChangeRole = (boolean) => {
    setBooleanRole(boolean)
  };
  useEffect(() => {
    if (booleanRole && idRole) {
      const data = {
        _id_user: idRole,
        role: 1
      }
      actionPostActiveRoleUser(data, token);
    };
    if (!booleanRole && idRole) {
      const data = {
        _id_user: idRole,
        role: 0
      }
      actionPostActiveRoleUser(data, token);
    }
  }, [idRole, booleanRole]);

  const Columns = [
    {
      title: 'ID',
      dataIndex: 'user',
      key: 'user',
      ellipsis: {
        showTitle: false,
      },
      render: (user) => (
        <Tooltip placement="top" title={user._id}>
          <Tag color="red-inverse" key={user._id}>
            {user._id}
          </Tag>
        </Tooltip>
      )
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'user',
      key: 'user',
      ellipsis: {
        showTitle: false,
      },
      render: user => (
        <Image
          width={50}
          style={{
            borderRadius: '50%'
          }}
          src={user.avatar}
        />
      )
    },
    {
      title: 'Tên',
      dataIndex: 'user',
      key: 'user',
      ellipsis: {
        showTitle: false,
      },
      render: user => (
        <Tooltip placement="top" title={user.name} color="pink" key="volcano">
          <Tag color="#096dd9" key={user.name}>
            {user.name}
          </Tag>
        </Tooltip>
      )
    },
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'user',
      ellipsis: {
        showTitle: false,
      },
      render: user => (
        <Tooltip color="pink" key="#f50" placement="top" title={user.email}>
          <Tag color="#092b00" key={user.email}>
            {user.email}
          </Tag>
        </Tooltip>
      )
    },
    {
      title: 'Thời Gian',
      dataIndex: 'user',
      key: 'user',
      ellipsis: {
        showTitle: false,
      },
      render: user => (
        <Tooltip placement="top" title={moment(user.createdAt).format('LLLL')}>
          <Tag color="#237804" key={user.createdAt}>
            {moment(user.createdAt).fromNow()}
          </Tag>
        </Tooltip>
      )
    },
    {
      title: 'Vài Trò',
      dataIndex: 'user',
      key: 'user',
      ellipsis: {
        showTitle: false,
      },
      render: user => (
        <>
          {
            user.role === 1 ?
              <Tag color="#f5222d" key={user.role}>
                Quản trị viên
              </Tag> :
              <Tag color="#5c0011" key={user.role}>
                Người dùng
              </Tag>
          }
        </>
      )
    },
    {
      title: 'Bình Luận',
      dataIndex: 'length_comment',
      key: 'length_comment',
      ellipsis: {
        showTitle: false,
      },
      render: (length_comment, { user }) => (
        <>
          <span
            style={{ paddingBottom: '5px', display: 'block' }}
          >
            <Badge
              style={{ backgroundColor: '#1890ff' }}
              count={length_comment}
              overflowCount={9}
            />
          </span>
          <CommentOutlined
            onClick={
              () => {
                setIdUser(user._id);
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
      title: 'Giỏ Hàng',
      dataIndex: 'length_cart',
      key: 'length_cart',
      ellipsis: {
        showTitle: false,
      },
      render: (length_cart, { user }) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ marginRight: '8px', }}>
            <span
              style={{ paddingBottom: '5px', display: 'block' }}
            >
              <Badge
                style={{ backgroundColor: '#f5222d' }}
                count={length_cart}
                overflowCount={9}
              >
              </Badge>
            </span>
            <ShoppingCartOutlined
              onClick={
                () => {
                  setIdUser(user._id);
                  setOpenCartUser(true)
                }
              }
              style={{ color: '#f5222d', fontSize: '1.2em', cursor: 'pointer' }}
            />
          </div>
          <Popconfirm Popconfirm
            title="Bạn Chắc chắn xóa tất cả giỏ hàng tài khoản này không ?"
            onConfirm={() => deleteAllCart(user._id)}
            okText="Có"
            cancelText="Không"
            placement="leftTop"
          >
            <DeleteOutlined
              style={{ color: 'red', fontSize: '1.2em', top: '9px', position: 'relative', marginLeft: '15px', cursor: 'pointer' }}
            />
          </Popconfirm>
        </div>
      )
    },
    {
      title: 'Vai trò',
      key: 'user',
      dataIndex: 'user',
      fixed: 'right',
      render: (user) => {
        return (
          <>
            {
              user.email === 'huuphuocit1999@gmail.com' ?
                <LockOutlined
                  style={{
                    color: 'black',
                    fontSize: '1.3em',
                  }} />
                :
                <>
                  <Tag color="#237804" key={user._id}>Amin</Tag>
                  <Switch
                    defaultChecked={user.role === 1 ? true : false}
                    onChange={onChangeRole}
                    onClick={() => setIdRole(user._id)}
                  />
                </>
            }
          </>
        );
      },
    },
    {
      title: 'Hành Động',
      key: 'user',
      dataIndex: 'user',
      fixed: 'right',
      render: user => {
        return (
          <>
            {
              user.email === 'huuphuocit1999@gmail.com' ?
                <LockOutlined
                  style={{
                    color: 'black',
                    fontSize: '1.3em',
                  }} />
                :
                < Popconfirm
                  title="Bạn Chắc chắn xóa tài khoản này không ?"
                  onConfirm={() => deleteAccountUser(user._id)}
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
                </ Popconfirm>
            }
          </>
        );
      },
    },
  ];
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
};


