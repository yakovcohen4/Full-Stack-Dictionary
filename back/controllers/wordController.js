const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const { TABLE_NAME } = require('../utils/constants');

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
