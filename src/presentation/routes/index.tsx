import { BrowserRouter, Routes, Route } from 'react-router-dom';

type Props = {
  makeLogin: React.FC;
};

export function Router({ makeLogin: MakeLogin }: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
