import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, BarChartOutlined } from '@ant-design/icons';
import { Outlet, Link } from 'react-router-dom';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

/**
 * @function MainLayout
 * @description 主布局组件，包含头部、侧边栏和内容区域
 * @returns {JSX.Element}
 */
const MainLayout = () => {
  // 侧边栏菜单项
  const menuItems = [
    { key: 'students', icon: <UserOutlined />, label: <Link to="/admin/students">学生管理</Link> },
    { key: 'courses', icon: <LaptopOutlined />, label: <Link to="/admin/courses">课程管理</Link> },
    { key: 'grades', icon: <NotificationOutlined />, label: <Link to="/admin/grades">成绩管理</Link> },
    { key: 'statistics', icon: <BarChartOutlined />, label: <Link to="/admin/statistics">数据统计</Link> },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#007aff' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>学生管理系统</Title>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#f0f2f5' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['students']}
            style={{ height: '100%', borderRight: 0 }}
            items={menuItems}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;