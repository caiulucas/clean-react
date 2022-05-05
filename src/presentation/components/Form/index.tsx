import { useForm } from '@presentation/hooks/useForm';

import styles from './styles.scss';

type Props = {
  children: React.ReactNode;
};

export function Form({ children }: Props) {
  const { onSubmit } = useForm();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit();
  }

  return (
    <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
