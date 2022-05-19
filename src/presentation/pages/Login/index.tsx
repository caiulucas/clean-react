import { useCallback, useEffect, useState } from 'react';
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
import { Validation } from '@presentation/protocols/validation';

import styles from './styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
};

export function Login({ validation, authentication, saveAccessToken }: Props) {
  const [isLoading, setIsLoading] = useState(false);
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
    setInputErrors(oldState => ({
      ...oldState,
      email: validation.validate('email', fields.email),
    }));
  }, [fields.email, validation]);

  useEffect(() => {
    setInputErrors(oldState => ({
      ...oldState,
      password: validation.validate('password', fields.password),
    }));
  }, [fields.password, validation]);

  function changeFields(fields: object) {
    setFields(oldState => ({ ...oldState, ...fields }));
  }

  const onSubmit = useCallback(async () => {
    try {
      if (isLoading || inputErrors.email || inputErrors.password) return;
      setIsLoading(true);

      const account = await authentication.auth({
        email: fields.email,
        password: fields.password,
      });

      await saveAccessToken.save(account.access_token);
    } catch (error) {
      setIsLoading(false);
      setMainError(error.message);
      throw error;
    }
  }, [isLoading, inputErrors, authentication, fields, saveAccessToken]);

  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormProvider
        value={{
          isLoading,
          fields,
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
          <SubmitButton />

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
