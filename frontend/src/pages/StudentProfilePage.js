/**
 * @file 学生个人信息页面
 * @description 显示登录学生的个人信息
 */
import React, { useState, useEffect } from 'react';

const StudentProfilePage = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5002/api/student/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setStudent(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('获取学生信息失败:', error);
      }
    };

    fetchStudentProfile();
  }, []);

  if (!student) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h2>个人信息</h2>
      <p><strong>学号:</strong> {student.student_id}</p>
      <p><strong>姓名:</strong> {student.name}</p>
      <p><strong>性别:</strong> {student.gender}</p>
      <p><strong>年龄:</strong> {student.age}</p>
      <p><strong>专业:</strong> {student.major}</p>
    </div>
  );
};

export default StudentProfilePage;