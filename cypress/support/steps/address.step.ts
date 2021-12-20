import { Given, When, Then} from 'cypress-cucumber-preprocessor/steps';
import { addressElements, commonElements } from "../elements";
import { addressPage, commonPage } from "../pages";

const data = {
  "country": "ITALY",
  "region": "Lombardia",
  "province": "BRESCIA",
  "city": "OSSIMO",
  "address": "Via XX",
  "zipcode": "25050",
  "country2": "BRAZIL"
}

When(/^I filled all fields on form address$/, () => {
  addressPage.filledAllFields(data);
});

When(/^I select a value on field (.*)$/, (id) => {
  commonPage.fillSelect(commonElements.elementByID(id), `${data}.${id}`);
});

When(/^I changed the (.*)$/, (id) => {
  commonPage.fillSelect(commonElements.elementByID(id), data.country2);
});

Then(/^should show the required message on (.*) in the address form$/, (index) => {
  commonPage.checkErrorMessage(addressElements.errorMessage(index), 'error-required');
});