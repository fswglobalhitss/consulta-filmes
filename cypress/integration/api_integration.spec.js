describe('API Integration', () => {
  it('should make a successful API call to the backend', () => {
    cy.intercept('GET', '/api/movies*').as('movieSearch');

    cy.visit('/');
    cy.get('#user-name').type('API Test User');
    cy.get('#movie-name').type('API Test Movie');
    cy.get('#search-button').click();

    cy.wait('@movieSearch').its('response.statusCode').should('eq', 200);
  });

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', '/api/movies*', { statusCode: 500 }).as('failedSearch');

    cy.visit('/');
    cy.get('#user-name').type('Error Test User');
    cy.get('#movie-name').type('Error Test Movie');
    cy.get('#search-button').click();

    cy.wait('@failedSearch');
    cy.get('#error-message').should('be.visible');
    cy.get('#error-message').should('contain', 'An error occurred');
  });
});