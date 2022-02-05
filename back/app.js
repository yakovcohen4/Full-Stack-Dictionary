const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// routers
const { searchRouter } = require('./routers/searchRouter');

// middle-ware
app.use(cors());

// check app
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// searchRouter
app.use('/', searchRouter);

// export the app to the serverless framework
module.exports.handler = serverless(app);
