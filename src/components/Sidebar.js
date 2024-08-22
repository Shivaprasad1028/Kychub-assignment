
import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, BarChartOutlined } from '@ant-design/icons';
import './Sidebar.css';  // Separate CSS for Sidebar

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`}>
      <Menu
      className='ul'
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0, backgroundColor: '#3f434c' }}
      >
        <Menu.Item className='li' key="1" icon={<HomeOutlined />}>
          <Link  className='link' to="/">Product Details</Link>
        </Menu.Item>
        <Menu.Item className='li' key="2" icon={<BarChartOutlined />}>
          <Link className='link' to="/compare">Compare Products</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
