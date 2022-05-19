import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { ValidationSpy } from '@presentation/tests';
import { Helpers } from '@presentation/tests/helpers';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { SignUp } from '.';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/signup'] });

function populateField(
  sut: RenderResult,
  elementId: string,
  value = faker.random.word(),
) {
  const input = sut.getByTestId(elementId);
  fireEvent.input(input, {
    target: { value },
  });
}

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
    const validationError = faker.name.findName();
    const { sut } = makeSut({ validationError });

    Helpers.testChildCount(sut, 'formStatus', 0);

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    Helpers.testStatusForField(sut, 'name', validationError);
    Helpers.testStatusForField(sut, 'email', 'Campo obrigatório');
    Helpers.testStatusForField(sut, 'password', 'Campo obrigatório');
    Helpers.testStatusForField(
      sut,
      'passwordConfirmation',
      'Campo obrigatório',
    );
  });

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateField(sut, 'name');

    Helpers.testStatusForField(sut, 'name', validationError);
  });
});
