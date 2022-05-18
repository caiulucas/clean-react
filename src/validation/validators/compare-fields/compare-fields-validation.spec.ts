import { faker } from '@faker-js/faker';
import { InvalidFieldError } from '@validation/errors';

import { CompareFieldsValidation } from './compare-fields-validation';

describe('CompareFieldsValidation', () => {
  test('Should return error if comparison is invalid', () => {
    const sut = new CompareFieldsValidation(faker.random.word());
    const error = sut.validate(faker.random.word());

    expect(error).toBeInstanceOf(InvalidFieldError);
  });
});
