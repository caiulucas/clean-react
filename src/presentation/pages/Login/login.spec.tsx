import { faker } from '@faker-js/faker';
import { Validation } from '@presentation/protocols/validation';
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';

import { Login } from '.';

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
}

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

function makeSut(): SutTypes {
  const validationSpy = new ValidationSpy();

  return {
    sut: render(<Login validation={validationSpy} />),
    validationSpy,
  };
}
afterEach(cleanup);

describe('Login Page', () => {
  test('Should start with initial state', () => {
    const {
      sut: { getByTestId, getByText },
    } = makeSut();
    const formStatus = getByTestId('formStatus');

    expect(formStatus.childElementCount).toBe(0);

    const submitButton = getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    const emailStatus = getByTestId('emailStatus');
    expect(emailStatus.title).toBe('Campo obrigatório');
    expect(emailStatus.textContent).toBe('🔴');

    const passwordStatus = getByTestId('passwordStatus');
    expect(passwordStatus.title).toBe('Campo obrigatório');
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

    expect(validationSpy.input).toEqual({
      email,
    });
  });
});
