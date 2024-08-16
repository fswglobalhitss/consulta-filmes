describe('Logging', () => {
  it('should log search operations', () => {
    cy.intercept('POST', '/api/log').as('logRequest');

    cy.visit('/');
    cy.get('#user-name').type('Log Test User');
    cy.get('#movie-name').type('Logged Movie');
    cy.get('#search-button').click();

    cy.wait('@logRequest').its('response.statusCode').should('eq', 200);
  });
});