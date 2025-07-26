// frontend/src/pages/StudentPage.js
import React, { useState, useEffect } from 'react';

const StudentPage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * @function fetchStudents
     * @description 获取所有学生信息
     */
    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem('token');
            try {
                setLoading(true);
                const response = await fetch('http://localhost:5000/api/students', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setStudents(data);
                } else {
                    setError(data.message || '获取学生列表失败');
                }
            } catch (error) {
                setError('获取学生列表失败，请检查网络连接或联系管理员。');
                console.error('获取学生列表失败', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const containerStyle = {
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px'
    };

    const thTdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left'
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#f2f2f2'
    };

    const buttonStyle = {
        marginRight: '5px',
        padding: '5px 10px',
        border: 'none',
        cursor: 'pointer'
    };

    if (loading) {
        return <div style={containerStyle}>正在加载...</div>;
    }

    if (error) {
        return <div style={containerStyle}>错误: {error}</div>;
    }

    return (
        <div style={containerStyle}>
            <h2>学生管理</h2>
            {students.length === 0 ? (
                <p>暂无学生记录</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>姓名</th>
                            <th style={thStyle}>性别</th>
                            <th style={thStyle}>出生日期</th>
                            <th style={thStyle}>邮箱</th>
                            <th style={thStyle}>电话</th>
                            <th style={thStyle}>地址</th>
                            <th style={thStyle}>入学日期</th>
                            <th style={thStyle}>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td style={thTdStyle}>{student.id}</td>
                                <td style={thTdStyle}>{student.full_name}</td>
                                <td style={thTdStyle}>{student.gender}</td>
                                <td style={thTdStyle}>{new Date(student.date_of_birth).toLocaleDateString()}</td>
                                <td style={thTdStyle}>{student.email}</td>
                                <td style={thTdStyle}>{student.phone_number}</td>
                                <td style={thTdStyle}>{student.address}</td>
                                <td style={thTdStyle}>{new Date(student.enrollment_date).toLocaleDateString()}</td>
                                <td style={thTdStyle}>
                                    <button style={{...buttonStyle, backgroundColor: '#4CAF50', color: 'white'}}>编辑</button>
                                    <button style={{...buttonStyle, backgroundColor: '#f44336', color: 'white'}}>删除</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StudentPage;