/**
 * @file 学生成绩查询页面
 * @description 学生登录后，可查看自己的成绩
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentGradePage = () => {
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState('');

  /**
   * @function useEffect
   * @description 组件加载时，获取学生成绩
   */
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        if (!token) {
          setError('请先登录');
          return;
        }

        const response = await axios.get('http://localhost:5002/api/student/grades', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGrades(response.data);
      } catch (err) {
        setError('获取成绩失败');
        console.error(err);
      }
    };

    fetchGrades();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>我的成绩</h2>
      <table>
        <thead>
          <tr>
            <th>课程名称</th>
            <th>分数</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.grade_id}>
              <td>{grade.course_name}</td>
              <td>{grade.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentGradePage;