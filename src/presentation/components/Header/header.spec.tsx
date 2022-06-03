import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { AccountModel } from '@domain/models';
import { mockAccountModel } from '@domain/tests';
import { ApiProvider } from '@presentation/hooks/useApi';
import { fireEvent, render, screen } from '@testing-library/react';

import { Header } from '.';

type SutTypes = {
  history: MemoryHistory;
  setCurrentAccountMock(account: AccountModel): void;
};

function makeSut(account = mockAccountModel()): SutTypes {
  const setCurrentAccountMock = jest.fn();
  const history = createMemoryHistory({ initialEntries: ['/'] });

  render(
    <ApiProvider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => account,
      }}
    >
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    </ApiProvider>,
  );

  return { history, setCurrentAccountMock };
}

describe('Header Component', () => {
  test('Should call setCurrentAccount with null', async () => {
    const { history, setCurrentAccountMock } = makeSut();

    fireEvent.click(await screen.findByRole('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('Should render username correctly', async () => {
    const account = mockAccountModel();
    makeSut(account);
    expect(await screen.findByRole('username')).toHaveTextContent(account.name);
  });
});
