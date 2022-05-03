import { Logo } from '@presentation/components/logo';
import { Spinner } from '@presentation/components/spinner';

import styles from './styles.scss';

export function Login() {
  return (
    <div className={styles.login}>
      <header>
        <Logo />
        <h1>Caiulucas - Enquete para programadores</h1>
      </header>

      <form>
        <h2>Login</h2>
        <div className={styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu email" />
          <span>🔴</span>
        </div>
        <div className={styles.inputWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span>🔴</span>
        </div>

        <button type="submit">Entrar</button>
        <span className={styles.link}>Usuário novo? Crie uma conta</span>

        <div className={styles.errorWrap}>
          <Spinner className={styles.spinner} />
          <span>Error</span>
        </div>
      </form>

      <footer />
    </div>
  );
}
