import React from 'react';
import { Navigate } from 'react-router-dom';

import { useApi } from '@presentation/hooks/useApi';

type Props = {
  children: React.ReactElement;
};

export const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { getCurrentAccount } = useApi();

  const token = getCurrentAccount()?.accessToken;

  return token ? children : <Navigate to="/login" replace />;
};
