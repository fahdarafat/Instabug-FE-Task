
describe('First Scenario', () => {
  it("Open homepage", () => {
    cy.visit('localhost:8080');
  });
  it("call get employees endpoint", () => {
    cy.request("https://fe-task.getsandbox.com/employees").its('status').should('equal', 200);
  });
  it("List of employees exists", () => {
    cy.get('.c-users-list__body');
  });
  it("Click on team-performance link", () => {
    cy.get('.top-links a:nth-child(2)').click()
  });
  it("Url should include team-performance", () => {
    cy.url().should('include', '/team-performance');
  });
})
