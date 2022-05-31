import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { getCurrentAccountAdapter } from '@main/adapters/current-account-adapter';
import { MakeLogin } from '@main/factories/pages/login/login-factory';
import { ApiProvider } from '@presentation/hooks/useApi';
import { render } from '@testing-library/react';

import { PrivateRoute } from '.';

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });

    render(
      <ApiProvider value={{ getCurrentAccount: getCurrentAccountAdapter }}>
        <Router location={history.location} navigator={history}>
          <PrivateRoute>
            <MakeLogin />
          </PrivateRoute>
        </Router>
      </ApiProvider>,
    );

    expect(history.location.pathname).toBe('/login');
  });
});
