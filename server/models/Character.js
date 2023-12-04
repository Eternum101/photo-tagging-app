const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  coordinates: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  level: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Character', CharacterSchema);
