/// <reference types='cypress' />
import { Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import { commonElements } from '../elements';
import { commonPage } from '../pages';

Given(/^I'm on the initial page$/, () => {
  commonPage.open();
});

When(/^I not filled the (.*)$/, (field) => {
  commonPage.notfillInput(commonElements.inputElements(field));
});

When(/^I filled the (.*) with a invalid (.*)$/, (field, value) => {
  commonPage.fillInput(commonElements.inputElements(field), value);
});

When(/^I filled the (.*) with a valid (.*)$/, (field, value) => {
  commonPage.fillInput(commonElements.inputElements(field), value);
});

When(/^I filled the (.*) with (.*)$/, (field, value) => {
  commonPage.fillInput(commonElements.inputElements(field), value);
});

When(/^I put a (.*) on (.*)$/, (value, field) => {
  commonPage.fillSelect(commonElements.inputElements(field), value);
});

Then(/^should show the required message on (.*)$/, (index) => {
  commonPage.checkErrorMessage(commonElements.errorMessage(index), 'error-required');
});

Then(/^should show the (.*) error (.+)$/, (index, message) => {
  commonPage.checkErrorMessage(commonElements.errorMessage(index), message);
});

Then(/^should not show the (.*) error mesage$/, (index) => {
  commonPage.notCheckErrorMessage(commonElements.errorMessage(index)); 
});

Then(/^should show the message '(.+)' on (.*)$/, (message, index) => {
  commonPage.checkErrorMessage(commonElements.errorMessage(index), message);
});

Then(/^should show the message on select (.*)$/, (index) => {
  commonPage.checkErrorMessage(commonElements.errorMessage(index), 'error-required');
});

Then(/^should not show the message on select (.*)$/, (index) => {
  commonPage.notCheckErrorMessage(commonElements.errorMessage(index));
});

Then(/^the (.*) button should be (.*)$/, (nameButton, prop) => {
  commonPage.buttonEnableDisable(nameButton, prop);
});

Then(/^the button on index (.*) should be (.*)$/, (index, prop) => {
  commonPage.formEnableDisable(commonElements.formNavigation(index), prop);
});
