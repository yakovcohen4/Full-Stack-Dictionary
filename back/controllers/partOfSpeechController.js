const { TABLE_NAME, REGION } = require('../utils/constants');

const AWS = require('aws-sdk');
AWS.config.update({ region: REGION }); // for the test
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Search by Part Of Speech random word
exports.partOfSpeech = async (req, res) => {
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
    const result = await dynamoDB.scan(params).promise();
    if (result.Items.length === 0) {
      return res.send('no result for part of speak');
    }
    const randomNum = Math.floor(Math.random() * result.Items.length); // random number
    res.send(result.Items[randomNum]);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
