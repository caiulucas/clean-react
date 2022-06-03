import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AccessDeniedError } from '@domain/errors';
import { LoadSurveyList } from '@domain/usecases/load-survey-list';
import { Footer, Header } from '@presentation/components';
import { useApi } from '@presentation/hooks/useApi';

import { List } from './components';
import { Error } from './components/Error';
import styles from './styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

export function SurveyList({ loadSurveyList }: Props) {
  const { setCurrentAccount } = useApi();
  const navigate = useNavigate();

  const [surveys, setSurveys] = useState<LoadSurveyList.Model[]>();
  const [error, setError] = useState('');
  const [reload, setReload] = useState(false);

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then(surveys => setSurveys(surveys))
      .catch(err => {
        if (err instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          return navigate('/login', { replace: true });
        }

        setError(err.message);
      });
  }, [loadSurveyList, navigate, reload, setCurrentAccount]);

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
