import React from 'react';

import styles from './styles.scss';

type Props = React.DOMAttributes<HTMLButtonElement> & {
  error: string;
};

export function Error({ error, ...rest }: Props) {
  return (
    <div className={styles.errorWrap}>
      <span role="error">{error}</span>
      <button {...rest}>Recarregar</button>
    </div>
  );
}
