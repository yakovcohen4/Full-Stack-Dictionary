describe('Dictionary app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:8000/example');
    cy.contains('Dictionary');
    // cy.contains(
    //   'Dictionary,'
    // );
  });
});
