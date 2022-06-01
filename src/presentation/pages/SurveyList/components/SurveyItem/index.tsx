import React from 'react';

import { SurveyModel } from '@domain/models';
import { Icon } from '@presentation/components';

import styles from './styles.scss';

type Props = {
  survey: SurveyModel;
};

export function SurveyItem({ survey }: Props) {
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon iconName="thumbUp" className={styles.iconWrap} />
        <time>
          <span role="day" className={styles.day}>
            {survey.date.getDate()}
          </span>
          <span role="month" className={styles.month}>
            {survey.date
              .toLocaleString('pt-BR', { month: 'short' })
              .replace('.', '')}
          </span>
          <span role="year" className={styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p role="question">{survey.question}</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
}
