import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { mockAccountModel } from '@domain/tests';
import { ApiProvider } from '@presentation/hooks/useApi';
import { render } from '@testing-library/react';

import { PrivateRoute } from '.';

type SutTypes = {
  history: MemoryHistory;
};

function makeSut(account = mockAccountModel()): SutTypes {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  render(
    <ApiProvider value={{ getCurrentAccount: () => account }}>
      <Router location={history.location} navigator={history}>
        <PrivateRoute>
          <div />
        </PrivateRoute>
      </Router>
    </ApiProvider>,
  );

  return { history };
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut(null);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should render current component if token is not empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/');
  });
});
