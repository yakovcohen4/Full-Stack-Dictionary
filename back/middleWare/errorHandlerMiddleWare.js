function errorHandlerMiddleware(err, req, res, next) {
  if (err.status === 400 && err.message === 'not word in English') {
    return res.status(400).send({ error: err.message });
  } else if (err.status === 404 && err.message === 'no result for this word') {
    return res.status(404).json({ error: err.message });
  }
  if (!err.status) {
    return res.status(500).send({ error: 'Internal server error' });
  }
  return res.status(err.status).send({ error: err.message });
}

module.exports = { errorHandlerMiddleware };
