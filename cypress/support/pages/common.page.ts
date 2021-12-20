/// <reference types="Cypress" />

const url = Cypress.config('baseUrl');

class CommonPage {
  open() {
    cy.visit(url);
  }

  searchElements(element) {
    cy.get(element).should('exist');
  }

  fillInput(element, value) {
    // @ts-ignore
    cy.get(element).type(value).tab();
  }

  notfillInput(element) {
    // @ts-ignore
    cy.get(element).click().tab();
  }

  fillSelect(element, value) {
    // @ts-ignore
    cy.get(element).select(value).tab();
  }

  checkErrorMessage(element, message) {
    cy.get(element).should('have.text', message);
  }

  notCheckErrorMessage(element) {
    cy.get(element).should('not.exist');
  }

  buttonEnableDisable(element, prop) {
    if (prop === 'disable') {
      cy.get(element).should('be.disabled');
    } else {
      cy.get(element).should('not.be.disabled');
    }
  }
  
  formEnableDisable(element, prop) {
    if (prop === 'disable') {
      cy.get(element).should('have.attr', 'aria-disabled', 'true');
    } else {
      cy.get(element).should('have.attr', 'aria-disabled', 'false');
    }
  }
}

export const commonPage = new CommonPage();