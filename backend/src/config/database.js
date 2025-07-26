const mysql = require('mysql2');
require('dotenv').config();

/**
 * 创建数据库连接池
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'student_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * 将连接池Promise化，以便进行异步操作
 */
const promisePool = pool.promise();

module.exports = promisePool;