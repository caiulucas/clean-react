import faker from '@faker-js/faker';
import { RequiredFieldError } from '@validation/errors';

import { RequiredFieldValidation } from './required-field-validation';

function makeSut(field: string): RequiredFieldValidation {
  return new RequiredFieldValidation(field);
}

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });

    expect(error).toBeInstanceOf(RequiredFieldError);
  });

  test('Should return error if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.words() });

    expect(error).toBeFalsy();
  });
});
