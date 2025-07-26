// frontend/src/pages/CoursePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Alert, Button } from 'antd';

/**
 * @function CoursePage
 * @description 课程管理页面
 * @returns {JSX.Element}
 */
const CoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/courses', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCourses(res.data);
            } catch (err) {
                setError('获取课程列表失败，请稍后重试。');
                console.error(err);
            }
            setLoading(false);
        };

        fetchCourses();
    }, []);

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: '课程代码', dataIndex: 'course_code', key: 'course_code' },
        { title: '课程名称', dataIndex: 'course_name', key: 'course_name' },
        { title: '描述', dataIndex: 'description', key: 'description' },
        { title: '学分', dataIndex: 'credits', key: 'credits' },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type="link">编辑</Button>
                    <Button type="link" danger>删除</Button>
                </span>
            ),
        },
    ];

    if (loading) {
        return <Spin tip="加载中..."><div style={{ padding: '50px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '4px' }} /></Spin>;
    }

    if (error) {
        return <Alert message="错误" description={error} type="error" showIcon />;
    }

    return (
        <div>
            <h2>课程管理</h2>
            <Table columns={columns} dataSource={courses} rowKey="id" />
        </div>
    );
};

export default CoursePage;