import React from 'react';
import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';

// 导入布局和页面组件
import MainLayout from '../components/MainLayout';
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import StudentLoginPage from '../pages/StudentLoginPage';
import StudentPage from '../pages/StudentPage';
import CoursePage from '../pages/CoursePage';
import GradePage from '../pages/GradePage';
import StatisticsPage from '../pages/StatisticsPage';
import StudentDashboardPage from '../pages/StudentDashboardPage';
import StudentProfilePage from '../pages/StudentProfilePage';

/**
 * 路由加载器，用于保护需要身份验证的路由。
 * 如果用户未登录（即localStorage中没有token），则重定向到主欢迎页。
 */
const protectedLoader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/');
  }
  return null;
};

/**
 * 应用的路由配置
 */
const router = createBrowserRouter([
  // 公共路由
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/login/admin',
    element: <LoginPage />,
  },
  {
    path: '/login/student',
    element: <StudentLoginPage />,
  },

  // 管理员路由 (使用MainLayout布局)
  {
    path: '/admin',
    element: <MainLayout />,
    loader: protectedLoader,
    children: [
      { index: true, element: <Navigate to="/admin/students" replace /> },
      { path: 'students', element: <StudentPage /> },
      { path: 'courses', element: <CoursePage /> },
      { path: 'grades', element: <GradePage /> },
      { path: 'statistics', element: <StatisticsPage /> },
    ],
  },

  // 学生路由 (可以有自己的布局或直接使用页面组件)
  {
    path: '/student',
    loader: protectedLoader,
    children: [
        { path: 'dashboard', element: <StudentDashboardPage /> },
        { path: 'profile', element: <StudentProfilePage /> },
        // 未来可以添加更多学生相关的页面，如 /student/my-grades, /student/my-courses
    ]
  },
]);

export default router;
