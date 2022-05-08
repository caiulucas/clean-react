import { FieldValidationSpy } from '@validation/tests/mock-field-validation';

import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const successFieldValidationSpy = new FieldValidationSpy('any_field');
    const failFieldValidationSpy = new FieldValidationSpy('any_field');
    failFieldValidationSpy.error = new Error('any_error');

    const sut = new ValidationComposite([
      successFieldValidationSpy,
      failFieldValidationSpy,
    ]);

    const error = sut.validate('any_field', 'any_value');

    expect(error).toBe('any_error');
  });
});
