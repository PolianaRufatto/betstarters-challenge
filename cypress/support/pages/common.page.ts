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

  buttonEnableDisable(textbutton, prop) {
    if (prop === 'disable') {
      cy.get('button').contains(textbutton).should('be.disabled');
    } else {
      cy.get('button').contains(textbutton).should('not.be.disabled');
    }
  }
  
  formEnableDisable(element, prop) {
    if (prop === 'disable') {
      cy.get(element).should('have.attr', 'aria-disabled', 'true');
    } else {
      cy.get(element).should('have.attr', 'aria-disabled', 'false');
    }
  }

  clickButton(textButton) {
    cy.get('button').contains(textButton).click();
  }

  clearInputField(element) {
    cy.get(element).clear();
  }
}

export const commonPage = new CommonPage();