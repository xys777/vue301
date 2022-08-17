// https://docs.cypress.io/api/introduction/api.html

describe("User List Actions Test", () => {
  beforeEach(() => { cy.visit("/user"); });

  describe("search test", () => {
    it("should show 0 row when type xxxzzz to search", () => {
      cy.get('[data-test="search"] > input')
        .type('xxxzzz').should('have.value', 'xxxzzz')
      cy.get('table>tbody>tr').should('have.length', 0)
    });
    it("should show 1 row when type bret to search ", () => {
      cy.get('[data-test="search"] > input')
        .type('bret').should('have.value', 'bret')
      cy.get('table>tbody>tr').should('have.length', 1)
    });
    it("should show all rows when delete the words in search", () => {
      cy.get('[data-test="search"] > input').type('le')
      cy.get('table>tbody>tr').should('have.length', 7)
      cy.get('[data-test="search"] > input').type('{backspace}{backspace}').should('have.value', '')
      cy.get('table>tbody>tr').should('have.length', 10)
    });
  });

  describe("click on row test", () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    it("should highlight the row when click on each row", () => {
      arr.map(i => cy.get(`[data-test="row:${i}"] > td`).should('not.have.class', 'active'))
      arr.map(i => {
        cy.get(`[data-test="row:${i}"] `).click()
        arr.map(j => cy.get(`[data-test="row:${j}"] > td`).should(j == i ? 'have.class' : 'not.have.class', 'active'))
      })
    });

    it("should show the detail data when click on each row", () => {
      let body: {
        [x: string]: any //docs.cypress.io/api/introduction/api.html
        ; id: any;
      }[] = []
      cy.intercept("GET", "/api/users", (req) => {
        delete req.headers['if-none-match'];
      }).as("getUsers");
      cy.wait('@getUsers').then((interception) => {
        assert.isNotNull(interception.response, '1st API call has data')
        
        body = interception.response?.body   
        arr.map(i => {
          cy.get(`[data-test="row:${i}"] `).click()
          cy.get('#id').should('have.value', body[i].id)
          cy.get('#name').should('have.value', body[i].name)
        })     
      })
    });

  });

});
