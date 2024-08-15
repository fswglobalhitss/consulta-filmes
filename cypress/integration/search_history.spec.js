describe('Search History', () => {
  it('should display search history', () => {
    cy.visit('/history');
    cy.get('#search-button').click();
    cy.get('#history-table').should('be.visible');
    cy.get('#history-table').should('contain', 'User');
    cy.get('#history-table').should('contain', 'Movie');
    cy.get('#history-table').should('contain', 'Timestamp');
  });

  it('should update history after a new search', () => {
    const userName = 'Pedro';
    const movieName = 'The Hobbit Series';

    cy.visit('/');
    cy.get('#user-name').type(userName);
    cy.get('#movie-name').type(movieName);
    cy.get('#search-button').click();

    cy.visit('/history');
    cy.get('#history-table').should('contain', userName);
    cy.get('#history-table').should('contain', movieName);
  });
});