import { faker } from '@faker-js/faker';
import { InvalidFieldError } from '@validation/errors';

import { EmailValidation } from './email-validation';

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.database.column());
    const error = sut.validate(faker.random.word());

    expect(error).toBeInstanceOf(InvalidFieldError);
  });

  test('Should return falsy if email is valid', () => {
    const sut = new EmailValidation(faker.database.column());
    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });
});
