import { useForm } from '@presentation/hooks/useForm';

import styles from './styles.scss';

type Props = {
  children: React.ReactNode;
};

export function Form({ children }: Props) {
  const { onSubmit } = useForm();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
