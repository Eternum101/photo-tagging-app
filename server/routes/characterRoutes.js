const express = require('express');
const characterController = require('../controllers/characterController');

const router = express.Router();

router.get('/', characterController.getAllCharacters);
router.post('/', characterController.createCharacter);
router.get('/:level', characterController.getCharactersByLevel);


module.exports = router;
