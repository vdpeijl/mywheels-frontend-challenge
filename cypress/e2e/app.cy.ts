describe("Filters", () => {
  it("should toggle towbar filter", () => {
    cy.visit("http://localhost:9009/");
    cy.wait(2000);
    cy.get('[data-test="filter-towbar"]').click();
    cy.get(".car").first().contains("trekhaak");
  });
});

export {};
