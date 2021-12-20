/// <reference types="cypress" />
const cucumber = require("cypress-cucumber-preprocessor").default;
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const browserify = require("@cypress/browserify-preprocessor");

/**
* @type {Cypress.PluginConfig}
*/
module.exports = (on, config) => {
  const options = {
    ... browserify.defaultOptions,
    typescript: require.resolve("typescript"),
  }
  on("file:preprocessor", cucumber(options));
  allureWriter(on, config);
  return config;
}

