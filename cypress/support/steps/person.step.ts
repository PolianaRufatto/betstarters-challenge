import { When } from 'cypress-cucumber-preprocessor/steps';
import { commonElements, personElements } from '../elements';
import { personPage, commonPage } from '../pages';

const data = {
  "firstName": "FirstName",
  "lastName": "LastName",
  "gender": "F",
  "birthDate": "1990-04-19",
}

When(/^go to the next form$/, () => {
  commonPage.clickButton('next');
});

When(/^I filled only some fields on form person$/, () => {
  commonPage.fillInput(personElements.inputFirstName(), data.firstName);
  commonPage.fillInput(personElements.inputLastName(), data.lastName);
});

When(/^I filled all fields on form person$/, () => {
  personPage.filledAllFields(data);
});

When(/^I go back to the previous form$/, () => {
  commonPage.clickButton('previous');
});

When(/^I clear some field$/, () => {
  commonPage.clearInputField(commonElements.elementByID('username'));
});

When(/^I dont clear any field$/, () => {
});