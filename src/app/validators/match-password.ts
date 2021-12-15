import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { isPresent } from './geoInfos.validator';

export const matchPassword: ValidatorFn = (control: AbstractControl): ValidationErrors => {
  if (isPresent(Validators.required(control))) {
    return null;
  }
  if (!control.parent) {
    return null;
  }

  const passwordCtrl = control.parent.get('password');
  const observers = passwordCtrl.valueChanges['observers'].length;

  if (!observers) {
    passwordCtrl.valueChanges.subscribe(() => {
      control.updateValueAndValidity({onlySelf: true, emitEvent: false});
    });
  }

  const password = passwordCtrl.value;
  const passwordMatch = control.value;

  return password === passwordMatch ? null : {validateEqual: true};
};
