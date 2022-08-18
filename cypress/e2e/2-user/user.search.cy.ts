describe("User module search test", () => {
  beforeEach(() => {
    cy.visit("/user");
  });
  it("should show 0 row when type xxxzzz to search", () => {
    cy.get('[data-test="search"] > input')
      .type("xxxzzz")
      .should("have.value", "xxxzzz");
    cy.get("table>tbody>tr").should("have.length", 0);
  });
  it("should show 1 row when type bret to search ", () => {
    cy.get('[data-test="search"] > input')
      .type("bret")
      .should("have.value", "bret");
    cy.get("table>tbody>tr").should("have.length", 1);
  });
  it("should show all rows when delete the words in search", () => {
    cy.get('[data-test="search"] > input').type("le");
    cy.get("table>tbody>tr").should("have.length", 7);
    cy.get('[data-test="search"] > input')
      .type("{backspace}{backspace}")
      .should("have.value", "");
    cy.get("table>tbody>tr").should("have.length", 10);
  });
});
