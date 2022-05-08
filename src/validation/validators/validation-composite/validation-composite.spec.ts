import { FieldValidationSpy } from '@validation/tests/mock-field-validation';

import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpies: FieldValidationSpy[];
};

function makeSut(): SutTypes {
  const fieldValidationsSpies = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field'),
  ];

  const sut = new ValidationComposite(fieldValidationsSpies);

  return { sut, fieldValidationsSpies };
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpies } = makeSut();
    fieldValidationsSpies[0].error = new Error('first_error');
    fieldValidationsSpies[1].error = new Error('second_error');

    const error = sut.validate('any_field', 'any_value');
    expect(error).toBe('first_error');
  });
});
