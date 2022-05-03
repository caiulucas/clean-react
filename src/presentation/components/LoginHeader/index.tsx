import { memo } from 'react';

import { Logo } from '../Logo';
import styles from './styles.scss';

function LoginHeaderBase() {
  return (
    <header className={styles.loginHeader}>
      <Logo />
      <h1>Caiulucas - Enquete para programadores</h1>
    </header>
  );
}

export const LoginHeader = memo(LoginHeaderBase);
