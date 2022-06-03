import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useApi } from '@presentation/hooks/useApi';

import { Logo } from '../Logo';
import styles from './styles.scss';

function HeaderBase() {
  const navigate = useNavigate();

  const { setCurrentAccount } = useApi();

  function logout(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void {
    event.preventDefault();
    setCurrentAccount(undefined);
    navigate('/login', { replace: true });
  }
  return (
    <header className={styles.headerWrap}>
      <div className={styles.headerContent}>
        <Logo />

        <div>
          <span>Caio</span>
          <a role="logout" href="#" onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderBase);
