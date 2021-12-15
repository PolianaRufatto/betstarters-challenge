import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import * as moment from 'moment/moment';
import { isPresent } from './geoInfos.validator';

export function ageValidator(age = 18): ValidatorFn {
  return (control: AbstractControl) => {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    let value = control.value;

    if (!(value instanceof Date)) {
      value = new Date(value.year, value.month-1, value.day);
    }


    if (moment().diff(value, 'years') < age) {
      return {isMinor: true};
    }
    return null;
  };
}
