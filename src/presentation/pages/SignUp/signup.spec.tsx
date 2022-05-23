import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { EmailInUseError } from '@domain/errors';
import { faker } from '@faker-js/faker';
import { ValidationSpy, AddAccountSpy } from '@presentation/tests';
import { Helpers } from '@presentation/tests/helpers';
import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import { SignUp } from '.';

type SutTypes = {
  sut: RenderResult;
  addAccountSpy: AddAccountSpy;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/signup'] });

function makeSut(params?: SutParams): SutTypes {
  const validationSpy = new ValidationSpy();
  const addAccountSpy = new AddAccountSpy();

  validationSpy.errorMessage = params?.validationError;

  const sut = render(
    <Router location={history.location} navigator={history}>
      <SignUp validation={validationSpy} addAccount={addAccountSpy} />
    </Router>,
  );

  return { sut, addAccountSpy };
}

function simulateValidSubmit(
  sut: RenderResult,
  fields = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
) {
  Helpers.populateField(sut, 'name', fields.name);
  Helpers.populateField(sut, 'email', fields.email);
  Helpers.populateField(sut, 'password', fields.password);
  Helpers.populateField(sut, 'passwordConfirmation', fields.password);

  const submitButton = sut.getByText('Entrar');
  fireEvent.click(submitButton);
}

function testElementText(sut: RenderResult, elementId: string, text: string) {
  const element = sut.getByTestId(elementId);
  expect(element.textContent).toBe(text);
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

  test('Should show spinner on submit', () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);

    const spinner = sut.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should add account with correct values', () => {
    const { sut, addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(sut, { name, email, password });

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test('Should add account only once', () => {
    const { sut, addAccountSpy } = makeSut();
    simulateValidSubmit(sut);
    simulateValidSubmit(sut);

    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('Should not add account if form is invalid', () => {
    const { sut, addAccountSpy } = makeSut({
      validationError: faker.random.words(),
    });

    Helpers.populateField(sut, 'email');
    fireEvent.submit(sut.getByTestId('form'));

    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('Should present error if add account fails', async () => {
    const { sut, addAccountSpy } = makeSut();
    const error = new EmailInUseError();

    await act(async () => {
      jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
      await waitFor(() => simulateValidSubmit(sut));
    });

    Helpers.testChildCount(sut, 'formStatus', 1);
    testElementText(sut, 'mainError', error.message);
  });
});
