import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

import { Validation } from '@presentation/protocols/validation';

type Props = {
  validation: Validation;
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
  onSubmit(): void;
};

const FormContext = createContext<StateProps>(null);

export function FormProvider({ children, validation }: Props) {
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

  function onSubmit() {
    setIsLoading(true);
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
