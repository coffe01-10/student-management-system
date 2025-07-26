/**
 * @file CourseSelectionPage.js
 * @description 学生选课页面
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseSelectionPage = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 获取可选课程列表
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/student/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (error) {
        console.error('获取课程列表失败:', error);
        setMessage('获取课程列表失败');
      }
    };

    fetchCourses();
  }, []);

  const handleSelectCourse = async (course_id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/student/select', 
        { course_id }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error('选课失败:', error);
      setMessage(error.response?.data?.message || '选课失败');
    }
  };

  return (
    <div>
      <h2>选课中心</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>课程名称</th>
            <th>教师</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.course_id}>
              <td>{course.name}</td>
              <td>{course.teacher}</td>
              <td>
                <button onClick={() => handleSelectCourse(course.course_id)}>
                  选择
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseSelectionPage;