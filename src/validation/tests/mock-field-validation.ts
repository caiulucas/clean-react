import { FieldValidation } from '@validation/protocols/field-validation';

export class FieldValidationSpy implements FieldValidation {
  error: Error;

  constructor(readonly field: string) {
    this.error = null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(_value: string): Error {
    return this.error;
  }
}
