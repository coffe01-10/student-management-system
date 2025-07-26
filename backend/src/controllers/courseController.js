// backend/src/controllers/courseController.js
const db = require('../config/database');

exports.getAllCourses = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM courses');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: '获取课程列表失败', error: error.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: '课程未找到' });
        }
    } catch (error) {
        res.status(500).json({ message: '获取课程信息失败', error: error.message });
    }
};

exports.createCourse = async (req, res) => {
    const { course_code, course_name, description, credits } = req.body;
    try {
        const [result] = await db.query('INSERT INTO courses (course_code, course_name, description, credits) VALUES (?, ?, ?, ?)', [course_code, course_name, description, credits]);
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ message: '创建课程失败', error: error.message });
    }
};

exports.updateCourse = async (req, res) => {
    const { course_code, course_name, description, credits } = req.body;
    try {
        const [result] = await db.query('UPDATE courses SET course_code = ?, course_name = ?, description = ?, credits = ? WHERE id = ?', [course_code, course_name, description, credits, req.params.id]);
        if (result.affectedRows > 0) {
            res.json({ message: '课程更新成功' });
        } else {
            res.status(404).json({ message: '课程未找到' });
        }
    } catch (error) {
        res.status(500).json({ message: '更新课程失败', error: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM courses WHERE id = ?', [req.params.id]);
        if (result.affectedRows > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: '课程未找到' });
        }
    } catch (error) {
        res.status(500).json({ message: '删除课程失败', error: error.message });
    }
};