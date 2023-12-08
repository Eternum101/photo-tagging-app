const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

router.post('/', leaderboardController.addScore);

module.exports = router;