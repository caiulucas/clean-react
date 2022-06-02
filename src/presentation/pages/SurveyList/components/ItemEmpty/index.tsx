import React from 'react';

import styles from './styles.scss';

export function ItemEmpty() {
  return (
    <>
      {[0, 1, 2, 3].map(number => (
        <li
          key={number}
          role="survey-item-empty"
          className={styles.itemEmptyWrap}
        />
      ))}
    </>
  );
}