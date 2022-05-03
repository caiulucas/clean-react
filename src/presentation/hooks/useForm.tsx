import { useState, createContext, ReactNode, useContext } from 'react';

type Props = {
  children: ReactNode;
};

type StateProps = {
  isLoading: boolean;
  mainError: string;
  inputErrors: {
    email: string;
    password: string;
  };
};

const FormContext = createContext<StateProps>(null);

export function FormProvider({ children }: Props) {
  const [isLoading] = useState(false);
  const [mainError] = useState('');
  const [inputErrors] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
  });

  return (
    <FormContext.Provider value={{ isLoading, mainError, inputErrors }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  return useContext(FormContext);
}
