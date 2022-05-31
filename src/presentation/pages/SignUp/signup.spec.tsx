import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { EmailInUseError } from '@domain/errors';
import { AccountModel } from '@domain/models';
import faker from '@faker-js/faker';
import { ApiProvider } from '@presentation/hooks/useApi';
import { AddAccountSpy, ValidationSpy } from '@presentation/tests';
import { Helpers } from '@presentation/tests/helpers';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { SignUp } from '.';

type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock(account: AccountModel): void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/signup'] });

function makeSut(params?: SutParams): SutTypes {
  const validationSpy = new ValidationSpy();
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();

  validationSpy.errorMessage = params?.validationError;

  render(
    <ApiProvider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <SignUp validation={validationSpy} addAccount={addAccountSpy} />
      </Router>
    </ApiProvider>,
  );

  return { addAccountSpy, setCurrentAccountMock };
}

function simulateValidSubmit(
  fields = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
) {
  Helpers.populateField('name', fields.name);
  Helpers.populateField('email', fields.email);
  Helpers.populateField('password', fields.password);
  Helpers.populateField('passwordConfirmation', fields.password);

  const submitButton = screen.getByText('Cadastrar');
  fireEvent.click(submitButton);
}

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('SignUp Page', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helpers.testChildCount('formStatus', 0);

    const submitButton = screen.getByText('Cadastrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    Helpers.testStatusForField('name', validationError);
    Helpers.testStatusForField('email', validationError);
    Helpers.testStatusForField('password', validationError);
    Helpers.testStatusForField('passwordConfirmation', validationError);
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helpers.populateField('name');
    Helpers.testStatusForField('name', validationError);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helpers.populateField('email');
    Helpers.testStatusForField('email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helpers.populateField('password');
    Helpers.testStatusForField('password', validationError);
  });

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helpers.populateField('passwordConfirmation');
    Helpers.testStatusForField('passwordConfirmation', validationError);
  });

  test('Should show valid name if Validation succeeds', () => {
    makeSut();
    Helpers.populateField('name');
    Helpers.testStatusForField('name');
  });

  test('Should show valid email if Validation succeeds', () => {
    makeSut();
    Helpers.populateField('email');
    Helpers.testStatusForField('email');
  });

  test('Should show valid password if Validation succeeds', () => {
    makeSut();
    Helpers.populateField('password');
    Helpers.testStatusForField('password');
  });

  test('Should show valid passwordConfirmation if Validation succeeds', () => {
    makeSut();
    Helpers.populateField('passwordConfirmation');
    Helpers.testStatusForField('passwordConfirmation');
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();

    Helpers.populateField('name');
    Helpers.populateField('email');
    Helpers.populateField('password');
    Helpers.populateField('passwordConfirmation');

    const submitButton = screen.getByText('Cadastrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  test('Should show spinner on submit', () => {
    makeSut();
    simulateValidSubmit();

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should add account with correct values', () => {
    const { addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit({ name, email, password });

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test('Should add account only once', () => {
    const { addAccountSpy } = makeSut();
    simulateValidSubmit();
    simulateValidSubmit();

    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('Should not add account if form is invalid', () => {
    const { addAccountSpy } = makeSut({
      validationError: faker.random.words(),
    });

    Helpers.populateField('email');
    fireEvent.submit(screen.getByTestId('form'));

    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('Should present error if add account fails', async () => {
    const { addAccountSpy } = makeSut();
    const error = new EmailInUseError();

    await act(async () => {
      jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);
      await waitFor(() => simulateValidSubmit());
    });

    Helpers.testChildCount('formStatus', 1);
    Helpers.testElementText('mainError', error.message);
  });

  test('Should call UpdateCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();

    simulateValidSubmit();
    await waitFor(() => screen.getByTestId('form'));

    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  test('Should go to login page', () => {
    makeSut();

    const register = screen.getByText('Voltar para o login');
    fireEvent.click(register);

    expect(history.location.pathname).toBe('/login');
  });
});
