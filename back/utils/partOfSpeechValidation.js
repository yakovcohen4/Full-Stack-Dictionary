// part of speech list
const { partOfSpeechList } = require('../utils/constants');

const partOfSpeechValidation = part => {
  if (!partOfSpeechList.includes(part)) {
    throw { status: 400, message: 'not part of speech in English' };
  }
};

module.exports = { partOfSpeechValidation };
