const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// routers
const { searchRouter } = require('./routers/searchRouter');

const {
  errorHandlerMiddleware,
} = require('./middleWare/errorHandlerMiddleWare');

// middle-ware
app.use(cors());

// check app
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// searchRouter
app.use('/', searchRouter);

/***** Error MiddleWares *****/
app.use(errorHandlerMiddleware);

const listener = app.listen(3000, () =>
  console.log(`app listening at http://localhost:${3000}`)
);

app.killServer = () => {
  listener.close();
};

// export the app to the serverless framework
module.exports.handler = serverless(app);
// export app to tests
module.exports = app;
