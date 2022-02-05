const serverless = require('serverless-http');
const express = require('express');
const app = express();
require('dotenv').config();
const AWS = require('aws-sdk');
const data = require('./dictionary.json');

// ** This file you run to insert your dictionary in the dynamoDB **
// ** You need to run it before you make any requests from the server **
// ** Otherwise you will not receive any information. Because the dynamoDB is empty **

// Connection to dynamoDB
const { REGION } = require('./utils/constants');
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: REGION,
  accessKeyId: process.env.Access_key_ID,
  secretAccessKey: process.env.Secret_access_key,
});

// Insert the dictionary in the dynamoDB
const insertToDb = async event => {
  try {
    for (const word of event) {
      const params = {
        TableName: 'dictionary',
        Item: word,
      };

      dynamoDB.put(params, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Insert ${word.word}`);
        }
      });
    }
    return 'success';
  } catch (err) {
    console.log(err);
    return err;
  }
};

// Run Insert dictionary
insertToDb(data);

// check app
app.get('/', function (req, res) {
  res.send('Hello World!');
});

module.exports.handler = serverless(app);
