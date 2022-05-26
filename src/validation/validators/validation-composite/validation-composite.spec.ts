import faker from '@faker-js/faker';
import { FieldValidationSpy } from '@validation/tests';

import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpies: FieldValidationSpy[];
};

function makeSut(fieldName: string): SutTypes {
  const fieldValidationsSpies = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const sut = ValidationComposite.build(fieldValidationsSpies);

  return { sut, fieldValidationsSpies };
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();

    const errorMessage = faker.random.words();

    const { sut, fieldValidationsSpies } = makeSut(fieldName);

    fieldValidationsSpies[0].error = new Error(errorMessage);
    fieldValidationsSpies[1].error = new Error(faker.random.words());

    const error = sut.validate(fieldName, {
      [fieldName]: faker.random.words(),
    });
    expect(error).toBe(errorMessage);
  });

  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();

    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, {
      [fieldName]: faker.random.words(),
    });

    expect(error).toBeFalsy();
  });
});
