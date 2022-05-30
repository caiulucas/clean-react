import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Authentication } from '@domain/usecases';
import {
  Footer,
  Form,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton,
} from '@presentation/components';
import { useApi } from '@presentation/hooks/useApi';
import { FormProvider } from '@presentation/hooks/useForm';
import { Validation } from '@presentation/protocols/validation';

import styles from './styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

export function Login({ validation, authentication }: Props) {
  const { setCurrentAccount } = useApi();

  const [isLoading, setIsLoading] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [mainError, setMainError] = useState('');
  const [inputErrors, setInputErrors] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
  });

  useEffect(() => {
    const emailError = validation.validate('email', fields);
    const passwordError = validation.validate('password', fields);

    setIsFormInvalid(!!emailError || !!passwordError);
    setInputErrors({ email: emailError, password: passwordError });
  }, [fields, validation]);

  function changeFields(fields: object) {
    setFields(oldState => ({ ...oldState, ...fields }));
  }

  const onSubmit = useCallback(async () => {
    try {
      if (isLoading || isFormInvalid) return;
      setIsLoading(true);

      const account = await authentication.auth({
        email: fields.email,
        password: fields.password,
      });

      setCurrentAccount(account);
    } catch (error) {
      setIsLoading(false);
      setMainError(error.message);
      throw error;
    }
  }, [isLoading, isFormInvalid, authentication, fields, setCurrentAccount]);

  return (
    <div className={styles.loginWrap}>
      <LoginHeader />

      <FormProvider
        value={{
          isLoading,
          isFormInvalid,
          mainError,
          inputErrors,
          changeFields,
          onSubmit,
        }}
      >
        <Form>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <SubmitButton title="Entrar" />

          <Link to="/signup" className={styles.link}>
            Usuário novo? Crie uma conta
          </Link>

          <FormStatus />
        </Form>
      </FormProvider>

      <Footer />
    </div>
  );
}
