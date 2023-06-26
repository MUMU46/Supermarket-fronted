import React, { useState } from 'react';

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme,Avatar } from 'antd';
import './index.less'
import { NavLink, Outlet,useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<NavLink to={'/staff/home'} >首页</NavLink>, '1', <PieChartOutlined />),
  getItem(<NavLink to={'/staff/goods'}>商品管理</NavLink>, '2', <DesktopOutlined />),
  getItem(<NavLink to={'/staff/vip'}>会员管理</NavLink>, '3', <DesktopOutlined />),
  getItem(<NavLink to={'/staff/supplierall'}>供应商管理</NavLink>, '5', <TeamOutlined />/*  [getItem('Team 1', '6'), getItem('Team 2', '8')] */),
  getItem(<NavLink to={'/staff/sale'}>销售管理</NavLink>, '6', <TeamOutlined />/*  [getItem('Team 1', '6'), getItem('Team 2', '8')] */),
  
];

const S_layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate()

  function toUser(){
    navigate('/user')
  }
  
  return (
    <>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header className='header' style={{ padding: 0, background: colorBgContainer , color:'#6AA7FB'}} >
            <div className='title'>超市管理系统</div>
            <div className='user' onClick={toUser}>
                <Avatar className='avatar' shape="square" size='large' src={''} icon={<UserOutlined />} />
                <div className='u_name'>用户名</div>
            </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <div className='content' style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
            <div className='Login'></div>
    </>
    )
}

export default S_layout;