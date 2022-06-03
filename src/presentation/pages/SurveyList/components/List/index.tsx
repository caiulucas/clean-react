import React from 'react';

import { LoadSurveyList } from '@domain/usecases/load-survey-list';

import { Item } from '../Item';
import { ItemEmpty } from '../ItemEmpty';
import styles from './styles.scss';

type Props = {
  surveys: LoadSurveyList.Model[];
};

export function List({ surveys }: Props) {
  return (
    <ul role="survey-list" className={styles.listWrap}>
      {surveys ? (
        surveys.map(survey => <Item key={survey.id} survey={survey} />)
      ) : (
        <ItemEmpty />
      )}
    </ul>
  );
}
