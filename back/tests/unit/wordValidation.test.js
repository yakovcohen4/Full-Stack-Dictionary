const { wordEnglishValidation } = require('../../utils/wordValidation');

describe('word validation test', () => {
  test('of the word "example" -> return undefined', () => {
    expect(wordEnglishValidation('example')).toBeUndefined();
  });

  test('of the word "example1" -> Error status: 400 , message: not word in English', () => {
    try {
      wordEnglishValidation('example1');
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe('not word in English');
    }
  });

  test('of the word "!@#$%^&*()_+" -> Error status: 400 , message: not word in English', () => {
    try {
      wordEnglishValidation('!@#$%^&*()_+');
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe('not word in English');
    }
  });
});
