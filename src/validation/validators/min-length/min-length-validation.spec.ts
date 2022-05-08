import { faker } from '@faker-js/faker';
import { InvalidFieldError } from '@validation/errors/invalid-field-error';

import { MinLengthValidation } from './min-length-validation';

function makeSut(minLength: number): MinLengthValidation {
  return new MinLengthValidation(faker.database.column(), minLength);
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const minLength = faker.datatype.number({ min: 3, max: 10 });
    const sut = makeSut(minLength);
    const error = sut.validate(faker.word.verb(minLength - 1));

    expect(error).toBeInstanceOf(InvalidFieldError);
  });

  test('Should return falsy if value is valid', () => {
    const minLength = faker.datatype.number({ min: 3, max: 10 });
    const sut = makeSut(minLength);

    const error = sut.validate(faker.word.verb(minLength));

    expect(error).toBeFalsy();
  });
});
