import { BrowserRouter, Routes, Route } from 'react-router-dom';

type Factory = {
  makeLogin: React.FC;
  makeSingUp;
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
      </Routes>
    </BrowserRouter>
  );
}
