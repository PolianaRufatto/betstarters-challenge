import { When } from 'cypress-cucumber-preprocessor/steps';
import { accountElements, commonElements, personElements } from '../elements';
import { accountPage, commonPage } from '../pages';
import { personPage } from '../pages/person.page';

const data = {
  "firstName": "FirstName",
  "lastName": "LastName",
  "gender": "F",
  "birthDate": "1990-04-19",
}

When(/^go to the next form$/, () => {
  commonPage.clickButton(accountElements.buttonNext());
});

When(/^I filled only some fields on form person$/, () => {
  commonPage.fillInput(personElements.inputFirstName(), data.firstName);
  commonPage.fillInput(personElements.inputLastName(), data.lastName);
});

When(/^I filled all fields on form person$/, () => {
  personPage.filledAllFields(data);
});

When(/^I go back to the previous form$/, () => {
  commonPage.clickButton(personElements.buttonPrevious());
});

When(/^I clear some field$/, () => {
  commonPage.clearInputField(commonElements.inputElements('username'));
});

When(/^I dont clear any field$/, () => {
});