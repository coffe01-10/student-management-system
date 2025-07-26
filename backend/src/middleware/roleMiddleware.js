/**
 * 角色授权中间件
 * @param {string[]} allowedRoles - 允许访问的角色数组, e.g., ['admin', 'student']
 */
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // authMiddleware 应该已经运行过了，所以 req.user 应该存在
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: '权限不足：缺少角色信息' });
    }

    const { role } = req.user;

    if (allowedRoles.includes(role)) {
      // 用户角色在允许列表中，继续
      next();
    } else {
      // 用户角色不在允许列表中，拒绝访问
      return res.status(403).json({ message: '权限不足，此操作不允许该角色访问' });
    }
  };
};

module.exports = roleMiddleware;
