import { useState } from 'react';

import {
  Footer,
  Form,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton,
} from '@presentation/components';
import { FormProvider } from '@presentation/hooks/useForm';

import styles from './styles.scss';

export function SignUp() {
  const [isLoading] = useState(false);
  const [mainError] = useState('');
  const [inputErrors] = useState({
    name: 'Campo obrigatório',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    passwordConfirmation: 'Campo obrigatório',
  });

  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormProvider
        authentication={null}
        validation={null}
        saveAccessToken={null}
        value={{ isLoading, inputErrors, mainError }}
      >
        <Form>
          <h2>Login</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
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

          <span className={styles.link}>Voltar para o login</span>

          <FormStatus />
        </Form>
      </FormProvider>

      <Footer />
    </div>
  );
}
