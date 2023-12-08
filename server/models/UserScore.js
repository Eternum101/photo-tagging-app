const mongoose = require('mongoose');

const userScoreSchema = new mongoose.Schema({
    username: { type: String, required: true },
    time: { type: Number, required: true },
    level: { type: Number, required: true }
  });
  
  const UserScore = mongoose.model('UserScore', userScoreSchema);
  
  module.exports = UserScore;
