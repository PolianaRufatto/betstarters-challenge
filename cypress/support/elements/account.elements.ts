class AccountElements {
    formAccount = () => '#ngb-nav-0';
    inputElements = (field) => `#${field}`;
    inputEmail = () => '#email';
    inputUsername = () => '#username';
    inputPassword = () => '#password';
    inputRepeatPassword = () => '#repeat-password';
    selectCurrency = () => '#currency';
    errorMessage = (index) => `#ngb-nav-0-panel > div:nth-child(${index}) > field-error > div`;
    buttonNext = () => '#ngb-nav-0-panel > div.mb-3.mt-5.d-flex.buttons.justify-content-end > button';
  }
  
  export const accountElements = new AccountElements();