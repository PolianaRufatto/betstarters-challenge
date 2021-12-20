/// <reference types="Cypress" />
import { addressElements} from '../elements'
import { commonPage } from './common.page';

class AddressPage {
  filledAllFields(data) {
    commonPage.fillSelect(addressElements.selectCountry(), data.country);
    commonPage.fillSelect(addressElements.selectRegion(), data.region);
    commonPage.fillSelect(addressElements.selectProvince(), data.province);
    commonPage.fillSelect(addressElements.selectCity(), data.city);
    commonPage.fillInput(addressElements.inputAddress(), data.address);
    commonPage.fillInput(addressElements.inputZipcode(), data.zipcode);
  }
}

export const addressPage = new AddressPage();