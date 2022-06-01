import React from 'react';

import { Footer, Header } from '@presentation/components';

import { SurveyItem } from './components/SurveyItem';
import styles from './styles.scss';

export function SurveyList() {
  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <main>
        <h2>Enquetes</h2>
        <ul>
          <SurveyItem />
        </ul>
      </main>

      <Footer />
    </div>
  );
}
