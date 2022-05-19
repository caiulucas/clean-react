import { useCallback, useEffect, useState } from 'react';

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
};

export function SignUp({ validation }: Props) {
  const [isLoading] = useState(false);
  const [mainError] = useState('');
  const [fields, setFields] = useState({
    name: '',
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

  function changeFields(fields: object) {
    setFields(oldState => ({ ...oldState, ...fields }));
  }

  return (
    <div className={styles.login}>
      <LoginHeader />

      <FormProvider value={{ isLoading, inputErrors, mainError, changeFields }}>
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
