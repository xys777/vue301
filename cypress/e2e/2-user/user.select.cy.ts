describe("User module select test", () => {
  beforeEach(() => {
    cy.visit("/user");
  });

  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  it("should highlight the row when click on each row", () => {
    arr.map((i) =>
      cy.get(`[data-test="row:${i}"] > td`).should("not.have.class", "active")
    );
    arr.map((i) => {
      cy.get(`[data-test="row:${i}"] `).click();
      arr.map((j) =>
        cy
          .get(`[data-test="row:${j}"] > td`)
          .should(j == i ? "have.class" : "not.have.class", "active")
      );
    });
  });

  it("should show the detail data when click on each row", () => {
    let body: {
      [x: string]: any; //docs.cypress.io/api/introduction/api.html
      id: any;
    }[] = [];
    cy.intercept("GET", "/api/users", (req) => {
      delete req.headers["if-none-match"];
    }).as("getUsers");
    cy.wait("@getUsers").then((interception) => {
      assert.isNotNull(interception.response, "1st API call has data");

      body = interception.response?.body;
      arr.map((i) => {
        cy.get(`[data-test="row:${i}"] `).click();
        cy.get("#id").should("have.value", body[i].id);
        cy.get("#name").should("have.value", body[i].name);
        cy.get("#username").should("have.value", body[i].username);
        cy.get("#email").should("have.value", body[i].email);
        cy.get("#phone").should("have.value", body[i].phone);
        cy.get("#website").should("have.value", body[i].website);

        cy.get('[name="street"]').should("have.value", body[i].address.street);
        cy.get('[name="suite"]').should("have.value", body[i].address.suite);
        cy.get('[name="city"]').should("have.value", body[i].address.city);
        cy.get('[name="zipcode"]').should(
          "have.value",
          body[i].address.zipcode
        );
        cy.get('[data-test="company"] > [name="name"]').should(
          "have.value",
          body[i].company.name
        );
        cy.get('[name="catchPhrase"]').should(
          "have.value",
          body[i].company.catchPhrase
        );
        cy.get('[name="bs"]').should("have.value", body[i].company.bs);
      });
    });
  });
});
