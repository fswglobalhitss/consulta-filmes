const url = 'http://localhost/'
const pesquisador = 'Pedro';
const pesquisadorNaoExistente = 'NaoEncontrado';
const historicoNaoExistente = 'NaoEncontrado';

const movieName = 'The Hobbit Series';
const opcaoHistorico = '#historico-tab';
const elementPesquisador = 'input[aria-label="pesquisador"]';
const elementMovie = 'input[aria-label="nomeFilme"]'; 
const elementBotao = 'button[ng-click="carregarHistorico();"]';


const elementosTabela = ''

describe('Search History', () => {
  it('should display search history', () => {
    cy.visit(url);
    cy.get(opcaoHistorico).click();
    cy.get(elementPesquisador).should('be.visible');
    cy.get(elementMovie).should('be.visible');
    cy.get(elementBotao).should('be.visible');

   // cy.get('div[id="historico-tab-pane"] table').within(() => {
     // cy.get('tbody tr').each(($row, rowIndex) => {
        // Obtenha os valores das células para cada coluna
      //  cy.wrap($row).find('td').then($cells => {
      //    const id = $cells.eq(0).text().trim();
      //    const dataPesquisa = $cells.eq(1).text().trim();
      //    const nomePesquisador = $cells.eq(2).text().trim();
      //   const nomeFilme = $cells.eq(3).text().trim();

          // Imprima os valores para verificação
      /*    cy.log(`Linha ${rowIndex + 1}: Id=${id}, Data da Pesquisa=${dataPesquisa}, Nome do Pesquisador=${nomePesquisador}, Nome do Filme=${nomeFilme}`);

          // Comparações com valores esperados (substitua pelos valores reais esperados)
          // Exemplo:
          expect(id).to.match(/^\d+$/); // Verifica se o Id é um número
          expect(dataPesquisa).to.match(/^\d{2}\/\d{2}\/\d{4}$/); // Verifica o formato da data (dd/mm/aaaa)
          expect(nomePesquisador).not.to.be.empty; // Verifica se o nome do pesquisador não está vazio
          expect(nomeFilme).to.include('Alguma Parte do Nome do Filme'); // Verifica se o nome do filme contém uma string específica*/
        });
    //  });
  //  });
 

 // });

  it('should update history after a new search', () => {
    cy.visit(url);
    cy.get(opcaoHistorico).click();
    cy.get(elementPesquisador).type(pesquisador);
    cy.get(elementMovie).type(movieName);
    cy.get(elementBotao).click();
    cy.get('#search-results').should('be.visible');
    cy.get('#search-results').should('contain', movieName);
  });

  it('should update history after a new search with user not found', () => {
    cy.visit(url);
    cy.get(opcaoHistorico).click();
    cy.get(elementPesquisador).type(pesquisadorNaoExistente);
    cy.get(elementMovie).type(movieName);
    cy.get(elementBotao).click();
   // cy.get('#error-message').should('be.visible');
   // cy.get('#error-message').should('contain', 'No results found');
  });

  it('should update history after a new search with film not found', () => {

    cy.visit(url);
    cy.get(opcaoHistorico).click();
    cy.get(elementPesquisador).type(pesquisador);
    cy.get(elementMovie).type(historicoNaoExistente);
    cy.get(elementBotao).click();

   // cy.get('#error-message').should('be.visible');
   // cy.get('#error-message').should('contain', 'No results found');;
  });
});
