/// <reference types='cypress' />
import { Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import { accountElements, personElements } from '../elements';
import { accountPage, commonPage } from '../pages';
import { context } from '../../fixtures/Context';

Given(/^I'm on the initial page$/, () => {
  commonPage.open();
});

When(/^I not filled the (.*)$/, (field) => {
  commonPage.notfillInput(accountElements.inputElements(field));
});

When(/^I filled the email with a invalid value$/, () => {
  commonPage.fillInput(accountElements.inputEmail(), 'test@t.t');
});

When(/^I filled the (.*) with a invalid (.*)$/, (field, value) => {
  commonPage.fillInput(accountElements.inputElements(field), value);
});


When(/^I filled the (.*) with a valid (.*)$/, (field, value) => {
  commonPage.fillInput(accountElements.inputElements(field), value);
});

When(/^I filled the (.*) with (.*)$/, (field, value) => {
  commonPage.fillInput(accountElements.inputElements(field), value);
});

When(/^I filled the currency with (.*)$/, (value) => {
  commonPage.fillSelect(accountElements.selectCurrency(), value);
});

When(/^I put a (.*) on currency$/, (value) => {
  commonPage.fillSelect(accountElements.selectCurrency(), value);
});

When(/^I put a (.*) password on the field repeat password$/, (value) => {
  commonPage.fillInput(accountElements.inputRepeatPassword(), value);
});

When(/^I filled only some fields$/, () => {
  commonPage.fillInput(accountElements.inputEmail(), 'test@test.com');
  commonPage.fillInput(accountElements.inputUsername(), 'testButtonNext');
});

When(/^I filled all fields$/, () => {
  const data = {
    "email": "test@test.com",
    "username": "usernameTest",
    "password": "passwordTest",
    "repeatPassword": "passwordTest",
    "currency": "euro"
  }
  accountPage.filledAllFields(data);
});

Then(/^should show the required message on (.*)$/, (index) => {
  commonPage.checkErrorMessage(accountElements.errorMessage(index), 'error-required');
});

Then(/^should show the (.*) error (.+)$/, (index, message) => {
  commonPage.checkErrorMessage(accountElements.errorMessage(index), message);
});

Then(/^should not show the (.*) error mesage$/, (index) => {
  commonPage.notCheckErrorMessage(accountElements.errorMessage(index)); 
});

Then(/^should show the message '(.+)' on (.*)$/, (message, index) => {
  commonPage.checkErrorMessage(accountElements.errorMessage(index), message);
});

Then(/^should show the message on select$/, () => {
  commonPage.checkErrorMessage(accountElements.errorMessage(5), 'error-required');
});

Then(/^should not show the message on select$/, () => {
  commonPage.notCheckErrorMessage(accountElements.errorMessage(5));
});

Then(/^should show the message '([^"]*)'$/, (message) => {
  commonPage.checkErrorMessage(accountElements.errorMessage(4), message);
});

Then(/^should not show the message 'error-validateEqual'$/, () => {
  commonPage.notCheckErrorMessage(accountElements.errorMessage(4));
});

Then(/^the 'next' button should be (.*)$/, (prop) => {
  commonPage.buttonEnableDisable(accountElements.buttonNext(), prop);
});

Then(/^the 'Person' button should be (.*)$/, (prop) => {
  commonPage.formEnableDisable(personElements.formPerson(), prop);
});