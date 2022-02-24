// Essential information that does NOT change

// Table name in DynamoDB
const TABLE_NAME = 'dictionary';

// Region
const REGION = 'eu-west-1';

// part of speech list
const partOfSpeechList = [
  'n.',
  'pron.',
  'v.',
  'a.',
  'adv.',
  'prep.',
  'conj.',
  'interj.',
];

module.exports = { TABLE_NAME, REGION, partOfSpeechList };
