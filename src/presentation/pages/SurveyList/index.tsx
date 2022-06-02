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
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const surveys = await loadSurveyList.loadAll();
        setSurveys(surveys);
      } catch (err) {
        setError(err.message);
      }
    }

    load();
  }, [loadSurveyList]);

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <main>
        <h2>Enquetes</h2>
        {error ? (
          <div>
            <span role="error">{error}</span>
            <button>Recarregar</button>
          </div>
        ) : (
          <ul role="survey-list">
            {surveys ? (
              surveys.map(survey => (
                <SurveyItem key={survey.id} survey={survey} />
              ))
            ) : (
              <SurveyItemEmpty />
            )}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
