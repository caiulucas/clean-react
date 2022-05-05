import { Authentication } from '@domain/usecases';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton,
  Form,
} from '@presentation/components';
import { FormProvider } from '@presentation/hooks/useForm';
import { Validation } from '@presentation/protocols/validation';

import styles from './styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

export function Login(props: Props) {
  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormProvider {...props}>
        <Form>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <SubmitButton />

          <span className={styles.link}>Usuário novo? Crie uma conta</span>

          <FormStatus />
        </Form>
      </FormProvider>

      <Footer />
    </div>
  );
}
