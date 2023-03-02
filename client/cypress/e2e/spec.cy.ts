describe('My First Test', () => {
  it('Clicks the join button which opens spotify web ', () => {
    cy.visit('http://localhost:4200')

    cy.contains("Login to Spotify to host a session")
    // cy.url().should('include', 'spotify.com')
  })
})