import Dropdown from "./Dropdown";

const dropdownData = {
  title: "Dropdown",
  values: [
    { title: "Item 1", value: true, onChange: () => {} },
    { title: "Item 2", value: false, onChange: () => {} },
    { title: "Item 3", value: false, onChange: () => {} },
  ],
};

describe("<Dropdown />", () => {
  it("should render with the correct data", () => {
    cy.mount(
      <Dropdown
        title={dropdownData.title}
        values={dropdownData.values}
        render={(item) => <div>{item.title}</div>}
      />
    );

    cy.get("[data-test=dropdown-trigger]").should(
      "contain",
      dropdownData.title
    );

    cy.get("[data-test=dropdown-content]").should("not.exist");
  });

  it("should open the dropdown when clicking on the trigger", () => {
    cy.mount(
      <Dropdown
        title={dropdownData.title}
        values={dropdownData.values}
        render={(item) => <div>{item.title}</div>}
      />
    );

    cy.get("[data-test=dropdown-trigger]").click();
    cy.get("[data-test=dropdown-content]").should("exist");
  });

  it("should close the dropdown when clicking outside the dropdown", () => {
    cy.mount(
      <div>
        <div data-test="outside">Outside</div>
        <Dropdown
          title={dropdownData.title}
          values={dropdownData.values}
          render={(item) => <div>{item.title}</div>}
        />
      </div>
    );

    cy.get("[data-test=dropdown-trigger]").click();
    cy.get("[data-test=dropdown-content]").should("exist");

    cy.get("[data-test=outside]").click();
    cy.get("[data-test=dropdown-content]").should("not.exist");
  });

  it("should close the dropdown when clicking on the trigger", () => {
    cy.mount(
      <Dropdown
        title={dropdownData.title}
        values={dropdownData.values}
        render={(item) => <div>{item.title}</div>}
      />
    );

    cy.get("[data-test=dropdown-trigger]").click();
    cy.get("[data-test=dropdown-content]").should("exist");

    cy.get("[data-test=dropdown-trigger]").click();
    cy.get("[data-test=dropdown-content]").should("not.exist");
  });
});
