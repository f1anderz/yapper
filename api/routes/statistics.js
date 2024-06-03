const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics');

const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, statisticsController.get_stats);

router.get('/:id', checkAuth, statisticsController.get_user_stats);

module.exports = router;