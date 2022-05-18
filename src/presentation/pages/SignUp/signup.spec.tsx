import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { faker } from '@faker-js/faker';
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

function testStatusForField(
  sut: RenderResult,
  elementId: string,
  validationError?: string,
) {
  const status = sut.getByTestId(`${elementId}Status`);
  expect(status.title).toBe(validationError || 'Tudo certo!');
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢');
}

function testChildCount(sut: RenderResult, elementId: string, count: number) {
  const element = sut.getByTestId(elementId);
  expect(element.childElementCount).toBe(count);
}

describe('SignUp Page', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut();

    const validationError = 'Campo obrigatório';

    testChildCount(sut, 'formStatus', 0);

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    testStatusForField(sut, 'name', validationError);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
    testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});
