import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import { Authentication } from '@domain/usecases';
import { SaveAccessToken } from '@domain/usecases/save-access-token';
import { Validation } from '@presentation/protocols/validation';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
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

export function FormProvider({
  children,
  validation,
  authentication,
  saveAccessToken,
}: Props) {
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

      const account = await authentication.auth(fields);

      await saveAccessToken.save(account.access_token);
    } catch (error) {
      setIsLoading(false);
      setMainError(error.message);
      throw error;
    }
  }, [isLoading, inputErrors, authentication, fields, saveAccessToken]);

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
