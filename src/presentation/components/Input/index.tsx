import { useRef } from 'react';

import { useForm } from '@presentation/hooks/useForm';

import styles from './styles.scss';

type Props = React.FormHTMLAttributes<HTMLInputElement> & {
  type?: string;
  name: string;
  placeholder?: string;
};

export function Input(props: Props) {
  const { inputErrors, changeFields } = useForm();
  const inputRef = useRef<HTMLInputElement>();

  function handleChange(event: React.FocusEvent<HTMLInputElement>): void {
    changeFields({ [event.target.name]: event.target.value });
  }

  return (
    <div className={styles.inputWrap}>
      <input
        data-testid={props.name}
        {...props}
        placeholder=" "
        onChange={handleChange}
        ref={inputRef}
      />
      <label onClick={() => inputRef.current.focus()}>
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}Status`}
        title={inputErrors[props.name] || 'Tudo certo!'}
      >
        {inputErrors[props.name] ? '🔴' : '🟢'}
      </span>
    </div>
  );
}
