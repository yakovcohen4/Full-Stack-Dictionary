const posList = [
  '[n.]',
  '[pron.]',
  '[v.]',
  '[a.]',
  '[adv.]',
  '[prep.]',
  '[conj.]',
  '[interj.]',
];

describe('Dictionary app', function () {
  beforeEach(function () {
    // open app
    cy.visit('http://localhost:3006');
  });

  describe('User can see and move any Page', function () {
    // Home page
    it('user see home page', function () {
      cy.contains('Home Page'); // check if page contains Home Page
      cy.get('.para > span').children().should('have.length', 2); // page contains 2 children span tag
      cy.get('.para > span > p')
        .first()
        .should('have.text', 'Welcome to my Dictionary'); // page contains first Welcome
      cy.get('.para > ul').children().should('have.length', 5); // 5 li are in the list
    });

    // Search word page
    it('user see search word Page', function () {
      cy.get('.open-nav').click(); // open nav
      cy.contains('Search Words').click(); // click on Search Words
      cy.contains('Search Word'); // check if page contains Search Word Page
      cy.get('.form-explanation-search-h2').should(
        'have.text',
        'You can search words or search words with a specific part of speech. Also, you can search by clicking on the result words.'
      ); // page contains explanation to the user
    });

    // Random word page
    it('user see Random word Page', function () {
      cy.get('.open-nav').click(); // open nav
      cy.contains('Random Words').click(); // click on Search Words
      cy.contains('Random Word'); // check if page contains Search Word Page
      cy.get('.form-explanation-search-h2').should(
        'have.text',
        'You can search random word and get all part of speech, or search with specific part of speech.'
      ); // page contains explanation to the user
    });
  });

  // Search word page tests
  describe('Search word page tests', function () {
    beforeEach(function () {
      cy.get('.open-nav').click(); // open nav
      cy.contains('Search Words').click(); // click on Search Words
      cy.wait(500);
      cy.contains('Search Word'); // check if page contains Search Word Page
    });

    it('user search "example" in search word Page -> the result OK', function () {
      cy.get('.form-search-box-div > input')
        .click({ force: true })
        .type('example'); // type example in the search field

      // click on search button
      cy.get('.form-btn-search').click();
      cy.wait(5000);

      // check if the result OK
      cy.get('.word-result').should('have.text', 'EXAMPLE'); // check if the result word is EXAMPLE
      cy.get('.result-items').children().should('have.length', 2); // check if there is only one result
      cy.get('.result-items')
        .get('.item-pos')
        .first()
        .should('have.text', '[n.]'); // check if the first result is noun
      cy.get('.result-items')
        .get('.item-pos')
        .last()
        .should('have.text', '[v.]'); // check if the second result is Verb
    });

    it('user search "example" with POS(Verb) in search word Page -> the result OK', function () {
      cy.get('.form-search-box-div > input')
        .click({ force: true })
        .type('example'); // type example in the search field
      cy.get('.choose-pos > li').click({ force: true }); // hover on the dropdown
      cy.get('.choose-pos > li > ul > li')
        .contains('Verb')
        .click({ force: true }); // click on Verb

      // click on search button
      cy.get('.form-btn-search').click();
      cy.wait(5000);

      // check if the result OK
      cy.get('.word-result').should('have.text', 'EXAMPLE'); // check if the result word is EXAMPLE
      cy.get('.result-items').children().should('have.length', 1); // check if there is only one result
      cy.get('.result-items')
        .get('.item-pos')
        .first()
        .should('have.text', '[v.]'); // check if the result is Verb
    });

    it('user search a word with special characters -> get Error', function () {
      cy.get('.form-search-box-div > input')
        .click({ force: true })
        .type('%$#@!{}[]'); // type special characters in the search field

      // click on search button
      cy.get('.form-btn-search').click();
      cy.wait(1000);

      // check if the result is Error with correct message
      cy.contains('We are sorry');
      cy.contains('Try to search only words in english.');
    });

    it('user search a word not exists -> get not result', function () {
      cy.get('.form-search-box-div > input')
        .click({ force: true })
        .type('wordNotExists'); // type special characters in the search field

      // click on search button
      cy.get('.form-btn-search').click();
      cy.wait(4000);

      // check if the result is Error with correct message
      cy.contains(
        // eslint-disable-next-line quotes
        "We've search more 100,000 words, but did not match wordNotExists"
      );
      // cy.contains('Try to search only words in english.');
    });
  });

  // Random word page tests
  describe('Random word page test', function () {
    beforeEach(function () {
      cy.get('.open-nav').click();
      cy.contains('Random Words').click();
      cy.contains('Random Word');
    });

    it('user can search Random word in -> get result', function () {
      // click on search button
      cy.get('.form-btn-search').click(); // click on search button
      cy.wait(5000);

      // check if the result OK
      cy.get('.result-items').children().should('have.length', 1); // check if there is only one result
      cy.get('.item-pos')
        .invoke('text')
        .then(text => {
          expect(posList).to.include(text);
        });
    });

    it('user can search Random word with POS(Verb) -> get result', function () {
      // choose POS - Verb
      cy.get('.choose-pos > li').click({ force: true }); // hover on the dropdown
      cy.get('.choose-pos > li > ul > li')
        .contains('Verb')
        .click({ force: true }); // click on Verb

      // click on search button
      cy.get('.form-btn-search').click(); // click on search button
      cy.wait(5000);

      // check if the result OK
      cy.get('.result-items').children().should('have.length', 1); // check if there is only one result
      cy.get('.result-items')
        .get('.item-pos')
        .first()
        .should('have.text', '[v.]'); // check if the result is Verb
    });
  });
});
