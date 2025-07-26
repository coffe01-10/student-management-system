const db = require('../config/database');

/**
 * @function getStatistics
 * @description 获取统计数据
 * @param {object} req - Express 请求对象
 * @param {object} res - Express 响应对象
 */
exports.getStatistics = async (req, res) => {
    try {
        const [students] = await db.query('SELECT COUNT(*) as count FROM students');
        const [courses] = await db.query('SELECT COUNT(*) as count FROM courses');
        const [grades] = await db.query('SELECT AVG(score) as average FROM grades');

        res.json({
            studentCount: students[0].count,
            courseCount: courses[0].count,
            averageGrade: grades[0].average
        });
    } catch (error) {
        res.status(500).json({ message: '获取统计数据失败', error });
    }
};