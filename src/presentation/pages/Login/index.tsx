import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@presentation/components';

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
