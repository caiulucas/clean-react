import { createContext, ReactNode, useContext } from 'react';

type StateProps = {
  isLoading: boolean;
  isFormInvalid: boolean;
  mainError: string;
  inputErrors: {
    email: string;
    password: string;
  };
  changeFields(fields: object): void;
  onSubmit(): Promise<void>;
};

type Props = {
  children: ReactNode;
  value: StateProps;
};

const FormContext = createContext<StateProps>(null);

export function FormProvider({ children, value }: Props) {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useForm() {
  return useContext(FormContext);
}
