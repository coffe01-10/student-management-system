const jwt = require('jsonwebtoken');

/**
 * 认证中间件
 * @param {object} req - 请求对象
 * @param {object} res - 响应对象
 * @param {function} next - 下一个中间件函数
 */
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: '未提供认证信息' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token格式不正确' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token无效或已过期' });
  }
};