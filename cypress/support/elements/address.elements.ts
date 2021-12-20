class AddressElements {
  errorMessage = (index) => `#ngb-nav-2-panel > geo-infos > div > div:nth-child(${index}) > field-error > div`;
  selectCountry = () => '#country';
  selectRegion = () => '#region';
  selectProvince = () => '#province';
  selectCity = () => '#city';
  inputAddress = () => '#address';
  inputZipcode = () => '#zipcode';
}
  
export const addressElements = new AddressElements();