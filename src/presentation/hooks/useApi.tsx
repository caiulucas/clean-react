import { createContext, ReactNode, useContext } from 'react';

import { UnexpectedError } from '@domain/errors';
import { AccountModel } from '@domain/models';
import { makeLocalStorageAdapter } from '@main/factories/cache/local-storage-adapter-factory';

export type StateProps = {
  setCurrentAccount(account: AccountModel): void;
};

type Props = {
  children: ReactNode;
  value?: StateProps;
};

const ApiContext = createContext<StateProps>(null);

export function ApiProvider({ children, value }: Props) {
  function setCurrentAccount(account: AccountModel) {
    if (!account?.accessToken) throw new UnexpectedError();

    makeLocalStorageAdapter().set('account', account);
  }

  return (
    <ApiContext.Provider value={{ setCurrentAccount, ...value }}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}
