import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { ApiProvider } from '@presentation/hooks/useApi';
import { fireEvent, render, screen } from '@testing-library/react';

import { Header } from '.';

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', async () => {
    const setCurrentAccountMock = jest.fn();
    const history = createMemoryHistory({ initialEntries: ['/'] });

    render(
      <ApiProvider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </ApiProvider>,
    );

    fireEvent.click(await screen.findByRole('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});
