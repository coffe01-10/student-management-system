/**
 * @file courseSelectionController.js
 * @description 学生选课功能控制器
 */

const db = require('../config/database');

/**
 * @function getAvailableCourses
 * @description 获取所有可选课程列表
 * @param {object} req - Express请求对象
 * @param {object} res - Express响应对象
 */
exports.getAvailableCourses = async (req, res) => {
  try {
    const [courses] = await db.query('SELECT course_id, name, teacher FROM courses');
    res.json(courses);
  } catch (error) {
    console.error('获取课程列表失败:', error);
    res.status(500).json({ message: '获取课程列表失败' });
  }
};

/**
 * @function selectCourse
 * @description 学生选择课程
 * @param {object} req - Express请求对象
 * @param {object} res - Express响应对象
 */
exports.selectCourse = async (req, res) => {
  const { course_id } = req.body;
  const student_id = req.user.student_id;

  try {
    // 检查是否已经选过该课程
    const [existing] = await db.query('SELECT * FROM grades WHERE student_id = ? AND course_id = ?', [student_id, course_id]);
    if (existing.length > 0) {
      return res.status(400).json({ message: '您已选修该课程' });
    }

    // 插入选课记录
    await db.query('INSERT INTO grades (student_id, course_id) VALUES (?, ?)', [student_id, course_id]);
    res.status(201).json({ message: '选课成功' });
  } catch (error) {
    console.error('选课失败:', error);
    res.status(500).json({ message: '选课失败' });
  }
};

/**
 * @function getSelectedCourses
 * @description 获取当前学生已选课程列表
 * @param {object} req - Express请求对象
 * @param {object} res - Express响应对象
 */
exports.getSelectedCourses = async (req, res) => {
  const student_id = req.user.student_id;

  try {
    const [courses] = await db.query(`
      SELECT c.name, c.teacher, g.score
      FROM courses c
      JOIN grades g ON c.course_id = g.course_id
      WHERE g.student_id = ?
    `, [student_id]);
    res.json(courses);
  } catch (error) {
    console.error('获取已选课程失败:', error);
    res.status(500).json({ message: '获取已选课程失败' });
  }
};