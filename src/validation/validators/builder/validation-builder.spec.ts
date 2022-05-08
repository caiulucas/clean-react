import { faker } from '@faker-js/faker';
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@validation/validators';

import { ValidationBuilder } from './validation-builder';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = ValidationBuilder.field(fieldName).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  test('Should return EmailFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = ValidationBuilder.field(fieldName).email().build();
    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  test('Should return MinLengthValidation', () => {
    const fieldName = faker.database.column();
    const length = faker.datatype.number();

    const validations = ValidationBuilder.field(fieldName).min(length).build();
    expect(validations).toEqual([new MinLengthValidation(fieldName, length)]);
  });

  test('Should return a list of validations', () => {
    const fieldName = faker.database.column();
    const length = faker.datatype.number();

    const validations = ValidationBuilder.field(fieldName)
      .required()
      .email()
      .min(5)
      .build();

    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new EmailValidation(fieldName),
      new MinLengthValidation(fieldName, length),
    ]);
  });
});
