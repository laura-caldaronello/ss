import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenArrayValidator(forbiddenArray: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // Don't validate if the value is empty
    }

    // Check if the value exists in the forbiddenArray
    return forbiddenArray.includes(control.value)
      ? { forbidden: { value: control.value } }
      : null;
  };
}
