import { makeRemoteLoadSurveyList } from '@main/factories/usecases/load-survey-list/remote-load-survey-list-factory';
import { SurveyList } from '@presentation/pages';

export function MakeSurveyList() {
  return <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />;
}
