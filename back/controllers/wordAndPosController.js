const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const { TABLE_NAME } = require('../utils/constants');

// Search by Part Of Speech and word
exports.findWordAndPos = async (req, res) => {
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
    const result = await dynamoDB.query(params).promise();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
