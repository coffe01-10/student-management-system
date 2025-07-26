const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// --- 学生个人成绩路由 ---
router.get('/me', authMiddleware, roleMiddleware(['student']), gradeController.getMyGrades);

// --- 管理员管理成绩的路由 ---
router.get('/', authMiddleware, roleMiddleware(['admin']), gradeController.getAllGrades);
router.get('/:id', authMiddleware, roleMiddleware(['admin']), gradeController.getGradeById);
router.post('/', authMiddleware, roleMiddleware(['admin']), gradeController.createGrade);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), gradeController.updateGrade);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), gradeController.deleteGrade);

module.exports = router;
