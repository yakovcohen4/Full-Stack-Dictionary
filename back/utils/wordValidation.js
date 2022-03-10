const wordEnglishValidationRegex = /^[a-z]+$/gi;

const wordEnglishValidation = word => {
  if (!word.match(wordEnglishValidationRegex)) {
    throw { status: 400, message: 'not word in English' };
  }
};

module.exports = { wordEnglishValidation };
