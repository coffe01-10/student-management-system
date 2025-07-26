/**
 * @file 学生成绩路由
 * @description 定义学生获取自己成绩的 API 路由
 */
const express = require('express');
const router = express.Router();
const { getMyGrades } = require('../controllers/gradeController');
const authMiddleware = require('../middleware/authMiddleware');

// 学生获取自己的成绩，需要认证
router.get('/grades', authMiddleware, getMyGrades);

module.exports = router;