describe("User module udpate test", () => {
  beforeEach(() => {
    cy.visit("/user");
  });

  it("should udpate data correctly when click on submit button", () => {
    cy.get(`[data-test="row:5"] `).click();
    cy.get("#name").type("{selectAll}Evans Xu");
    cy.get("#username").type("{selectAll}EvansXu");
    cy.get("#email").type("{selectAll}EvansXu@fmr.com");
    cy.get('[name="street"]').type("{selectAll}Lingshui");
    cy.get('[name="suite"]').type("{selectAll}yannan");
    cy.get('[name="city"]').type("{selectAll}Dalian");
    cy.get('[name="zipcode"]').type("{selectAll}116000");
    cy.get("#phone").type("{selectAll}13900001111");
    cy.get("#website").type("{selectAll}https://xys777.github.io");
    cy.get('[data-test="company"] > [name="name"]').type("{selectAll}FMR");
    cy.get('[name="catchPhrase"]').type("{selectAll}test...");
    cy.get('[name="bs"]').type("{selectAll}e2e...");

    //before sumbit
    cy.get('[data-test="row:5"] > [data-test="key:name"]').should(
      "have.text",
      "Mrs. Dennis Schulist"
    );
    cy.get('[data-test="row:5"] > [data-test="key:username"]').should(
      "have.text",
      "Leopoldo_Corkery"
    );
    cy.get('[data-test="row:5"] > [data-test="key:phone"]').should(
      "have.text",
      "1-477-935-8478 x6430"
    );
    cy.get('[data-test="row:5"] > [data-test="key:email"]').should(
      "have.text",
      "Karley_Dach@jasper.info"
    );

    //submit
    cy.get('[data-test="form"] > form > [type="submit"]').click();

    //after sumbit
    cy.get('[data-test="row:5"] > [data-test="key:name"]').should(
      "have.text",
      "Evans Xu"
    );
    cy.get('[data-test="row:5"] > [data-test="key:username"]').should(
      "have.text",
      "EvansXu"
    );
    cy.get('[data-test="row:5"] > [data-test="key:phone"]').should(
      "have.text",
      "13900001111"
    );
    cy.get('[data-test="row:5"] > [data-test="key:email"]').should(
      "have.text",
      "EvansXu@fmr.com"
    );
  });
});
