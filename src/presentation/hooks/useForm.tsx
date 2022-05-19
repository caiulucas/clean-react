import { createContext, ReactNode, useContext } from 'react';

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

type Props = {
  children: ReactNode;
  value: any;
};

const FormContext = createContext<StateProps>(null);

export function FormProvider({ children, value }: Props) {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useForm() {
  return useContext(FormContext);
}
