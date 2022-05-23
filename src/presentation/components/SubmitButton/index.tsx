// import styles from './styles.scss';

type Props = {
  disabled?: boolean;
};

export function SubmitButton({ disabled = false }: Props) {
  return (
    <button type="submit" disabled={disabled}>
      Entrar
    </button>
  );
}
