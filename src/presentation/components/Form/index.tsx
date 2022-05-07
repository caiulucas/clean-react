import { useNavigate } from 'react-router-dom';

import { useForm } from '@presentation/hooks/useForm';

import styles from './styles.scss';

type Props = {
  children: React.ReactNode;
};

export function Form({ children }: Props) {
  const { onSubmit } = useForm();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit();
    navigate('/', { replace: true });
  }

  return (
    <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
