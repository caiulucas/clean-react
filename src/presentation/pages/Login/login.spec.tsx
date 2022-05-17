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

function testStatusForField(
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
) {
  const status = sut.getByTestId(`${fieldName}Status`);
  expect(status.title).toBe(validationError || 'Tudo certo!');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
}

function testFormStatusChildCount(sut: RenderResult, count: number) {
  const formStatus = sut.getByTestId('formStatus');
  expect(formStatus.childElementCount).toBe(count);
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

    testFormStatusChildCount(sut, 0);

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
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

    testStatusForField(sut, 'email');
  });

  test('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut();

    populatePasswordField(sut);

    testStatusForField(sut, 'password');
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

    await act(async () => {
      jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);
      await waitFor(() => simulateValidSubmit(sut));
    });

    testFormStatusChildCount(sut, 1);
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

    testFormStatusChildCount(sut, 1);
    testElementText(sut, 'mainError', error.message);
  });

  test('Should go to signup page', () => {
    const { sut } = makeSut();

    const register = sut.getByText('Usuário novo? Crie uma conta');
    fireEvent.click(register);

    expect(history.location.pathname).toBe('/signup');
  });
});
