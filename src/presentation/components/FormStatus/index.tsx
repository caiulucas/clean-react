import { useForm } from '@presentation/hooks/useForm';

import { Spinner } from '../Spinner';
import styles from './styles.scss';

export function FormStatus() {
  const { isLoading, errorMessage } = useForm();

  return (
    <div data-testid="formStatus" className={styles.formStatus}>
      {isLoading && <Spinner className={styles.spinner} />}
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
}
