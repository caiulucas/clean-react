import { render } from '@testing-library/react';

import { Login } from '.';

describe('Login Page', () => {
  test('Should not render children in FormStatus on start', () => {
    const { getByTestId } = render(<Login />);
    const FormStatus = getByTestId('formStatus');

    expect(FormStatus.childElementCount).toBe(0);
  });
});
