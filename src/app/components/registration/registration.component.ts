import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ageValidator } from '../../validators/age.validator';
import { geoInfosValidator } from '../../validators/geoInfos.validator';
import { mailFormat } from '../../validators/mail-format';
import { matchPassword } from '../../validators/match-password';

interface Currency {
  id: number;
  name: string
}

type Sex = 'M' | 'F';

interface Gender {
  id: number,
  type: Sex,
}

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  currencies: Currency[];
  active: number = 0;
  form: FormGroup;
  genders: Array<Gender> = [{id: 1, type: 'M'}, {id: 2, type: 'F'}];

  steps = ['account', 'person', 'address'];

  maxDate: NgbDateStruct;

  constructor(fb: FormBuilder, calendar: NgbCalendar) {

    this.maxDate = calendar.getPrev(calendar.getToday(), 'y', 10);

    this.currencies = [
      {id: 1, name: 'euro'},
      {id: 2, name: 'dollar'},
      {id: 3, name: 'yen'}
    ];


    this.form = fb.group({
      account: fb.group({
        email: ['', Validators.compose([Validators.required, mailFormat])],
        username: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z0-9-_]+$/)])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
        repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20), matchPassword])],
        currency: ['', Validators.required]
      }),
      person: fb.group({
        firstName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
        lastName: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(20)])],
        gender: ['', Validators.compose([Validators.required])],
        birthDate: ['', Validators.compose([Validators.required, ageValidator(18)])]
      }),
      address: fb.group({
        geoInfo: ['', Validators.compose([Validators.required, geoInfosValidator()])]
      })
    })
  }

  ngOnInit(): void {
  }

  submit() {

  }

  isStepDisabled(idx: number): boolean {
    // return false;
    if (idx > 0) {
      // get previous step and check validity
      const prevStep = this.steps[idx - 1];
      return !this.form.get(prevStep).valid;
    }
    return false;
  }

  validateAndNext(number: number, step: string, isLast: boolean): void {
    if (!isLast) {
      this.active += number;
    }
  }
}
