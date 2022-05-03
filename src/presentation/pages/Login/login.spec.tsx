import { render } from '@testing-library/react';

import { Login } from '.';

describe('Login Page', () => {
  test('Should start with initial state', () => {
    const { getByTestId, getByText } = render(<Login />);
    const formStatus = getByTestId('formStatus');

    expect(formStatus.childElementCount).toBe(0);

    const submitButton = getByText('Entrar') as HTMLButtonElement;

    expect(submitButton.disabled).toBeTruthy();
  });
});
