const { TABLE_NAME, REGION } = require('../utils/constants');
const { wordEnglishValidation } = require('../utils/wordValidation');
const { partOfSpeechValidation } = require('../utils/partOfSpeechValidation');

const AWS = require('aws-sdk');
AWS.config.update({ region: REGION }); // for the test
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Search by Part Of Speech and word
exports.findWordAndPos = async (req, res, next) => {
  const { word, partOfSpeech } = req.params;

  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: `word = :word and pos = :pos`,
    ExpressionAttributeValues: {
      ':word': word.toUpperCase(),
      ':pos': partOfSpeech,
    },
  };

  try {
    // word Validation - check if word is in english (A-Z)
    wordEnglishValidation(word);

    // part of speech Validation - check if Part is OK (noun,verb..)
    partOfSpeechValidation(partOfSpeech);

    const result = await dynamoDB.query(params).promise();
    // The search did not find a word
    if (result.Items.length === 0) {
      throw {
        status: 404,
        message: 'no result for this word & part of speech',
      };
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
};
