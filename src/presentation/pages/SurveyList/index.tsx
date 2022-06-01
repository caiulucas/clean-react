import { useEffect } from 'react';

import { LoadSurveyList } from '@domain/usecases/load-survey-list';
import { Footer, Header } from '@presentation/components';

import { SurveyItemEmpty } from './components';
// import { SurveyItem } from './components/SurveyItem';
import styles from './styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

export function SurveyList({ loadSurveyList }: Props) {
  useEffect(() => {
    async function load() {
      await loadSurveyList.loadAll();
    }

    load();
  }, [loadSurveyList]);

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
