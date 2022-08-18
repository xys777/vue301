describe("User module create test", () => {
  beforeEach(() => {
    cy.visit("/user");
  });
  it("should create a row when click on new button", () => {
    cy.get('button[data-test="new"]').click();
    cy.get("table>tbody>tr").should("have.length", 11);
    cy.get(`[data-test="row:10"] > td`).should("have.class", "active");
    cy.get('button[data-test="new"]').click();
    cy.get("table>tbody>tr").should("have.length", 12);
    cy.get(`[data-test="row:11"] > td`).should("have.class", "active");
    cy.get('button[data-test="new"]').click();
    cy.get("table>tbody>tr").should("have.length", 13);
    cy.get(`[data-test="row:12"] > td`).should("have.class", "active");
  });

  it("should save data correctly when click on submit button", () => {
    cy.get('button[data-test="new"]').click();
    cy.get("#name").type("Evans Xu");
    cy.get("#username").type("EvansXu");
    cy.get("#email").type("EvansXu@fmr.com");
    cy.get('[name="street"]').type("Lingshui");
    cy.get('[name="suite"]').type("yannan");
    cy.get('[name="city"]').type("Dalian");
    cy.get('[name="zipcode"]').type("116000");
    cy.get("#phone").type("13900001111");
    cy.get("#website").type("https://xys777.github.io");
    cy.get('[data-test="company"] > [name="name"]').type("FMR");
    cy.get('[name="catchPhrase"]').type("test...");
    cy.get('[name="bs"]').type("e2e...");

    //before sumbit
    cy.get('[data-test="row:10"] > [data-test="key:name"]').should(
      "have.text",
      ""
    );
    cy.get('[data-test="row:10"] > [data-test="key:username"]').should(
      "have.text",
      ""
    );
    cy.get('[data-test="row:10"] > [data-test="key:phone"]').should(
      "have.text",
      ""
    );
    cy.get('[data-test="row:10"] > [data-test="key:email"]').should(
      "have.text",
      ""
    );

    //submit
    cy.get('[data-test="form"] > form > [type="submit"]').click();

    //after sumbit
    cy.get('[data-test="row:10"] > [data-test="key:name"]').should(
      "have.text",
      "Evans Xu"
    );
    cy.get('[data-test="row:10"] > [data-test="key:username"]').should(
      "have.text",
      "EvansXu"
    );
    cy.get('[data-test="row:10"] > [data-test="key:phone"]').should(
      "have.text",
      "13900001111"
    );
    cy.get('[data-test="row:10"] > [data-test="key:email"]').should(
      "have.text",
      "EvansXu@fmr.com"
    );
  });
});
