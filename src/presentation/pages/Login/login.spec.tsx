import 'jest-localstorage-mock';

import { InvalidCredentialsError } from '@domain/errors';
import { faker } from '@faker-js/faker';
import { ValidationSpy, AuthenticationSpy } from '@presentation/tests';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import { Login } from '.';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();

  validationSpy.errorMessage = params?.validationError;

  return {
    sut: render(
      <Login validation={validationSpy} authentication={authenticationSpy} />,
    ),
    validationSpy,
    authenticationSpy,
  };
}

function populateEmailField(sut: RenderResult, email = faker.internet.email()) {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, {
    target: { value: email },
  });
}

function populatePasswordField(
  sut: RenderResult,
  password = faker.internet.password(),
) {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
}

function simulateValidSubmit(
  sut: RenderResult,
  fields = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
) {
  populateEmailField(sut, fields.email);
  populatePasswordField(sut, fields.password);

  const submitButton = sut.getByText('Entrar');
  fireEvent.click(submitButton);
}

function simulateStatusForField(
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
) {
  const status = sut.getByTestId(`${fieldName}Status`);
  expect(status.title).toBe(validationError || 'Tudo certo!');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
}

describe('Login Page', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    const formStatus = sut.getByTestId('formStatus');
    expect(formStatus.childElementCount).toBe(0);

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    simulateStatusForField(sut, 'email', validationError);
    simulateStatusForField(sut, 'password', validationError);
  });

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();

    const email = faker.internet.email();
    populateEmailField(sut, email);

    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();

    const password = faker.internet.password();
    populatePasswordField(sut, password);

    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populateEmailField(sut);

    const emailStatus = sut.getByTestId('emailStatus');

    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    populatePasswordField(sut);

    const passwordStatus = sut.getByTestId('passwordStatus');

    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();

    populateEmailField(sut);

    simulateStatusForField(sut, 'email');
  });

  test('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);

    simulateStatusForField(sut, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    populateEmailField(sut);
    populatePasswordField(sut);

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  test('Should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, { email, password });

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call authentication only once', () => {
    const { sut, authenticationSpy } = makeSut();
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should call authentication if form is invalid', () => {
    const { sut, authenticationSpy } = makeSut({
      validationError: faker.random.words(),
    });

    populateEmailField(sut);
    fireEvent.submit(sut.getByTestId('form'));

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();

    const formStatus = sut.getByTestId('formStatus');

    await act(async () => {
      jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
      simulateValidSubmit(sut);

      await waitFor(() => formStatus);
    });

    const mainError = sut.getByTestId('mainError');

    expect(formStatus.childElementCount).toBe(1);
    expect(mainError.textContent).toBe(error.message);
  });

  test('Should add accessToken to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut();

    simulateValidSubmit(sut);
    await waitFor(() => sut.getByTestId('form'));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      '@clean-raect:accessToken',
      authenticationSpy.account.access_token,
    );
  });
});
