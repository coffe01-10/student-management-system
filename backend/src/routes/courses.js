// backend/src/routes/courses.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route GET /api/courses
 * @description 获取所有课程
 * @access Private
 */
router.get('/', authMiddleware, courseController.getAllCourses);

/**
 * @route GET /api/courses/:id
 * @description 获取单个课程
 * @access Private
 */
router.get('/:id', authMiddleware, courseController.getCourseById);

/**
 * @route POST /api/courses
 * @description 创建新课程
 * @access Private
 */
router.post('/', authMiddleware, courseController.createCourse);

/**
 * @route PUT /api/courses/:id
 * @description 更新课程
 * @access Private
 */
router.put('/:id', authMiddleware, courseController.updateCourse);

/**
 * @route DELETE /api/courses/:id
 * @description 删除课程
 * @access Private
 */
router.delete('/:id', authMiddleware, courseController.deleteCourse);

module.exports = router;