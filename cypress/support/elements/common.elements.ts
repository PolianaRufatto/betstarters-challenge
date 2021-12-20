class CommonElements {
  formNavigation = (index) => `#ngb-nav-${index}`;
  inputElements = (id) => `#${id}`;
  errorMessage = (index) => `.tab-content > div > div:nth-child(${index}) > field-error > div`;
}

export const commonElements = new CommonElements();