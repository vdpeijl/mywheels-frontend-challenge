import List from "./List";
import Card from "./Card";

const listData = [
  {
    props: {
      id: 1,
    },
    title: "Item 1",
    description: "Description 1",
  },
  {
    props: {
      id: 2,
    },
    title: "Item 2",
    description: "Description 2",
  },
  {
    props: {
      id: 3,
    },
    title: "Item 3",
    description: "Description 3",
  },
];

describe("<List />", () => {
  it("should render with the correct data", () => {
    cy.mount(
      <List
        keyAttribute="props.id"
        values={listData}
        render={(item) => {
          return (
            <Card>
              <div>{item.title}</div>
            </Card>
          );
        }}
      />
    );

    cy.get("[data-test=list-item]").should("have.length", 3);
    cy.get("[data-test=list-item]").first().should("contain", "Item 1");
    cy.get("[data-test=list-item]").last().should("contain", "Item 3");
  });

  it("should render key based on dot notation", () => {
    cy.mount(
      <List
        keyAttribute="props.id"
        values={listData}
        render={(item, index, keyAttributeValue) => {
          return (
            <Card>
              <div data-test="key">{keyAttributeValue}</div>
            </Card>
          );
        }}
      />
    );

    cy.get("[data-test=key]").first().should("contain", listData[0].props.id);
  });
});
