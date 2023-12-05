describe("Search", () => {
  it("should filter results based on search query", () => {
    cy.visit("http://localhost:9009/");
    cy.wait(1000);
    cy.get("[data-test=search]").focus().type("Unknown");
    cy.get("[data-test=search]").should("have.value", "Unknown");
    cy.get("[data-test=card").should("have.length", 0);

    cy.wait(1000);
    cy.get("[data-test=search]").clear().type("Tesla");
    cy.get("[data-test=search]").should("have.value", "Tesla");
    cy.get("[data-test=card").first().should("contain", "Tesla");
  });
});

export {};
