import { createContext, ReactNode, useContext } from 'react';

import { AccountModel } from '@domain/models';

export type StateProps = {
  setCurrentAccount(account: AccountModel): void;
};

type Props = {
  children: ReactNode;
  value?: StateProps;
};

const ApiContext = createContext<StateProps>(null);

export function ApiProvider({ children, value }: Props) {
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  return useContext(ApiContext);
}
