const express = require('express');
const router = express.Router();

const { findWord } = require('../controllers/wordController');
const { partOfSpeech } = require('../controllers/partOfSpeechController');
const { findWordAndPos } = require('../controllers/wordAndPosController');

// get
router.get('/:word', findWord); // word
router.get('/part-of-speech/:part', partOfSpeech); // pos
router.get('/:word/:partOfSpeech', findWordAndPos); // word && pos

module.exports.searchRouter = router;
