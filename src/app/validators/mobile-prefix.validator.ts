import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IMobilePrefix } from '../models/models';
import { isPresent } from './geoInfos.validator';

export class MobilePrefixValidator {

  static number(regex = /^[0-9]{3,15}$/): ValidatorFn {

    if (typeof regex === 'string') {
      regex = new RegExp(regex);
    }

    return (control: AbstractControl): ValidationErrors | null => {
      if (isPresent(Validators.required(control))) {
        return null;
      }

      const value: IMobilePrefix = control.value;

      const isValid = value.prefix && value.phone && regex.test(value.phone);

      return isValid ? null : {'phone-format': true};
    };
  }
}

