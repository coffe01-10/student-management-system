const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/database');

exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  if (!role || !username || !password) {
    return res.status(400).json({ message: '请求参数不完整 (role, username, password)' });
  }

  try {
    // 统一查询 users 表
    const query = "SELECT * FROM users WHERE username = ? AND role = ?";
    const [rows] = await db.execute(query, [username, role]);

    if (rows.length === 0) {
      return res.status(401).json({ message: '用户不存在或角色错误' });
    }

    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: '密码错误' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: '登录成功',
      token: token,
      user: payload
    });

  } catch (error) {
    console.error('[Login Error]', error);
    res.status(500).json({ message: '服务器内部错误，请联系管理员' });
  }
};
