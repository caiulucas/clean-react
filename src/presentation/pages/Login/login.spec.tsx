import { faker } from '@faker-js/faker';
import { ValidationSpy } from '@presentation/tests';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';

import { Login } from '.';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

type SutParams = {
  validationError: string;
};

function makeSut(params?: SutParams): SutTypes {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError;

  return {
    sut: render(<Login validation={validationSpy} />),
    validationSpy,
  };
}

describe('Login Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const {
      sut: { getByTestId, getByText },
    } = makeSut({ validationError });
    const formStatus = getByTestId('formStatus');

    expect(formStatus.childElementCount).toBe(0);

    const submitButton = getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    const emailStatus = getByTestId('emailStatus');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = getByTestId('passwordStatus');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should call validation with correct email', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const email = faker.internet.email();

    const emailInput = getByTestId('email');
    fireEvent.input(emailInput, { target: { value: email } });

    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  test('Should call validation with correct password', () => {
    const {
      sut: { getByTestId },
      validationSpy,
    } = makeSut();

    const password = faker.internet.password();

    const passwordInput = getByTestId('password');
    fireEvent.input(passwordInput, { target: { value: password } });

    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words();

    const {
      sut: { getByTestId },
    } = makeSut({ validationError });

    const emailInput = getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = getByTestId('emailStatus');

    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words();

    const {
      sut: { getByTestId },
    } = makeSut({ validationError });

    const passwordInput = getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const passwordStatus = getByTestId('passwordStatus');

    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email state if validation succeeds', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const emailInput = getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const emailStatus = getByTestId('emailStatus');

    expect(emailStatus.title).toBe('Tudo certo!');
    expect(emailStatus.textContent).toBe('🟢');
  });

  test('Should show valid password state if validation succeeds', () => {
    const {
      sut: { getByTestId },
    } = makeSut();

    const passwordInput = getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const passwordStatus = getByTestId('passwordStatus');

    expect(passwordStatus.title).toBe('Tudo certo!');
    expect(passwordStatus.textContent).toBe('🟢');
  });

  test('Should enable submit button if form is valid', () => {
    const {
      sut: { getByTestId, getByText },
    } = makeSut();

    const emailInput = getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const passwordInput = getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const submitButton = getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  test('Should show spinner on submit', () => {
    const {
      sut: { getByTestId, getByText },
    } = makeSut();

    const emailInput = getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const passwordInput = getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const submitButton = getByText('Entrar');
    fireEvent.click(submitButton);

    const spinner = getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });
});
