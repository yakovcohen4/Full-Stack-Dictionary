const supertest = require('supertest');
const { app } = require('../../app.js');

const api = supertest(app);

// data of the "example" word
const resultOfWordExample = {
  Items: [
    {
      definitions: [
        'One or a portion taken to show the character or quality of the whole; a sample; a specimen.',
        'That which is to be followed or imitated as a model; a pattern or copy. For I have given you an example, that ye should do as John xiii. 15. I gave, thou sayest, the example; I led the way. Milton.',
        'That which resembles or corresponds with something else; a precedent; a model. Such temperate order in so fierce a cause Doth want example. Shak.',
        "That which is to be avoided; one selected for punishment and to serve as a warning; a warning. Hang him; he'll be made an example. Shak. Now these things were our examples, to the intent that we should not lust after evil things, as they also lusted. 1 Cor. x. 6.",
        'An instance serving for illustration of a rule or precept, especially a problem to be solved, or a case to be determined, as an exercise in the application of the rules of any study or branch of science; as, in trigonometry and grammar, the principles and rules are illustrated by examples.',
      ],
      pos: 'n.',
      synonyms:
        'Precedent; case; instance. Example, Instance. The discrimination to be made between these two words relates to cases in which we give "instances" or "examples" of things done. An instance denotes the single case then "standing" before us; if there be others like it, the word does not express this fact. On the contrary, an example is one of an entire class of like things, and should be a true representative or sample of that class. Hence, an example proves a rule or regular course of things; an instance simply points out what may be true only in the case presented. A man\'s life may be filled up with examples of the self- command and kindness which marked his character, and may present only a solitary instance of haste or severity. Hence, the word "example" should never be used to describe what stands singly and alone. We do, however, sometimes apply the word instance to what is really an example, because we are not thinking of the latter under this aspect, but solely as a case which "stands before us." See Precedent.',
      word: 'EXAMPLE',
    },
    {
      definitions: [
        'To set an example for; to give a precedent for; to exemplify; to give an instance of; to instance. [Obs.] "I may example my digression by some mighty precedent." Shak. Burke devoted himself to this duty with a fervid assiduity that has not often been exampled, and has never been surpassed. J. Morley.',
      ],
      pos: 'v.',
      word: 'EXAMPLE',
    },
  ],
  Count: 2,
  ScannedCount: 2,
};

describe('search word test', () => {
  test('of search the word "example" -> status: 200, body: { Items: [...example] }', async () => {
    const res = await api
      .get('/example')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(res.body).toEqual(resultOfWordExample);
  }, 8000);

  test('of search the word "exemple" -> status: 404, message: "no result for this word"', async () => {
    const res = await api
      .get('/exemple')
      .expect(404)
      .expect('Content-Type', /application\/json/);

    expect(res.body.error).toEqual('no result for this word');
  }, 8000);

  test('of search the word "example123" -> status: 400, message: "not word in English"', async () => {
    const res = await api
      .get('/example123')
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(res.body.error).toEqual('not word in English');
  }, 8000);
});

afterAll(() => {
  app.killServer();
});
