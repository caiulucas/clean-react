import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@presentation/components';
import { FormProvider } from '@presentation/hooks/useForm';
import { Validation } from '@presentation/protocols/validation';

import styles from './styles.scss';

type Props = {
  validation: Validation;
};

export function Login({ validation }: Props) {
  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormProvider validation={validation}>
        <form>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button type="submit" disabled>
            Entrar
          </button>
          <span className={styles.link}>Usuário novo? Crie uma conta</span>

          <FormStatus />
        </form>
      </FormProvider>

      <Footer />
    </div>
  );
}
