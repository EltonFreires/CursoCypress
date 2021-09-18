/// <reference types="cypress" />

context('Waiting', () => { 
  beforeEach(() => { cy.visit('https://example.cypress.io/commands/waiting') });
  // https://on.cypress.io/best-practiccd es#Unnecessary-Waiting

  it('cy.wait() - Esperando um tempo determidado.', () => {
    cy.get('.wait-input1').type('Wait 1000ms after typing');
    cy.wait(500);
    cy.get('.wait-input2').type('Wait 1000ms after typing');
    cy.wait(500);
    cy.get('.wait-input3').type('Wait 1000ms after typing');
    cy.wait(500);    
  });

  it('cy.wait() - esperando uma rota específica.', () => {
    cy.intercept('GET', '**/comments/*').as('getComment');
    cy.get('.network-btn').click();
    cy.wait('@getComment').its('response.statusCode').should('be.oneOf', [200]);
  });
});
