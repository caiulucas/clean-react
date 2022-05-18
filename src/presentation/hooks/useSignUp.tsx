import { createContext, ReactNode, useContext, useState } from 'react';

type Props = {
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
};

const SignUpContext = createContext<StateProps>(null);

export function SignUpProvider({ children }: Props) {
  const [isLoading] = useState(false);
  const [fields] = useState({
    email: '',
    password: '',
  });
  const [mainError] = useState('');
  const [inputErrors] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
  });

  return (
    <SignUpContext.Provider
      value={{
        isLoading,
        mainError,
        inputErrors,
        fields,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

export function useSignUp() {
  return useContext(SignUpContext);
}
