import { Link } from 'react-router-dom';

import { Authentication } from '@domain/usecases';
import { SaveAccessToken } from '@domain/usecases/save-access-token';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton,
  Form,
} from '@presentation/components';
import { FormProvider } from '@presentation/hooks/useForm';

import styles from './styles.scss';

export function SignUp() {
  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormProvider {...props}>
        <Form>
          <h2>Login</h2>
          <Input type="text" name="name " placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <SubmitButton />

          <Link to="/login" className={styles.link}>
            Voltar para o login
          </Link>

          <FormStatus />
        </Form>
      </FormProvider>

      <Footer />
    </div>
  );
}
