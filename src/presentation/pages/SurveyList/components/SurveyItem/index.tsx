import React from 'react';

import { Icon } from '@presentation/components';

import styles from './styles.scss';

export function SurveyItem() {
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon iconName="thumbUp" className={styles.iconWrap} />
        <time>
          <span className={styles.day}>28</span>
          <span className={styles.month}>05</span>
          <span className={styles.year}>2022</span>
        </time>
        <p>Qual o seu framework web favorito?</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
}
