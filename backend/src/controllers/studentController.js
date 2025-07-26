const db = require('../config/database');

/**
 * 获取所有学生信息 (管理员)
 */
exports.getAllStudents = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM students');
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '获取学生信息失败' });
  }
};

/**
 * 根据ID获取单个学生信息 (管理员)
 */
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
    if (results.length === 0) {
      res.status(404).json({ message: '未找到该学生' });
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '获取学生信息失败' });
  }
};

/**
 * 学生获取个人信息
 */
exports.getProfile = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, student_id, full_name, gender, date_of_birth, email, phone_number, address, enrollment_date FROM students WHERE user_id = ?', [req.user.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: '未找到学生信息' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error });
    }
};

/**
 * 学生更新个人信息
 */
exports.updateProfile = async (req, res) => {
    const { full_name, gender, date_of_birth, email, phone_number, address } = req.body;
    try {
        await db.query(
            'UPDATE students SET full_name = ?, gender = ?, date_of_birth = ?, email = ?, phone_number = ?, address = ? WHERE user_id = ?',
            [full_name, gender, date_of_birth, email, phone_number, address, req.user.id]
        );
        res.json({ message: '个人信息更新成功' });
    } catch (error) {
        res.status(500).json({ message: '服务器错误', error });
    }
};

/**
 * 创建新学生 (管理员)
 */
exports.createStudent = async (req, res) => {
  const { user_id, student_id, full_name, gender, date_of_birth, email, phone_number, address, enrollment_date } = req.body;
  try {
    const [results] = await db.query('INSERT INTO students (user_id, student_id, full_name, gender, date_of_birth, email, phone_number, address, enrollment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [user_id, student_id, full_name, gender, date_of_birth, email, phone_number, address, enrollment_date]);
    res.status(201).json({ id: results.insertId, student_id, full_name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '创建学生失败' });
  }
};

/**
 * 更新学生信息 (管理员)
 */
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { student_id, full_name, gender, date_of_birth, email, phone_number, address, enrollment_date } = req.body;
  try {
    const [results] = await db.query('UPDATE students SET student_id = ?, full_name = ?, gender = ?, date_of_birth = ?, email = ?, phone_number = ?, address = ?, enrollment_date = ? WHERE id = ?', [student_id, full_name, gender, date_of_birth, email, phone_number, address, enrollment_date, id]);
    if (results.affectedRows === 0) {
      res.status(404).json({ message: '未找到该学生' });
    } else {
      res.json({ id, full_name });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '更新学生信息失败' });
  }
};

/**
 * 删除学生信息 (管理员)
 */
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await db.query('DELETE FROM students WHERE id = ?', [id]);
    if (results.affectedRows === 0) {
      res.status(404).json({ message: '未找到该学生' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '删除学生失败' });
  }
};
