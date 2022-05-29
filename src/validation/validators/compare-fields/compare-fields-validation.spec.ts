import faker from '@faker-js/faker';
import { InvalidFieldError } from '@validation/errors';

import { CompareFieldsValidation } from './compare-fields-validation';

function makeSut(field: string, fieldToCompare: string) {
  return new CompareFieldsValidation(field, fieldToCompare);
}

describe('CompareFieldsValidation', () => {
  test('Should return error if comparison is invalid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const sut = makeSut(field, fieldToCompare);

    const error = sut.validate({
      [field]: faker.random.words(3),
      [fieldToCompare]: faker.random.words(4),
    });

    expect(error).toBeInstanceOf(InvalidFieldError);
  });

  test('Should return falsy if comparison is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const value = faker.random.word();

    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });

    expect(error).toBeFalsy();
  });
});
