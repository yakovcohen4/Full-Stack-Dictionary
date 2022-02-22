const { TABLE_NAME, REGION } = require('../utils/constants');

const AWS = require('aws-sdk');
AWS.config.update({ region: REGION }); // for the test
const dynamoDB = new AWS.DynamoDB.DocumentClient();

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
