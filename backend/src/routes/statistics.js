const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route GET /api/statistics
 * @description 获取统计数据
 * @access 私有
 */
router.get('/', authMiddleware, statisticsController.getStatistics);

module.exports = router;