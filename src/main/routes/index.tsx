import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { MakeLogin } from '@main/factories/pages/login/login-factory';
import { MakeSignUp } from '@main/factories/pages/signup/signup-factory';
import { ApiProvider } from '@presentation/hooks/useApi';
import { SurveyList } from '@presentation/pages/SurveyList';

export function Router() {
  return (
    <ApiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/signup" element={<MakeSignUp />} />
          <Route path="/" element={<SurveyList />} />
        </Routes>
      </BrowserRouter>
    </ApiProvider>
  );
}
