const userName = 'Pedro';
const movieName = 'The Hobbit Series';
const userName2 = 'Jane Doe';
const movieNameNotFound = 'NonexistentMovie123';
const url = 'http://localhost/'
const elementNome = 'input[aria-label="nome"]';
const elementMovie = 'input[aria-label="filme"]'; 


describe('Movie Search', () => {
  it('should allow a user to search for a movie', () => {
    cy.visit(url);
    cy.get(elementNome).type(userName);
    cy.get(elementMovie).type(movieName);
    cy.get('button[ng-click="pesquisar();"]').click();
    cy.get('#search-results').should('be.visible');
    cy.get('#search-results').should('contain', movieName);
  });

  it('should display an error message for invalid searches', () => {
    cy.visit(url);
    cy.get(elementNome).type(userName2);
    cy.get(elementMovie).type(movieNameNotFound);
    cy.get('button[ng-click="pesquisar();"]').click();
    cy.get('#error-message').should('be.visible');
    cy.get('#error-message').should('contain', 'No results found');
  });

  it('should display an error message for input name and film is empty', () => {
    var alertStub = cy.stub();
    cy.visit(url);
    cy.window().then(win => {
      // Substituir a função alert global
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get(elementNome).type(' ');
    cy.get(elementMovie).type(' ');
    cy.get('button[ng-click="pesquisar();"]').click();  
    cy.wait(2000);
    
   cy.screenshot('nome-da-captura');
   cy.get('@alertStub').should('be.calledWith', 'É necessário informar seu nome');
  });

  it('should display an error message for input name is empty', () => {
    var alertStub = cy.stub();
    cy.visit(url);
    cy.window().then(win => {
      // Substituir a função alert global
      cy.stub(win, 'alert').as('alertStub');
    });
    
    cy.get(elementNome).type(' ');
    cy.get(elementMovie).type(movieNameNotFound);
    cy.get('button[ng-click="pesquisar();"]').click();
  
    cy.wait(2000);
    
   cy.screenshot('nome-da-captura');
   cy.get('@alertStub').should('be.calledWith', 'É necessário informar seu nome');
  });

  it('should display an error message for input film is empty', () => {
    var alertStub = cy.stub();
    cy.visit(url);
    cy.window().then(win => {
      // Substituir a função alert global
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get(elementNome).type(userName2);
    cy.get(elementMovie).type(' ');
    cy.get('button[ng-click="pesquisar();"]').click();
    cy.wait(2000);
    cy.screenshot('nome-da-captura2');
    cy.get('@alertStub').should('be.calledWith', 'É necessário informar o nome do filme');
  });
});
