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
    <div
      data-testid={`${props.name}Wrap`}
      className={styles.inputWrap}
      data-status={inputErrors[props.name] ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        data-testid={props.name}
        placeholder=" "
        title={inputErrors[props.name]}
        onChange={handleChange}
        ref={inputRef}
      />
      <label
        data-testid={`${props.name}Label`}
        title={inputErrors[props.name]}
        onClick={() => inputRef.current.focus()}
      >
        {props.placeholder}
      </label>
    </div>
  );
}
