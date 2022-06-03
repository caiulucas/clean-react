import React from 'react';

import { LoadSurveyList } from '@domain/usecases/load-survey-list';
import { Icon } from '@presentation/components';

import styles from './styles.scss';

type Props = {
  survey: LoadSurveyList.Model;
};

export function Item({ survey }: Props) {
  return (
    <li className={styles.itemWrap} role="survey-item">
      <div className={styles.surveyContent}>
        <Icon
          iconName={survey.didAnswer ? 'thumbUp' : 'thumbDown'}
          className={styles.iconWrap}
        />
        <time>
          <span role="day" className={styles.day}>
            {survey.date.getDate().toString().padStart(2, '0')}
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
