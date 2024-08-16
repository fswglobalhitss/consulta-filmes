module.exports = {
  e2e: {
    baseUrl: 'http://localhost:5009',
    specPattern: 'e2e/integration/**/*.cy.js'
  },
  video: false, // Desabilita a gravação de vídeo dos testes
  screenshotsFolder: 'screenshots',
  videosFolder: 'videos',
  fixturesFolder: 'fixtures',
};