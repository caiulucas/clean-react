import { FieldValidation } from '@validation/protocols/field-validation';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation,
} from '@validation/validators';

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

  min(minLength: number): ValidationBuilder {
    this.fieldValidations.push(
      new MinLengthValidation(this.fieldName, minLength),
    );
    return this;
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    this.fieldValidations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare),
    );
    return this;
  }

  build(): FieldValidation[] {
    return this.fieldValidations;
  }
}
