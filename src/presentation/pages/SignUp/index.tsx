import { useCallback, useEffect, useState } from 'react';

import { AddAccount } from '@domain/usecases';
import {
  Footer,
  Form,
  FormStatus,
  Input,
  LoginHeader,
  SubmitButton,
} from '@presentation/components';
import { FormProvider } from '@presentation/hooks/useForm';
import { Validation } from '@presentation/protocols/validation';

import styles from './styles.scss';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
};

export function SignUp({ validation, addAccount }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [mainError] = useState('');
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

  const validate = useCallback(
    (fieldName: string) => {
      setInputErrors(oldState => ({
        ...oldState,
        [fieldName]: validation?.validate(fieldName, fields[fieldName]),
      }));
    },
    [fields, validation],
  );

  useEffect(() => validate('name'), [validate]);
  useEffect(() => validate('email'), [validate]);
  useEffect(() => validate('password'), [validate]);
  useEffect(() => validate('passwordConfirmation'), [validate]);

  function changeFields(fields: object) {
    setFields(oldState => ({ ...oldState, ...fields }));
  }

  const onSubmit = useCallback(async () => {
    try {
      if (isLoading) return;

      setIsLoading(true);

      await addAccount.add({
        name: fields.name,
        email: fields.email,
        password: fields.password,
        passwordConfirmation: fields.passwordConfirmation,
      });
    } catch (err) {
      setIsLoading(false);
    }
  }, [addAccount, fields, isLoading]);

  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormProvider
        value={{ isLoading, inputErrors, mainError, changeFields, onSubmit }}
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
          <SubmitButton
            disabled={
              !!inputErrors.name ||
              !!inputErrors.email ||
              !!inputErrors.password ||
              !!inputErrors.passwordConfirmation
            }
          />

          <span className={styles.link}>Voltar para o login</span>

          <FormStatus />
        </Form>
      </FormProvider>

      <Footer />
    </div>
  );
}
