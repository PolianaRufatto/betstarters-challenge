/// <reference types="Cypress" />
import { personElements} from '../elements'
import { commonPage } from './common.page';

class PersonPage {
  filledAllFields(data) {
    commonPage.fillInput(personElements.inputFirstName(), data.firstName);
    commonPage.fillInput(personElements.inputLastName(), data.lastName);
    commonPage.fillSelect(personElements.selectGender(), data.gender);
    commonPage.fillInput(personElements.inputBirthDate(), data.birthDate);
  }
}

export const personPage = new PersonPage();