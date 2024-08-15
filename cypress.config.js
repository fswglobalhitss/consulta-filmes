const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5009',
    setupNodeEvents(on, config) {
      // implementar configurações adicionais aqui, se necessário
    },
  },
});
