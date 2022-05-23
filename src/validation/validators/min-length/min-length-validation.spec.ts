import { faker } from '@faker-js/faker';
import { InvalidFieldError } from '@validation/errors/invalid-field-error';

import { MinLengthValidation } from './min-length-validation';

function makeSut(field: string, minLength: number): MinLengthValidation {
  return new MinLengthValidation(field, minLength);
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column();
    const minLength = faker.datatype.number({ min: 3, max: 10 });
    const sut = makeSut(field, minLength);
    const error = sut.validate({ [field]: faker.word.verb(minLength - 1) });

    expect(error).toBeInstanceOf(InvalidFieldError);
  });

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column();
    const minLength = faker.datatype.number({ min: 3, max: 10 });
    const sut = makeSut(field, minLength);

    const error = sut.validate({ [field]: faker.word.verb(minLength) });

    expect(error).toBeFalsy();
  });

  test('Should return falsy if field does not exists in schema', () => {
    const minLength = faker.datatype.number({ min: 3, max: 10 });
    const sut = makeSut(faker.database.column(), minLength);

    const error = sut.validate({
      [faker.database.column()]: faker.word.verb(minLength),
    });

    expect(error).toBeFalsy();
  });
});
