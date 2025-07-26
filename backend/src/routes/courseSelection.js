/**
 * @file courseSelection.js
 * @description 学生选课功能路由
 */

const express = require('express');
const router = express.Router();
const courseSelectionController = require('../controllers/courseSelectionController');
const authMiddleware = require('../middleware/authMiddleware');

// 获取所有可选课程
router.get('/courses', authMiddleware, courseSelectionController.getAvailableCourses);

// 学生选课
router.post('/select', authMiddleware, courseSelectionController.selectCourse);

// 获取学生已选课程
router.get('/selected-courses', authMiddleware, courseSelectionController.getSelectedCourses);

module.exports = router;