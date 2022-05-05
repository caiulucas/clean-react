// import styles from './styles.scss';

import { useForm } from '@presentation/hooks/useForm';

export function SubmitButton() {
  const { inputErrors } = useForm();

  return (
    <button
      type="submit"
      disabled={!!inputErrors.email || !!inputErrors.password}
    >
      Entrar
    </button>
  );
}
