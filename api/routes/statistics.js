const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics');

router.get('/', statisticsController.get_stats);

router.get('/:id', statisticsController.get_user_stats);

module.exports = router;