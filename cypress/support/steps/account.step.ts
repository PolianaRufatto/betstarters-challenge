/// <reference types='cypress' />
import { When, Then} from 'cypress-cucumber-preprocessor/steps';
import { accountElements, commonElements } from '../elements';
import { accountPage, commonPage } from '../pages';

const data = {
  "email": "test@test.com",
  "username": "usernameTest",
  "password": "passwordTest",
  "repeatPassword": "passwordTest",
  "currency": "euro"
}

When(/^I set a (.*) password on the field repeat password$/, (value) => {
  commonPage.fillInput(accountElements.inputRepeatPassword(), value);
});

When(/^I filled only some fields on form account$/, () => {
  commonPage.fillInput(accountElements.inputEmail(), data.email);
  commonPage.fillInput(accountElements.inputUsername(), data.username);
});

When(/^I filled all fields on form account$/, () => {
  accountPage.filledAllFields(data);
});

Then(/^should show the message '([^"]*)'$/, (message) => {
  commonPage.checkErrorMessage(commonElements.errorMessage(4), message);
});

Then(/^should not show the message 'error-validateEqual'$/, () => {
  commonPage.notCheckErrorMessage(commonElements.errorMessage(4));
});
