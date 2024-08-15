describe('Movie Search', () => {
  it('should allow a user to search for a movie', () => {
    cy.visit('/');
    cy.get('#user-name').type('John Doe');
    cy.get('#movie-name').type('The Lord of the Rings');
    cy.get('#search-button').click();
    cy.get('#search-results').should('be.visible');
    cy.get('#search-results').should('contain', 'The Lord of the Rings');
  });

  it('should display an error message for invalid searches', () => {
    cy.visit('/');
    cy.get('#user-name').type('Jane Doe');
    cy.get('#movie-name').type('NonexistentMovie123');
    cy.get('#search-button').click();
    cy.get('#error-message').should('be.visible');
    cy.get('#error-message').should('contain', 'No results found');
  });
});