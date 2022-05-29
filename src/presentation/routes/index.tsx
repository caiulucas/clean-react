import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SurveyList } from '@presentation/pages/SurveyList';

type Factory = {
  makeLogin: React.FC;
  makeSingUp: React.FC;
};

export function Router({
  makeLogin: MakeLogin,
  makeSingUp: MakeSignUp,
}: Factory) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
        <Route path="/signup" element={<MakeSignUp />} />
        <Route path="/" element={<SurveyList />} />
      </Routes>
    </BrowserRouter>
  );
}
