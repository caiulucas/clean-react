import { FieldValidation } from '@validation/protocols/field-validation';
import { RequiredFieldValidation } from '@validation/validators';

import { EmailValidation } from './../email/email-validation';

export class ValidationBuilder {
  private constructor(
    private fieldName: string,
    private fieldValidations: FieldValidation[],
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.fieldValidations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.fieldValidations.push(new EmailValidation(this.fieldName));
    return this;
  }

  build(): FieldValidation[] {
    return this.fieldValidations;
  }
}
