/// <reference types="Cypress" />
import {accountElements} from '../elements'
import { commonPage } from './common.page';

class AccountPage {
  filledAllFields(data) {
    commonPage.fillInput(accountElements.inputEmail(), data.email);
    commonPage.fillInput(accountElements.inputUsername(), data.username);
    commonPage.fillInput(accountElements.inputPassword(), data.password);
    commonPage.fillInput(accountElements.inputRepeatPassword(), data.repeatPassword);
    commonPage.fillSelect(accountElements.selectCurrency(), data.currency);
  }
}

export const accountPage = new AccountPage();