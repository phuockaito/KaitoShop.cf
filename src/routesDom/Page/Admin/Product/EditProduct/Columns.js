import { Tag, Tooltip, Avatar, Image, Button, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

const confirm = e => {
  console.log(e)
}

const Columns = [
  {
    title: 'Tên Sản Phẩm',
    dataIndex: 'name',
    key: 'name',
    ellipsis: {
      showTitle: false,
    },
    render: (name, product) => (
      <Tooltip placement="topLeft" title={name}>
        <Link
          to={`/${product.key}/${product.NSX.replace(/ /g, '-')}/${product.name.replace(/ /g, '-')}/${product._id}`}>
          <Tag
            color="#f5222d"
            key={name}
          >
            {name}
          </Tag>
        </Link>
      </Tooltip>
    )
  },
  {
    title: 'Ảnh',
    dataIndex: 'poster',
    key: 'poster',
    ellipsis: {
      showTitle: false,
    },
    render: poster => (
      <Image.PreviewGroup>
        <Avatar.Group>
          <Image src={poster[0].url} />
          <Image src={poster[1].url} />
          <Image src={poster[2].url} />
          <Image src={poster[3].url} />
        </Avatar.Group>
      </Image.PreviewGroup>
    )
  },
  {
    title: 'Màu sắc',
    dataIndex: 'color',
    key: 'color',
    dataIndex: 'color',
    render: color => {
      return (
        color.map((color, index) => (
          <Tag color="#092b00" key={index}>
            {color}
          </Tag>
        ))
      );
    }
  },
  {
    title: 'Giới Tính',
    dataIndex: 'sex',
    key: 'sex',
    dataIndex: 'sex',
    render: sex => {
      return (
        <Tag sex="#092b00" key={sex}>
          {sex.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    title: 'Nhà Xản Xuất',
    dataIndex: 'key',
    key: 'key',
    dataIndex: 'key',
    render: key => {
      return (
        <Tag color="#1890ff" key={key}>
          {key.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    title: 'Bộ Sưu Tập',
    dataIndex: 'collections',
    key: 'collections',
    render: collections => {
      return (
        <Tooltip placement="topLeft" title={collections}>
          <Tag color="#389e0d" key={collections}>
            {collections.toUpperCase()}
          </Tag>
        </Tooltip>
      );
    }
  },
  {
    title: 'Loại Sản Phẩm',
    dataIndex: 'productType',
    key: 'productType',
    render: productType => {
      return (
        <Tooltip placement="topLeft" title={productType}>
          <Tag color="#fa8c16" key={productType}>
            {productType.toUpperCase()}
          </Tag>
        </Tooltip>
      );
    }
  },
  {
    title: 'Dòng Sản Phẩm',
    key: 'NSX',
    dataIndex: 'NSX',
    render: NSX => {
      return (
        <Tooltip placement="topLeft" title={NSX}>
          <Tag color="#eb2f96" key={NSX}>
            {NSX.toUpperCase()}
          </Tag>
        </Tooltip>
      );
    }
  },
  {
    title: 'hoạt động',
    key: '_id',
    dataIndex: '_id',
    fixed: 'right',
    render: _id => {
      return (
        <>

          <Link to={`/admin-product/${_id}`}>
            <Button type="primary">Chỉnh Sữa</Button></Link>
          <Popconfirm
            title="Chắc chắn để xóa ?"
            onConfirm={confirm}
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
export default Columns;