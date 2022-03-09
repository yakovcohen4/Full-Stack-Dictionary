const { TABLE_NAME, REGION } = require('../utils/constants');
const { wordEnglishValidation } = require('../utils/wordValidation');

const AWS = require('aws-sdk');
AWS.config.update({ region: REGION }); // for the test
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Search by word
exports.findWord = async (req, res, next) => {
  const { word } = req.params;

  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: `word = :word`,
    ExpressionAttributeValues: {
      ':word': word.toUpperCase(),
    },
  };

  try {
    // word Validation - check if word is in english (A-Z)
    wordEnglishValidation(word);

    const result = await dynamoDB.query(params).promise();
    // The search did not find a word
    if (result.Items.length === 0) {
      throw { status: 404, message: 'no result for this word' };
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
};
