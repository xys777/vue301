// https://docs.cypress.io/api/introduction/api.html

describe("Navigation Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h3", "Documentation");
  });
  it("visits the user url", () => {
    cy.visit("/user");
    cy.contains("div", "Search");
  });
  it("visits the about url", () => {
    cy.visit("/about");
    cy.contains("h1", "This is an about page");
  });

  it("clicks on the user link", () => {
    cy.contains("User").click();
    cy.url().should("include", "/user");
    cy.contains("div", "Search");
  });

  it("clicks on the about link", () => {
    cy.contains("About").click();
    cy.url().should("include", "/about");
    cy.contains("h1", "This is an about page");
  });

  it("clicks on the home link", () => {
    cy.contains("Home").click();
    cy.url().should("not.include", "/home");
    cy.contains("h3", "Documentation");
  });
});
