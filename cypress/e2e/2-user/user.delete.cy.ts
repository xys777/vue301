describe("User module delete test", () => {
  beforeEach(() => {
    cy.visit("/user");
  });

  it("should delete a selected row and the next row should be highlight when click on delete button", () => {
    cy.get('[data-test="row:5"] > [data-test="key:id"]').should(
      "have.text",
      "6"
    );
    cy.get(`[data-test="row:5"] `).click();
    cy.get('button[data-test="delete"]').click();
    cy.get('[data-test="row:5"] > [data-test="key:id"]').should(
      "have.text",
      "7"
    );
    cy.get("table>tbody>tr").should("have.length", 9);
    cy.get(`[data-test="row:5"] > td`).should("have.class", "active");

    cy.get('button[data-test="delete"]').click();
    cy.get("table>tbody>tr").should("have.length", 8);
    cy.get(`[data-test="row:5"] > td`).should("have.class", "active");
    cy.get('[data-test="row:5"] > [data-test="key:id"]').should(
      "have.text",
      "8"
    );
  });

  it("should highlight the row before deleted row if select teh last row ", () => {
    cy.get(`[data-test="row:9"] `).click();
    cy.get('button[data-test="delete"]').click();
    cy.get(`[data-test="row:8"] > td`).should("have.class", "active");

    cy.get('button[data-test="delete"]').click();
    cy.get("table>tbody>tr").should("have.length", 8);
    cy.get(`[data-test="row:7"] > td`).should("have.class", "active");
  });

  it("should delete all rows when click on delete button more than 10 times", () => {
    cy.get(`[data-test="row:0"] `).click();
    let i = 0;
    while (i++ < 20) cy.get('button[data-test="delete"]').click({});
  });
});
