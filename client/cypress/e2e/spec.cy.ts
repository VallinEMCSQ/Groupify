describe('My First Test', () => {
  it('clicks the login button which redirects to the Spotify authorization', () => {
    cy.visit('http://localhost:4200')

    cy.contains("Login to Spotify to host a session").click()
    cy.url().should('include', 'https://open.spotify.com/?')
  })
})