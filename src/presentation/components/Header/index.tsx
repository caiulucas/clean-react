import { memo } from 'react';

import { Logo } from '../Logo';
import styles from './styles.scss';

function HeaderBase() {
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />

        <div>
          <span>Caio Lucas</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderBase);
