import { useState } from 'react';
import {
  HomeOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  FileAddOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import './style.css';
export default function MenuAdmin({ CloseMenu, Link }) {
  const { SubMenu } = Menu;

  const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div className="group-menu-admin">
      <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 270 }}>
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
        {/* <SubMenu key="sub2" icon={<PieChartOutlined />} title="Quản Lý Sản Phẩm">
          <Menu.Item key="2">Tất Cả Sản Phẩm</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu> */}
      </Menu>
    </div>
  )
}