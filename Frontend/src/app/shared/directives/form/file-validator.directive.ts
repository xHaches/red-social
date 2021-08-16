import { Directive } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: "[requiredFile]",
  providers: [
      { provide: NG_VALIDATORS, useExisting: FileValidatorDirective, multi: true },
  ]
})
export class FileValidatorDirective implements Validator {
  static validate(c: FormControl): any {
      return c.value == null || c.value.length == 0 ? { "required" : true} : null;
  }

  validate(c: FormControl): {[key: string]: any} {
      return FileValidatorDirective.validate(c);
  }
}