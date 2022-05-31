import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@main/adapters/current-account-adapter';
import { MakeLogin } from '@main/factories/pages/login/login-factory';
import { MakeSignUp } from '@main/factories/pages/signup/signup-factory';
import { PrivateRoute } from '@presentation/components';
import { ApiProvider } from '@presentation/hooks/useApi';
import { SurveyList } from '@presentation/pages/SurveyList';

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
                <SurveyList />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}
