const {
  partOfSpeechValidation,
} = require('../../utils/partOfSpeechValidation');
const { partOfSpeechList } = require('../../utils/constants');

describe('part of speech test', () => {
  test("of the part of speech 'n.' -> return undefined", () => {
    expect(partOfSpeechValidation('n.')).toBeUndefined();
  });

  test('of all part of speech -> return undefined', () => {
    for (let part of partOfSpeechList) {
      expect(partOfSpeechValidation(part)).toBeUndefined();
    }
  });

  test("of the part of speech 'nounVerb' -> Error status: 400 , message: not word in English", () => {
    try {
      partOfSpeechValidation('nounVerb');
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe('not part of speech in English');
    }
  });
});
