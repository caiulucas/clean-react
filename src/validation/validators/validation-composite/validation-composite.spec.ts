import { FieldValidationSpy } from '@validation/tests/mock-field-validation';

import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const firstFieldValidationSpy = new FieldValidationSpy('any_field');
    firstFieldValidationSpy.error = new Error('first_error');

    const secondFieldValidationSpy = new FieldValidationSpy('any_field');
    secondFieldValidationSpy.error = new Error('any_error');

    const sut = new ValidationComposite([
      firstFieldValidationSpy,
      secondFieldValidationSpy,
    ]);

    const error = sut.validate('any_field', 'any_value');

    expect(error).toBe('first_error');
  });
});
