// https://docs.cypress.io/api/introduction/api.html
import mockUserList from "../../fixtures/users.json";
describe("User module load test", () => {
  // beforeEach(() => {});

  it("loading status test", () => {
    cy.intercept("GET", "/api/users", (req) => {
      req.on("response", (res) => {
        // Throttle the response to 1 Mbps to simulate a
        // mobile 3G connection
        res.setDelay(2000);
        // res.setThrottle(10);
      });
    }).as("getUsers");
    cy.visit("/user");

    cy.get("div.loader").should("be.visible");
  });

  it("error status test", () => {
    cy.intercept("GET", "/api/users", (req) => {
      req.reply({
        statusCode: 500,
        delay: 10, // milliseconds
        throttleKbps: 1000, // to simulate a 3G connection
        forceNetworkError: false, // default
      });
    }).as("getUsers");
    cy.visit("/user");

    cy.get("p.error").should("be.visible");
  });

  describe("normal status test", () => {
    it("fetch users from stub data", () => {
      cy.intercept("GET", "/api/users", { fixture: "users.json" });
      cy.visit("/user");
      cy.get('[data-test^="row:"]').should("have.length", 10);
      mockUserList.map((user, i) => {
        cy.get(`[data-test="row:${i}"] > [data-test="key:name"]`).should(
          "have.text",
          user.name
        );
        cy.get(`[data-test="row:${i}"] > [data-test="key:username"]`).should(
          "have.text",
          user.username
        );
        cy.get(`[data-test="row:${i}"] > [data-test="key:phone"]`).should(
          "have.text",
          user.phone
        );
        cy.get(`[data-test="row:${i}"] > [data-test="key:email"]`).should(
          "have.text",
          user.email
        );
      });
    });
    it("fetch users from real backend", () => {
      cy.visit("/user");
      cy.get('[data-test^="row:"]').should("have.length", 10);
    });
  });
});
