import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AddAccount } from '@domain/usecases';
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
  addAccount: AddAccount;
};

export function SignUp({ validation, addAccount }: Props) {
  const { setCurrentAccount } = useApi();

  const [isLoading, setIsLoading] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [mainError, setMainError] = useState('');
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [inputErrors, setInputErrors] = useState({
    name: 'Campo obrigatório',
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    passwordConfirmation: 'Campo obrigatório',
  });

  useEffect(() => {
    const nameError = validation.validate('name', fields);
    const emailError = validation.validate('email', fields);
    const passwordError = validation.validate('password', fields);
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      fields,
    );
    setIsFormInvalid(
      !!nameError ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmationError,
    );
    setInputErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      passwordConfirmation: passwordConfirmationError,
    });
  }, [fields, validation]);

  function changeFields(fields: object) {
    setFields(oldState => ({ ...oldState, ...fields }));
  }

  const onSubmit = useCallback(async () => {
    try {
      if (isLoading || isFormInvalid) return;

      setIsLoading(true);

      const account = await addAccount.add({
        name: fields.name,
        email: fields.email,
        password: fields.password,
        passwordConfirmation: fields.passwordConfirmation,
      });

      setCurrentAccount(account);
    } catch (err) {
      setIsLoading(false);
      setMainError(err.message);
      throw err;
    }
  }, [isLoading, isFormInvalid, addAccount, fields, setCurrentAccount]);

  return (
    <div className={styles.signupWrap}>
      <LoginHeader />

      <FormProvider
        value={{
          isLoading,
          isFormInvalid,
          inputErrors,
          mainError,
          changeFields,
          onSubmit,
        }}
      >
        <Form>
          <h2>Cadastro</h2>
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
          <SubmitButton title="Cadastrar" />

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
