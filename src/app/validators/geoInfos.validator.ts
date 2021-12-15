import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IGeoInfo } from '../models/models';


export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}

export function geoInfosValidator(hideProvinces?: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    const values: Array<IGeoInfo> = [].concat(control.value);

    let isValid = values.every(v => v && v.country && v.region && v.city && v.address && v.address.length < 51 && v.zipCode && v.zipCode.length < 11);

    if (!hideProvinces) {
      isValid = isValid && values.every(v => v && v.province);
    }

    return isValid ? null : {'invalid-geoInfos': true};
  };
}
