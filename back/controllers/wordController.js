const { TABLE_NAME, REGION } = require('../utils/constants');

const AWS = require('aws-sdk');
AWS.config.update({ region: REGION }); // for the test
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Search by word
exports.findWord = async (req, res) => {
  const { word } = req.params;

  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: `word = :word`,
    ExpressionAttributeValues: {
      ':word': word.toUpperCase(),
    },
  };

  try {
    const result = await dynamoDB.query(params).promise();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
