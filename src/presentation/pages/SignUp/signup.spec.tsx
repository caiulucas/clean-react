import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { ValidationSpy } from '@presentation/tests';
import { Helpers } from '@presentation/tests/helpers';
import { render, RenderResult } from '@testing-library/react';

import { SignUp } from '.';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/signup'] });

function makeSut(params?: SutParams): SutTypes {
  const validationSpy = new ValidationSpy();

  validationSpy.errorMessage = params?.validationError;

  return {
    sut: render(
      <Router location={history.location} navigator={history}>
        <SignUp validation={validationSpy} />
      </Router>,
    ),
  };
}

describe('SignUp Page', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helpers.testChildCount(sut, 'formStatus', 0);

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    Helpers.testStatusForField(sut, 'name', validationError);
    Helpers.testStatusForField(sut, 'email', validationError);
    Helpers.testStatusForField(sut, 'password', validationError);
    Helpers.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helpers.populateField(sut, 'name');
    Helpers.testStatusForField(sut, 'name', validationError);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helpers.populateField(sut, 'email');
    Helpers.testStatusForField(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helpers.populateField(sut, 'password');
    Helpers.testStatusForField(sut, 'password', validationError);
  });

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helpers.populateField(sut, 'passwordConfirmation');
    Helpers.testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  test('Should show valid name if Validation succeeds', () => {
    const { sut } = makeSut();
    Helpers.populateField(sut, 'name');
    Helpers.testStatusForField(sut, 'name');
  });

  test('Should show valid email if Validation succeeds', () => {
    const { sut } = makeSut();
    Helpers.populateField(sut, 'email');
    Helpers.testStatusForField(sut, 'email');
  });

  test('Should show valid password if Validation succeeds', () => {
    const { sut } = makeSut();
    Helpers.populateField(sut, 'password');
    Helpers.testStatusForField(sut, 'password');
  });

  test('Should show valid passwordConfirmation if Validation succeeds', () => {
    const { sut } = makeSut();
    Helpers.populateField(sut, 'passwordConfirmation');
    Helpers.testStatusForField(sut, 'passwordConfirmation');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    Helpers.populateField(sut, 'name');
    Helpers.populateField(sut, 'email');
    Helpers.populateField(sut, 'password');
    Helpers.populateField(sut, 'passwordConfirmation');

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });
});
