import { useForm } from '@presentation/hooks/useForm';

import styles from './styles.scss';

type Props = React.FormHTMLAttributes<HTMLInputElement> & {
  type: string;
};

export function Input(props: Props) {
  const { inputErrors } = useForm();

  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <span data-testid={`${props.name}Status`} title={inputErrors[props.name]}>
        🔴
      </span>
    </div>
  );
}
