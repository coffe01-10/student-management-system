import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Avatar, Button, List, Statistic, Spin, message, Alert } from 'antd';
import { UserOutlined, BookOutlined, BarChartOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

// API调用函数
const apiFetch = async (url) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:5000${url}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data.message || `请求失败，状态码: ${response.status}`;
    throw new Error(errorMessage);
  }
  return data;
};

const StudentDashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState({ profile: true, grades: true });
  const [error, setError] = useState({ profile: null, grades: null });
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await apiFetch('/api/students/profile');
        setProfile(profileData);
      } catch (e) {
        setError(prev => ({ ...prev, profile: e.message }));
        message.error(`获取个人信息失败: ${e.message}`);
      } finally {
        setLoading(prev => ({ ...prev, profile: false }));
      }
    };

    const loadGrades = async () => {
      try {
        const gradesData = await apiFetch('/api/grades/me');
        setGrades(Array.isArray(gradesData) ? gradesData : []); // 确保grades总是一个数组
      } catch (e) {
        setError(prev => ({ ...prev, grades: e.message }));
        message.error(`获取成绩列表失败: ${e.message}`);
        setGrades([]); // 出错时也设置为空数组
      } finally {
        setLoading(prev => ({ ...prev, grades: false }));
      }
    };

    loadProfile();
    loadGrades();
  }, []);

  // 计算学业概览数据
  const totalCourses = grades.length;
  const gpa = totalCourses > 0 ? (grades.reduce((acc, grade) => acc + (grade.score / 20), 0) / totalCourses).toFixed(2) : 'N/A';

  return (
    <div style={{ padding: '24px', background: '#f0f2f5' }}>
      {loading.profile ? <Spin /> : error.profile ? <Alert message={error.profile} type="error" /> : (
        <>
          <Title level={2}>欢迎回来, {profile?.full_name || '同学'}！</Title>
          <Text type="secondary">今天是 {new Date().toLocaleDateString()}</Text>
        </>
      )}

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card title="个人信息" extra={<Button icon={<EditOutlined />} onClick={() => navigate('/student/profile')}>编辑</Button>}>
            {loading.profile ? <Spin /> : error.profile ? <Alert message={error.profile} type="error" /> : (
              <Row align="middle">
                <Col span={8} style={{ textAlign: 'center' }}><Avatar size={80} icon={<UserOutlined />} /></Col>
                <Col span={16}>
                  <Title level={4}>{profile?.full_name}</Title>
                  <Text>学号: {profile?.student_id}</Text><br/>
                  <Text>邮箱: {profile?.email}</Text>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col span={16}>
          <Card title="学业概览">
            {loading.grades ? <Spin /> : error.grades ? <Alert message={error.grades} type="error" /> : (
              <Row>
                <Col span={8}><Statistic title="已选课程数" value={totalCourses} prefix={<BookOutlined />} /></Col>
                <Col span={8}><Statistic title="平均绩点 (GPA)" value={gpa} prefix={<BarChartOutlined />} /></Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="近期成绩">
            {loading.grades ? <Spin /> : error.grades ? <Alert message={error.grades} type="error" /> : (
              <List
                dataSource={grades.slice(0, 5)}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.course_name}
                      description={`成绩评定日期: ${new Date(item.grade_date).toLocaleDateString()}`}
                    />
                    <div style={{ fontSize: '24px', color: item.score >= 60 ? 'green' : 'red' }}>{item.score}</div>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentDashboardPage;