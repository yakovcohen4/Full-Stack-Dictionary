const { TABLE_NAME, REGION, partOfSpeechList } = require('../utils/constants');

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
    // Validation - word is not word in english (A-Z)
    const wordValid = /^[a-z]+$/gi.test(word);
    if (!wordValid) {
      throw { status: 400, message: 'not word in English' };
    }
    // check if part of speech is in the list
    if (!partOfSpeechList.includes(partOfSpeech)) {
      throw { status: 400, message: 'not part of speech in English' };
    }
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
