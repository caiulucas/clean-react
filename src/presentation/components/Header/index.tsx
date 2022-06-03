import { memo } from 'react';

import { useApi } from '@presentation/hooks/useApi';

import { Logo } from '../Logo';
import styles from './styles.scss';

function HeaderBase() {
  const { getCurrentAccount } = useApi();

  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />

        <div>
          <span>{getCurrentAccount().name}</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderBase);
