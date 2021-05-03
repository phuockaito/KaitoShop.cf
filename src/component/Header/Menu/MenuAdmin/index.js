import {
  HomeOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  FileAddOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './style.css';
export default function MenuAdmin({ Link }) {
  return (
    <div className="group-menu-admin">
      <Menu mode="inline" >
        <Menu.Item key="0" icon={<HomeOutlined />}>
          <Link to="/">Trang Chủ</Link>
        </Menu.Item>
        <Menu.Item key="1" icon={<ShoppingCartOutlined />}>
          <Link to="/admin-cart">Quản Lý Giỏ Hàng</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<PieChartOutlined />}>
          <Link to="/admin-product">Quản Lý Sản Phẩm</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileAddOutlined />}>
          <Link to="/admin-new-product">Thêm Mới Sản Phẩm</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<TeamOutlined />}>
          <Link to="/admin-user">Quản Lý Tài Khoản</Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}