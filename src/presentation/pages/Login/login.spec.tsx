import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { InvalidCredentialsError } from '@domain/errors';
import { faker } from '@faker-js/faker';
import { Login } from '@presentation/pages';
import {
  ValidationSpy,
  AuthenticationSpy,
  SaveAccessTokenMock,
} from '@presentation/tests';
import { Helpers } from '@presentation/tests/helpers';
import {
  act,
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

function makeSut(params?: SutParams): SutTypes {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();

  validationSpy.errorMessage = params?.validationError;

  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login
        validation={validationSpy}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
      ,
    </Router>,
  );

  return { sut, validationSpy, authenticationSpy, saveAccessTokenMock };
}

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

function simulateValidSubmit(
  sut: RenderResult,
  fields = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  },
) {
  Helpers.populateField(sut, 'email', fields.email);
  Helpers.populateField(sut, 'password', fields.password);

  const submitButton = sut.getByText('Entrar');
  fireEvent.click(submitButton);
}

function testElementText(sut: RenderResult, elementId: string, text: string) {
  const element = sut.getByTestId(elementId);
  expect(element.textContent).toBe(text);
}

describe('Login Page', () => {
  afterEach(() => cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helpers.testChildCount(sut, 'formStatus', 0);

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    Helpers.testStatusForField(sut, 'email', validationError);
    Helpers.testStatusForField(sut, 'password', validationError);
  });

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut();

    const email = faker.internet.email();
    Helpers.populateField(sut, 'email', email);

    expect(validationSpy.fieldName).toBe('email');
    expect(validationSpy.fieldValue).toBe(email);
  });

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut();

    const password = faker.internet.password();
    Helpers.populateField(sut, 'password', password);

    expect(validationSpy.fieldName).toBe('password');
    expect(validationSpy.fieldValue).toBe(password);
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helpers.populateField(sut, 'email');

    const emailStatus = sut.getByTestId('emailStatus');

    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('🔴');
  });

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    Helpers.populateField(sut, 'password');

    const passwordStatus = sut.getByTestId('passwordStatus');

    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('🔴');
  });

  test('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut();

    Helpers.populateField(sut, 'email');

    Helpers.testStatusForField(sut, 'email');
  });

  test('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();

    Helpers.populateField(sut, 'password');

    Helpers.testStatusForField(sut, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();

    Helpers.populateField(sut, 'email');
    Helpers.populateField(sut, 'password');

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

    Helpers.populateField(sut, 'email');
    fireEvent.submit(sut.getByTestId('form'));

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();

    await act(async () => {
      jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
      await waitFor(() => simulateValidSubmit(sut));
    });

    Helpers.testChildCount(sut, 'formStatus', 1);
    testElementText(sut, 'mainError', error.message);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();

    simulateValidSubmit(sut);
    await waitFor(() => sut.getByTestId('form'));

    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.access_token,
    );

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  test('Should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    const error = new InvalidCredentialsError();

    await act(async () => {
      jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error);
      simulateValidSubmit(sut);
      await waitFor(() => sut.getByTestId('form'));
    });

    Helpers.testChildCount(sut, 'formStatus', 1);
    testElementText(sut, 'mainError', error.message);
  });

  test('Should go to signup page', () => {
    const { sut } = makeSut();

    const register = sut.getByText('Usuário novo? Crie uma conta');
    fireEvent.click(register);

    expect(history.location.pathname).toBe('/signup');
  });
});
