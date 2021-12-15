import { Component, Input } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Component({
  selector: 'field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss']
})
export class FieldErrorComponent {

  @Input()
  control!: AbstractControl | NgControl;

  get error() {

    if (this.control.untouched) {
      return null;
    }

    for (const propertyName in this.control.errors) {
      if (propertyName in this.control.errors) {
        return {key: propertyName, value: this.control.errors[propertyName]};
      }
    }

    return null;
  }


}
