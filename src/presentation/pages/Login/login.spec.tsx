import { render, RenderResult } from '@testing-library/react';

import { Login } from '.';

type SutTypes = {
  sut: RenderResult;
};

function makeSut(): SutTypes {
  return { sut: render(<Login />) };
}

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
});
