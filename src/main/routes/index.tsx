import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@main/adapters/current-account-adapter';
import { MakeLogin, MakeSignUp, MakeSurveyList } from '@main/factories/pages';
import { PrivateRoute } from '@presentation/components';
import { ApiProvider } from '@presentation/hooks/useApi';

export function Router() {
  return (
    <ApiProvider
      value={{
        getCurrentAccount: getCurrentAccountAdapter,
        setCurrentAccount: setCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/signup" element={<MakeSignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MakeSurveyList />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}
