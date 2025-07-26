/**
 * @file 学生个人信息路由
 * @description 定义学生个人信息相关的API路由
 */
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route GET /api/student/profile
 * @description 获取学生个人信息
 * @access 私有
 */
router.get('/profile', authMiddleware, studentController.getProfile);

module.exports = router;