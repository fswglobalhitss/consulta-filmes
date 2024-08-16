describe('Data Persistence', () => {
  it('should persist search data after browser restart', () => {
    const userName = 'Persistence Test';
    const movieName = 'Persistent Movie';

    cy.visit('/');
    cy.get('#user-name').type(userName);
    cy.get('#movie-name').type(movieName);
    cy.get('#search-button').click();

    cy.reload();

    cy.visit('/history');
    cy.get('#history-table').should('contain', userName);
    cy.get('#history-table').should('contain', movieName);
  });
});