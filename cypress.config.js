const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://serverest.dev",
    watchForFileChanges: false,
    defaultCommandTimeout: 8000,
    requestTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here      
      },
      env: {
        requestMode: true, //para mostrar o modo de requisição e response
      },
    },
  },
});
