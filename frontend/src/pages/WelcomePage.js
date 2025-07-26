import React from 'react';
import { Card, Button, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 500, textAlign: 'center', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
        <Title level={2}>欢迎使用学生管理系统</Title>
        <Paragraph type="secondary">请选择您的登录入口</Paragraph>
        <Row gutter={16} style={{ marginTop: 40 }}>
          <Col span={12}>
            <Button 
              type="primary" 
              icon={<TeamOutlined />} 
              style={{ width: '100%', height: 60, fontSize: '18px' }}
              onClick={() => navigate('/login/admin')}
            >
              管理员入口
            </Button>
          </Col>
          <Col span={12}>
            <Button 
              type="default" 
              icon={<UserOutlined />} 
              style={{ width: '100%', height: 60, fontSize: '18px' }}
              onClick={() => navigate('/login/student')}
            >
              学生入口
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default WelcomePage;
