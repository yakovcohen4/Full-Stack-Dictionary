const supertest = require('supertest');
const { app } = require('../../app.js');
const { partOfSpeechList } = require('../../utils/constants');

const api = supertest(app);

describe('search random word by part of speech', () => {
  test('of search random word with part of speech noun -> status: 200, body: { definitions: ["...."], pos: "n.", word: ".." }', async () => {
    for (let index = 0; index < partOfSpeechList.length; index++) {
      const res = await api
        .get(`/part-of-speech/${partOfSpeechList[index]}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(typeof res.body.definitions[0]).toEqual('string');
      expect(res.body.pos).toEqual(partOfSpeechList[index]);
      expect(typeof res.body.word).toEqual('string');
    }
  }, 8000);

  test('of search random word with part of speech with Bad Request -> status: 404, message: "not part of speech in English"', async () => {
    const res = await api
      .get('/part-of-speech/noun')
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.error).toEqual('not part of speech in English');
  }, 15000);
});

afterAll(() => {
  app.killServer();
});
