import React from 'react';

import styles from './styles.scss';

export function SurveyItemEmpty() {
  return (
    <>
      <li className={styles.surveyItemEmptyWrap} />
      <li className={styles.surveyItemEmptyWrap} />
      <li className={styles.surveyItemEmptyWrap} />
      <li className={styles.surveyItemEmptyWrap} />
    </>
  );
}
