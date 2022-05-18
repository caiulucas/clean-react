import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SignUp } from '@presentation/pages/SignUp';

type Props = {
  makeLogin: React.FC;
};

export function Router({ makeLogin: MakeLogin }: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
