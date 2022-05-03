import { Spinner } from '../Spinner';
import styles from './styles.scss';

export function FormStatus() {
  return (
    <div className={styles.formStatus}>
      <Spinner className={styles.spinner} />
      <span>Error</span>
    </div>
  );
}
