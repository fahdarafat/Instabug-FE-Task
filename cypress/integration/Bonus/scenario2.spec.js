
describe('Second Scenario', () => {
  it("Open homepage", () => {
    cy.visit('localhost:8080');
  });
  it("call get employees endpoint", () => {
    cy.request("https://fe-task.getsandbox.com/employees").its('status').should('equal', 200);
  });
  it("Load more", () => {
    cy.get('.c-button').last().click();
  });
  it("Number of request to match should be 1", () => {
    cy.intercept({method: 'GET',url: 'https://fe-task.getsandbox.com/employees?page=1'})
    .as('getEmployees');
  })
})
