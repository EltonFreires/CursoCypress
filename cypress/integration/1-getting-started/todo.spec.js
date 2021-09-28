/// <reference types="cypress" />

// To learn more about how Cypress works and what makes it such an awesome testing tool,
// please read our getting started guide: https://on.cypress.io/introduction-to-cypress

describe('Exemplos app', () => {
    beforeEach(() => { cy.visit('https://example.cypress.io/todo'); })
    let phase01 = "Pay electric bill";
    let phase02 = "Walk the dog";
    let phase03 = "Feed the cat";

    it('Verificar lista ', () => {
        // Verificar se tem as duas opções default
        cy.get(".todo-list li").should("have.length", 2);
        // Verificar se a primeira opção é Pay electric bill
        cy.get(".todo-list li").first().should("have.text", phase01);
        // Verificar se a última opão é Walk the dog
        cy.get(".todo-list li").last().should("have.text", phase02);
    });

    it('Adicionando e verficando novo item', () => {
        // Adicioando novo item 
        cy.get("[data-test=new-todo]").type(`${phase03}{enter}`);
        // Verificando se tem 3 itens, e o ultimo é o novo item adicionado 
        cy.get(".todo-list li").should("have.length", 3).last().should("have.text", phase03);
        // verificando demais itens
        cy.get(".todo-list li").first().should("have.text", phase01);
        cy.get(".todo-list li").eq(1).should("have.text", phase02);
    });

    it("Selecionando um checkbox e verificando se ficou selecionado", () => {
        // Encontrando um elemento a partir de um label, e identificando o pai
        cy.contains(phase01).parent().find("input[type=checkbox]").check();
        // Encontrando um elemento a partir de um label, e subindo alguns níveis
        cy.contains(phase01).parents("li").should("have.class", "completed");
    });

    context('Com um item selecionado', () => {
        beforeEach(() => {
            // setando um item a cada chamada de teste
            cy.contains('Pay electric bill').parent().find('input[type=checkbox]').check();
        });

        it('Filtrando os ativos', () => {
            cy.contains('Active').click();
            // Verificações
            cy.contains(phase01).should('not.exist');
            cy.get('.todo-list li').should('have.length', 1).first().should('have.text', phase02);
        });

        it('Filtrando os completados', () => {
            cy.contains('Completed').click();
            // Verificações
            cy.contains(phase02).should('not.exist');
            cy.get('.todo-list li').should('have.length', 1).first().should('have.text', phase01);
        });

        it('Deletando os completados', () => {
            cy.contains('Clear completed').click();
            // verificações
            cy.get('.todo-list li').should('have.length', 1).should('not.have.text', 'Pay electric bill');
            // Finally, make sure that the clear button no longer exists.
            cy.contains('Clear completed').should('not.exist');
        });
    })
})
