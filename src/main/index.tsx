import ReactDOM from 'react-dom/client';

import { Router } from '@presentation/routes';

import '@presentation/styles/global.scss';
import { MakeLogin } from './factories/pages/login/login-factory';
import { MakeSignUp } from './factories/pages/signup/signup-factory';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router makeLogin={MakeLogin} makeSingUp={MakeSignUp} />,
);
