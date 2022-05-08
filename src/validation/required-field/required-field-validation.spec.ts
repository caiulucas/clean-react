import { faker } from '@faker-js/faker';

import { RequiredFieldError } from '../errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate('');

    expect(error).toBeInstanceOf(RequiredFieldError);
  });

  test('Should return error if field is not empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate(faker.random.words());

    expect(error).toBeFalsy();
  });
});
