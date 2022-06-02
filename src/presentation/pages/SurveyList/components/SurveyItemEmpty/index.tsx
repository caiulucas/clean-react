import React from 'react';

import styles from './styles.scss';

export function SurveyItemEmpty() {
  return (
    <>
      {[0, 1, 2, 3].map(number => (
        <li
          key={number}
          role="survey-list-empty"
          className={styles.surveyItemEmptyWrap}
        />
      ))}
    </>
  );
}
