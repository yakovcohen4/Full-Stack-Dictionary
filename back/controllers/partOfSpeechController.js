const { TABLE_NAME, REGION } = require('../utils/constants');
const { partOfSpeechValidation } = require('../utils/partOfSpeechValidation');

const AWS = require('aws-sdk');
AWS.config.update({ region: REGION }); // for the test
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Search by Part Of Speech random word
exports.partOfSpeech = async (req, res, next) => {
  const { part } = req.params;
  const { letter } = req.query;

  const params = {
    TableName: TABLE_NAME,
    FilterExpression: `#pos = :part and contains( #word , :letter)`,
    ExpressionAttributeNames: {
      '#pos': 'pos',
      '#word': 'word',
    },
    ExpressionAttributeValues: {
      ':part': part,
      ':letter': letter ? letter.toUpperCase() : '',
    },
  };

  try {
    // part of speech Validation - check if Part is OK (noun,verb..)
    partOfSpeechValidation(part);

    const result = await dynamoDB.scan(params).promise();
    if (result.Items.length === 0) {
      throw { status: 404, message: 'no result for this part of speech' };
    }
    const randomNum = Math.floor(Math.random() * result.Items.length); // random number
    res.send(result.Items[randomNum]);
  } catch (err) {
    next(err);
  }
};
