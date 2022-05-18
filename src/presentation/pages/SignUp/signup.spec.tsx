import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { Helpers } from '@presentation/tests/helpers';
import { render, RenderResult } from '@testing-library/react';

import { SignUp } from '.';

type SutTypes = {
  sut: RenderResult;
};
const history = createMemoryHistory({ initialEntries: ['/signup'] });

function makeSut(): SutTypes {
  return {
    sut: render(
      <Router location={history.location} navigator={history}>
        <SignUp />
      </Router>,
    ),
  };
}

describe('SignUp Page', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut();

    const validationError = 'Campo obrigatório';

    Helpers.testChildCount(sut, 'formStatus', 0);

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    Helpers.testStatusForField(sut, 'name', validationError);
    Helpers.testStatusForField(sut, 'email', validationError);
    Helpers.testStatusForField(sut, 'password', validationError);
    Helpers.testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});
