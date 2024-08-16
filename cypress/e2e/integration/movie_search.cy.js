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
    // Preencher campos de busca
    cy.get(elementNome).type(userName);
    cy.get(elementMovie).type(movieName);
    // Clicar no botão de pesquisa
    cy.get('button[ng-click="pesquisar();"]').click();
    // Verificar se o <tbody> com os resultados está visível
    cy.get('tbody').should('be.visible');
    // Verificar se o nome do filme aparece nas células <td>
    cy.get('tbody .ng-binding').should('contain', movieName);
  });

  it('should display an error message for invalid searches', () => {
    cy.visit(url);
    cy.window().then(win => {
      // Substituir a função alert global
      cy.stub(win, 'alert').as('alertStub');
    });
    cy.get(elementNome).type(userName2);
    cy.get(elementMovie).type(movieNameNotFound);
    cy.get('button[ng-click="pesquisar();"]').click();
    cy.get('@alertStub').should('be.calledWith', 'Não foram encontrados filmes com os dados informados');
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