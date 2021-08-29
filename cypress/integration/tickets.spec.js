describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));

    it("fill all the text input fields", () => {
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

    it("Verificando palavra no no cabeçalho - Assert", () => {
        cy.get("header h1").should("contain","TICKET BOX");
    });

    it.only("Validando email", () => {
        cy.get("#email").type("fulano-fulano.com");
        cy.get("#email.invalid").should("exist");
        cy.get("#email").clear().type("fulano@fulano.com");
        cy.get("#email.invalid").should("not.exist");
    });

});