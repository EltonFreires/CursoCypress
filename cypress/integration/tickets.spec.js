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

    it("Select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("select 'vip' ticket type", () => {
        cy.get("#vip").check();
    });

    // it("has 'ticketbox' header's heading", () => {});

});