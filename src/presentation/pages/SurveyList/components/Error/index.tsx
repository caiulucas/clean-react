import React from 'react';

import styles from './styles.scss';

type Props = {
  error: string;
};

export function Error({ error }: Props) {
  return (
    <div className={styles.errorWrap}>
      <span role="error">{error}</span>
      <button>Recarregar</button>
    </div>
  );
}
