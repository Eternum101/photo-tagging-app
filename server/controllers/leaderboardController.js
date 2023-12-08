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

