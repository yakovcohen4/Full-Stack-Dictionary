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
  });
});
