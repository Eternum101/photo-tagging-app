const Character = require('../models/Character');

exports.createCharacter = (req, res) => {
  const newCharacter = new Character(req.body);

  newCharacter.save()
    .then(character => res.status(201).json(character))
    .catch(error => res.status(400).json({ message: error.message }));
};

exports.getCharactersByLevel = (req, res) => {
  Character.find({ level: req.params.level })
    .then(characters => res.json(characters))
    .catch(error => res.status(500).json({ message: error.message }));
};
