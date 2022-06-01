import React from 'react';

import { Footer, Header } from '@presentation/components';

import { SurveyItemEmpty } from './components';
// import { SurveyItem } from './components/SurveyItem';
import styles from './styles.scss';

export function SurveyList() {
  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <main>
        <h2>Enquetes</h2>
        <ul role="survey-list">
          <SurveyItemEmpty />
        </ul>
      </main>

      <Footer />
    </div>
  );
}
