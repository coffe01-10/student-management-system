import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Link } = Typography;

const StudentLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, role: 'student' }),
      });

      if (response.ok) {
        const data = await response.json();
        message.success('登录成功，欢迎你！');
        localStorage.setItem('token', data.token);
        window.location.href = '/student/dashboard';
      } else {
        // 尝试解析JSON错误信息，如果失败则读取为文本
        try {
          const errorData = await response.json();
          message.error(errorData.message || '学号或密码错误');
        } catch (jsonError) {
          const errorText = await response.text();
          console.error("后端返回的非JSON错误:", errorText);
          message.error(`登录失败: ${errorText.substring(0, 100)}...`);
        }
      }
    } catch (error) {
      console.error("网络或请求构建错误:", error);
      message.error('登录请求出错 (网络连接问题)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card title="学生登录" style={{ width: 400 }}>
        <Form
          name="student_login"
          initialValues={{ username: '', password: '' }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入你的学号!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="学号" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入你的密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              登录
            </Button>
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Link onClick={() => navigate('/login/admin')}>返回管理员登录</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default StudentLoginPage;
