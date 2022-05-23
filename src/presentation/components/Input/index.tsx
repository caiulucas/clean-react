import React from 'react';

import { useForm } from '@presentation/hooks/useForm';

import styles from './styles.scss';

type Props = React.FormHTMLAttributes<HTMLInputElement> & {
  type?: string;
  name: string;
};

export function Input(props: Props) {
  const { inputErrors, changeFields } = useForm();

  function handleChange(event: React.FocusEvent<HTMLInputElement>): void {
    changeFields({ [event.target.name]: event.target.value });
  }

  return (
    <div className={styles.inputWrap}>
      <input data-testid={props.name} {...props} onChange={handleChange} />
      <span
        data-testid={`${props.name}Status`}
        title={inputErrors[props.name] || 'Tudo certo!'}
      >
        {inputErrors[props.name] ? '🔴' : '🟢'}
      </span>
    </div>
  );
}
