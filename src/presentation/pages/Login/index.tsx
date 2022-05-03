import { Footer } from '@presentation/components/Footer';
import { FormStatus } from '@presentation/components/FormStatus';
import { Input } from '@presentation/components/Input';
import { LoginHeader } from '@presentation/components/LoginHeader';

import styles from './styles.scss';

export function Login() {
  return (
    <div className={styles.login}>
      <LoginHeader />

      <form>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu email" />
        <Input type="password" name="password" placeholder="Digite sua senha" />

        <button type="submit">Entrar</button>
        <span className={styles.link}>Usuário novo? Crie uma conta</span>

        <FormStatus />
      </form>

      <Footer />
    </div>
  );
}
