const url = 'http://localhost/';
const pesquisador = 'Pedro';
const pesquisadorNaoExistente = 'NaoEncontrado';
const historicoNaoExistente = 'NaoEncontrado';

const movieName = 'The Hobbit Series111';
const opcaoHistorico = '#historico-tab';
const elementPesquisador = 'input[aria-label="pesquisador"]';
const elementMovie = 'input[aria-label="nomeFilme"]'; 
const elementBotao = 'button[ng-click="carregarHistorico();"]';
const movieNameNotFound = 'Nao tem';

const elementosTabela = '';

describe('Search History', () => {
  it('should display search history', () => {
    cy.visit(url);
    cy.get(opcaoHistorico).click();
    cy.get(elementPesquisador).should('be.visible');
    cy.get(elementMovie).should('be.visible');
    cy.get(elementBotao).should('be.visible');
  });

  it('should update history after a new search', () => {
    cy.visit(url);
    cy.get(opcaoHistorico).click();
    cy.get(elementPesquisador).type(pesquisador);
    cy.get(elementMovie).type(movieName);
    cy.get(elementBotao).click();
    cy.get('tbody').should('be.visible');
    cy.get('tbody .ng-binding').should('contain', movieName);
  });

  it('should update history after a new search with user not found', () => {
    cy.visit(url);
    cy.window().then(win => {cy.stub(win, 'alert').as('alertStub');});
    cy.get(opcaoHistorico).click();
    cy.get(elementPesquisador).type(pesquisadorNaoExistente);
    cy.get(elementMovie).type(movieName);
    cy.get(elementBotao).click();
    cy.get('@alertStub').should('be.calledWith', 'Não foi encontrado histórico com os dados informados');
  });

  it('should update history after a new search with film not found', () => {
    cy.visit(url);
    cy.window().then(win => {
    cy.stub(win, 'alert').as('alertStub');});
    cy.get(opcaoHistorico).click();
    cy.get(elementPesquisador).type(pesquisador);
    cy.get(elementMovie).type(historicoNaoExistente);
    cy.get(elementBotao).click();
    cy.get(elementBotao).click();
    cy.get('@alertStub').should('be.calledWith', 'Não foi encontrado histórico com os dados informados');
  });
});