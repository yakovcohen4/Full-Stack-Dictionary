const wordEnglishValidationRegex = /^[a-z]+$/gi;

const wordEnglishValidation = word => {
  if (!wordEnglishValidationRegex.test(word)) {
    throw { status: 400, message: 'not word in English' };
  }
};

module.exports = { wordEnglishValidation };
