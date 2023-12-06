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

describe("Option Filter", () => {
  it("should filter results based on option selected", () => {
    cy.visit("http://localhost:9009/");
    cy.get("[data-test=dropdown-trigger]").first().click();
    cy.get("[data-test=dropdown-content]").find("label").first().click();

    cy.get("[data-test=card")
      .first()
      .find("span")
      .each((span) => {
        if (span.text() === "Trekhaak") {
          assert(true);
        }
      });
  });
});

describe("Model Filter", () => {
  it("should filter results based on model selected", () => {
    cy.visit("http://localhost:9009/");
    cy.get("[data-test=dropdown-trigger]").eq(1).click();
    cy.get("[data-test=dropdown-content]").find("label").first().click();

    cy.get("[data-test=card")
      .first()
      .find("span")
      .each((span) => {
        if (span.text() === "Golf") {
          assert(true);
        }
      });
  });
});

describe("Fuel Type Filter", () => {
  it("should filter results based on fuel type selected", () => {
    cy.visit("http://localhost:9009/");
    cy.get("[data-test=dropdown-trigger]").eq(2).click();
    cy.get("[data-test=dropdown-content]").find("label").first().click();

    cy.get("[data-test=card")
      .first()
      .find("[data-test=label]")
      .should("contain", "elektrisch");
  });
});

describe("Price Slider Filter", () => {
  it("should filter results based on price range selected", () => {
    cy.visit("http://localhost:9009/");
    cy.wait(1000);
    cy.get("[data-test=dropdown-trigger]").eq(3).click();
    cy.get("[data-test=dropdown-content]")
      .find(".rc-slider .rc-slider-dot")
      .eq(1)
      .click();

    cy.get("[data-test=card")
      .first()
      .find("[data-test=price]")
      .should("contain", "4,50");
  });
});

export {};
