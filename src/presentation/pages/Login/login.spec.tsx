import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { InvalidCredentialsError } from '@domain/errors';
import { AccountModel } from '@domain/models';
import faker from '@faker-js/faker';
import { ApiProvider } from '@presentation/hooks/useApi';
import { Login } from '@presentation/pages';
import { AuthenticationSpy, ValidationSpy } from '@presentation/tests';
import { Helpers } from '@presentation/tests/helpers';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

type SutTypes = {
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock(account: AccountModel): void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

function makeSut(params?: SutParams): SutTypes {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccountMock = jest.fn();

  validationSpy.errorMessage = params?.validationError;

  render(
    <ApiProvider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router location={history.location} navigator={history}>
        <Login validation={validationSpy} authentication={authenticationSpy} />,
      </Router>
    </ApiProvider>,
  );

  return { validationSpy, authenticationSpy, setCurrentAccountMock };
}

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

function simulateValidSubmit(
  fields = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
) {
  Helpers.populateField('email', fields.email);
  Helpers.populateField('password', fields.password);

  const submitButton = screen.getByText('Entrar');
  fireEvent.click(submitButton);
}

describe('Login Page', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helpers.testChildCount('formStatus', 0);

    const submitButton = screen.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    Helpers.testStatusForField('email', validationError);
    Helpers.testStatusForField('password', validationError);
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helpers.populateField('email');
    Helpers.testStatusForField('email', validationError);
  });

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    Helpers.populateField('password');
    Helpers.testStatusForField('password', validationError);
  });

  test('Should show valid email state if validation succeeds', () => {
    makeSut();

    Helpers.populateField('email');

    Helpers.testStatusForField('email');
  });

  test('Should show valid password state if validation succeeds', () => {
    makeSut();

    Helpers.populateField('password');

    Helpers.testStatusForField('password');
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();

    Helpers.populateField('email');
    Helpers.populateField('password');

    const submitButton = screen.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  test('Should show spinner on submit', () => {
    makeSut();
    simulateValidSubmit();

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeTruthy();
  });

  test('Should call authentication with correct values', () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit({ email, password });

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call authentication only once', () => {
    const { authenticationSpy } = makeSut();
    simulateValidSubmit();
    simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should call authentication if form is invalid', () => {
    const { authenticationSpy } = makeSut({
      validationError: faker.random.words(),
    });

    Helpers.populateField('email');
    fireEvent.submit(screen.getByTestId('form'));

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if authentication fails', async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();

    await act(async () => {
      jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
      await waitFor(() => simulateValidSubmit());
    });

    Helpers.testChildCount('formStatus', 1);
    Helpers.testElementText('mainError', error.message);
  });

  test('Should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut();

    simulateValidSubmit();
    await waitFor(() => screen.getByTestId('form'));

    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account,
    );

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  test('Should go to signup page', () => {
    makeSut();

    const register = screen.getByText('Usuário novo? Crie uma conta');
    fireEvent.click(register);

    expect(history.location.pathname).toBe('/signup');
  });
});
