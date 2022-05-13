import ReactDOM from 'react-dom/client';

import { Router } from '@presentation/routes';

import '@presentation/styles/global.scss';
import { MakeLogin } from './factories/pages/login/login-factory';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router makeLogin={MakeLogin} />,
);
