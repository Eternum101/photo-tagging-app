const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

router.post('/', leaderboardController.addScore);
router.get('/leaderboard/:level', leaderboardController.getLeaderboard);

module.exports = router;