/* 
    Extensões

 https://www.youtube.com/watch?v=JGVB97ns0NQ
- ES6 Mocha Snippets - auto complite describe, context, ... 
- Cypress Snippets - auto complite commands
- Add Only
- Fold Plus - minimiza todos os testes shift+P 
    - Bracket Pair Colorizer 2 - colore as chaves, cochetes e parenteses
- Material Icon Theme
- Cypress Helper
    - Visual Studio IntelliCode
 */

describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it("Preenchendo campos tipo texto", () => {
        const firstName = "Ana";
        const lastName = "Maria";
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("fulano@fulano.com");
        cy.get("#requests").type("PCD");
        cy.get("#signature").type(`${firstName} ${lastName}`);
    });

    it("Select opção em um select - Ticket Quantity", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("Selecinando radio button - 'vip' ticket type", () => {
        cy.get("#vip").check();
    });

    it("Selecioando checkbox - 'about this event'", () =>{
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    });

    it("Verificando palavra no cabeçalho - Assert", () => {
        cy.get("header h1").should("contain","TICKETBOX");
    });

    it("Validando email", () => {
        cy.get("#email").type("fulano-fulano.com");
        cy.get("#email.invalid").should("exist");
        cy.get("#email").clear().type("fulano@fulano.com");
        cy.get("#email.invalid").should("not.exist");
    });

    it("preenchendo e resetando o formulário", () => {
        const firstName = "Ana";
        const lastName = "Maria";
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("fulano@fulano.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("PCD");
        cy.get(".agreement p").should("contain", `I, ${fullName}, wish to buy 2 VIP tickets`);
        cy.get("#agree").click();
        cy.get("#signature").type(fullName);
        cy.get("button[type='submit']").as("submitButton").should("not.be.disabled");

        cy.get("button[type='reset']").click();
        cy.get("@submitButton").should("be.disabled");
    });

    it("preenchendo campos obrigatórios", () => {
       const dadosUsuario = {
        firstName: "Ana",
        lastName: "Maria",        
        email: "fulano@fulano.com"
       };       
       cy.preencherCamposObrigatorios(dadosUsuario);

       cy.get("button[type='submit']").as("submitButton").should("not.be.disabled");
       cy.get("#agree").uncheck();
       cy.get("@submitButton").should("be.disabled");
    });

});