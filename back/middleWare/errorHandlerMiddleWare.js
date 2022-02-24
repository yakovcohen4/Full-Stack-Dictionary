function errorHandlerMiddleware(err, req, res, next) {
  // word search error
  if (err.status === 400 && err.message === 'not word in English') {
    return res.status(400).send({ error: err.message });
  } else if (err.status === 404 && err.message === 'no result for this word') {
    return res.status(404).json({ error: err.message });
  }
  // part of speech search error
  else if (
    err.status === 400 &&
    err.message === 'not part of speech in English'
  ) {
    return res.status(400).json({ error: err.message });
  } else if (
    err.status === 404 &&
    err.message === 'no result for this part of speech'
  ) {
    return res.status(404).json({ error: err.message });
  }
  // word and part of speech search error
  else if (
    err.status === 404 &&
    err.message === 'no result for this word & part of speech'
  ) {
    return res.status(404).json({ error: err.message });
  }
  // other error
  if (!err.status) {
    return res.status(500).send({ error: 'Internal server error' });
  }
  return res.status(err.status).send({ error: err.message });
}

module.exports = { errorHandlerMiddleware };
