const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// --- 学生个人路由 ---
// 这些路由需要用户已登录，并且角色是 'student'
router.get('/profile', authMiddleware, roleMiddleware(['student']), studentController.getProfile);
router.put('/profile', authMiddleware, roleMiddleware(['student']), studentController.updateProfile);

// --- 管理员管理学生的路由 ---
// 这些路由需要用户已登录，并且角色是 'admin'
router.get('/', authMiddleware, roleMiddleware(['admin']), studentController.getAllStudents);
router.get('/:id', authMiddleware, roleMiddleware(['admin']), studentController.getStudentById);
router.post('/', authMiddleware, roleMiddleware(['admin']), studentController.createStudent);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), studentController.updateStudent);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), studentController.deleteStudent);

module.exports = router;
