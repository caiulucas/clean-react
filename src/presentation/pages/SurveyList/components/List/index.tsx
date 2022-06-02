import React from 'react';

import { SurveyModel } from '@domain/models';

import { Item } from '../Item';
import { ItemEmpty } from '../ItemEmpty';
import styles from './styles.scss';

type Props = {
  surveys: SurveyModel[];
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
