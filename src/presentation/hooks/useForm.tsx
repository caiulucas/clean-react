import { useState, createContext, ReactNode, useContext } from 'react';

type Props = {
  children: ReactNode;
};

type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

const FormContext = createContext<StateProps>(null);

export function FormProvider({ children }: Props) {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
  });

  return <FormContext.Provider value={state}>{children}</FormContext.Provider>;
}

export function useForm() {
  return useContext(FormContext);
}
