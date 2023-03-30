// npm run cypress:open
describe('Front End Unit Tests', () => {
  // login button test
  it('clicks the login button which redirects to the Spotify authorization', () => {
    cy.visit('http://localhost:4200')
    cy.contains("Login to Spotify to listen").click()
    cy.url().should('include', 'authorize')
  })
  it('navigates to the host page when the host button is clicked', () => {
    cy.visit('http://localhost:4200/start')
    cy.contains("Host").click()
    cy.url().should('include', '/host')
  })
})