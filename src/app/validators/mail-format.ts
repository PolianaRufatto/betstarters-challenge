import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isPresent } from './geoInfos.validator';

export const mailFormat: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  if (isPresent(Validators.required(control))) {
    return null;
  }
  const v: string = control.value;
  const EMAIL_REGEXP = /^\w+([+.-]?\w)*@([+.-]?\w{2,})+\.\w{2,}$/;

  return EMAIL_REGEXP.test(v) ? null : {'email-format': true};
};
