const pool = require('../config/database');

/**
 * @description 获取所有成绩 (管理员)
 */
exports.getAllGrades = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT g.*, s.full_name as student_name, c.course_name FROM grades g JOIN students s ON g.student_id = s.id JOIN courses c ON g.course_id = c.id');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: '获取成绩列表失败', error });
    }
};

/**
 * @description 根据ID获取单个成绩 (管理员)
 */
exports.getGradeById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM grades WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: '成绩不存在' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: '获取成绩失败', error });
    }
};

/**
 * @description 学生获取个人成绩
 */
exports.getMyGrades = async (req, res) => {
    try {
        const userId = req.user.id; // 从JWT token中获取user_id
        const [student] = await pool.query('SELECT id FROM students WHERE user_id = ?', [userId]);

        if (student.length === 0) {
            return res.status(404).json({ message: '未找到该学生的信息' });
        }

        const studentId = student[0].id;

        const [grades] = await pool.query(
          `SELECT c.course_name, g.score, g.grade_date 
           FROM grades g
           JOIN courses c ON g.course_id = c.id
           WHERE g.student_id = ?`,
          [studentId]
        );
        res.json(grades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '服务器错误' });
    }
};

/**
 * @description 新增成绩 (管理员)
 */
exports.createGrade = async (req, res) => {
    try {
        const { student_id, course_id, score, grade_date } = req.body;
        const [result] = await pool.query('INSERT INTO grades (student_id, course_id, score, grade_date) VALUES (?, ?, ?, ?)', [student_id, course_id, score, grade_date]);
        res.status(201).json({ id: result.insertId, student_id, course_id, score, grade_date });
    } catch (error) {
        res.status(500).json({ message: '新增成绩失败', error });
    }
};

/**
 * @description 更新成绩 (管理员)
 */
exports.updateGrade = async (req, res) => {
    try {
        const { id } = req.params;
        const { score, grade_date } = req.body;

        const [result] = await pool.query('UPDATE grades SET score = ?, grade_date = ? WHERE id = ?', [score, grade_date, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '成绩不存在' });
        }

        res.json({ message: '成绩更新成功' });
    } catch (error) {
        res.status(500).json({ message: '更新成绩失败', error });
    }
};

/**
 * @description 删除成绩 (管理员)
 */
exports.deleteGrade = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM grades WHERE id = ?', [id]);
        res.json({ message: '成绩删除成功' });
    } catch (error) {
        res.status(500).json({ message: '删除成绩失败', error });
    }
};
