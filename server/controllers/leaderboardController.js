const UserScore = require('../models/UserScore');

exports.addScore = (req, res) => {
  console.log('Received data:', req.body);
  const userScore = new UserScore({
    username: req.body.username,
    time: req.body.time,
    level: req.body.level
  });

  userScore.save()
    .then(savedUserScore => {
      res.status(201).json(savedUserScore);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
};

exports.getLeaderboard = (req, res) => {
  const selectedLevel = req.params.level;

  UserScore.find({ level: selectedLevel }).sort('time')
    .then(scores => {
      scores = scores.map((score, index) => {
        score = score.toObject();
        score.place = index + 1;
        return score;
      });

      res.status(200).json(scores);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};


