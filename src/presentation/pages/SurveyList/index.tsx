import { useEffect, useState } from 'react';

import { LoadSurveyList } from '@domain/usecases/load-survey-list';
import { Footer, Header } from '@presentation/components';

import { List } from './components';
import { Error } from './components/Error';
import styles from './styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

export function SurveyList({ loadSurveyList }: Props) {
  const [surveys, setSurveys] = useState<LoadSurveyList.Model[]>();
  const [error, setError] = useState('');
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const surveys = await loadSurveyList.loadAll();
        setSurveys(surveys);
      } catch (err) {
        setError(err.message);
      } finally {
        setReload(false);
      }
    }

    load();
  }, [loadSurveyList, reload]);

  function onReload(): void {
    setSurveys([]);
    setError('');
    setReload(true);
  }

  return (
    <div className={styles.surveyListWrap}>
      <Header />
      <main>
        <h2>Enquetes</h2>
        {error ? (
          <Error error={error} onClick={onReload} />
        ) : (
          <List surveys={surveys} />
        )}
      </main>

      <Footer />
    </div>
  );
}
