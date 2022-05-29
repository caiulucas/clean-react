import { useForm } from '@presentation/hooks/useForm';

import { Spinner } from '../Spinner';
import styles from './styles.scss';

export function FormStatus() {
  const { isLoading, mainError } = useForm();

  return (
    <div data-testid="formStatus" className={styles.formStatusWrap}>
      {isLoading && <Spinner className={styles.spinner} />}
      {mainError && <span data-testid="mainError">{mainError}</span>}
    </div>
  );
}
