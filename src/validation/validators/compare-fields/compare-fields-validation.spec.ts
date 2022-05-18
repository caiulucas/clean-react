import { faker } from '@faker-js/faker';
import { InvalidFieldError } from '@validation/errors';

import { CompareFieldsValidation } from './compare-fields-validation';

function makeSut(valueToCompare = faker.random.word()) {
  return new CompareFieldsValidation(faker.database.column(), valueToCompare);
}

describe('CompareFieldsValidation', () => {
  test('Should return error if comparison is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());

    expect(error).toBeInstanceOf(InvalidFieldError);
  });

  test('Should return falsy if comparison is valid', () => {
    const valueToCompare = faker.random.word();
    const sut = makeSut(valueToCompare);
    const error = sut.validate(valueToCompare);

    expect(error).toBeFalsy();
  });
});
