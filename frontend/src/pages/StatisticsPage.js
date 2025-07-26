import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin } from 'antd';

const StatisticsPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/statistics', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('获取统计数据失败:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <div>
            <h2>数据统计</h2>
            {stats ? (
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="学生总数" bordered={false}>{stats.studentCount}</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="课程总数" bordered={false}>{stats.courseCount}</Card>
                    </Col>
                    <Col span={8}>
                        <Card title="平均成绩" bordered={false}>
                            {typeof stats.averageGrade === 'number' ? stats.averageGrade.toFixed(2) : 'N/A'}
                        </Card>
                    </Col>
                </Row>
            ) : (
                <p>无法加载统计数据。</p>
            )}
        </div>
    );
};

export default StatisticsPage;