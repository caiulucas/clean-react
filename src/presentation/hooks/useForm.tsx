import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

import { Authentication } from '@domain/usecases';
import { Validation } from '@presentation/protocols/validation';

type Props = {
  validation: Validation;
  authentication: Authentication;
  children: ReactNode;
};

type Fields = {
  email: string;
};

type StateProps = {
  isLoading: boolean;
  mainError: string;
  inputErrors: {
    email: string;
    password: string;
  };
  fields: Fields;
  changeFields(fields: object): void;
  onSubmit(): Promise<void>;
};

const FormContext = createContext<StateProps>(null);

export function FormProvider({ children, validation, authentication }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [mainError] = useState('');
  const [inputErrors, setInputErrors] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
  });

  useEffect(() => {
    setInputErrors(oldState => ({
      ...oldState,
      email: validation.validate('email', fields.email),
    }));
  }, [fields.email]);

  useEffect(() => {
    setInputErrors(oldState => ({
      ...oldState,
      password: validation.validate('password', fields.password),
    }));
  }, [fields.password]);

  function changeFields(fields: object) {
    setFields(oldState => ({ ...oldState, ...fields }));
  }

  async function onSubmit() {
    if (isLoading || inputErrors.email || inputErrors.password) return;
    setIsLoading(true);

    authentication.auth(fields);
  }

  return (
    <FormContext.Provider
      value={{
        isLoading,
        mainError,
        inputErrors,
        fields,
        changeFields,
        onSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
