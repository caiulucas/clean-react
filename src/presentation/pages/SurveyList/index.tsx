import { useEffect, useState } from 'react';

import { SurveyModel } from '@domain/models';
import { LoadSurveyList } from '@domain/usecases/load-survey-list';
import { Footer, Header } from '@presentation/components';

import { SurveyItemEmpty } from './components';
import { SurveyItem } from './components/SurveyItem';
import styles from './styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

export function SurveyList({ loadSurveyList }: Props) {
  const [surveys, setSurveys] = useState<SurveyModel[]>();

  useEffect(() => {
    loadSurveyList.loadAll().then(surveys => setSurveys(surveys));
  }, [loadSurveyList]);

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <main>
        <h2>Enquetes</h2>
        <ul role="survey-list">
          {surveys ? (
            surveys.map(survey => (
              <SurveyItem key={survey.id} survey={survey} />
            ))
          ) : (
            <SurveyItemEmpty />
          )}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
