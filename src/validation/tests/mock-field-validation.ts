import { FieldValidation } from '@validation/protocols/field-validation';

export class FieldValidationSpy implements FieldValidation {
  error: Error;

  constructor(readonly field: string) {
    this.error = null;
  }

  validate(value: string): Error {
    return this.error;
  }
}
