import { RemoteLoadSurveyList } from '@data/usecases/load-survey-list/remote-load-survey-list';
import { LoadSurveyList } from '@domain/usecases/load-survey-list';
import { makeApiUrl } from '@main/factories/http/api-url-factory';
import { makeAxiosHttpClient } from '@main/factories/http/axios-http-client-factory';

export function makeRemoteLoadSurveyList(): LoadSurveyList {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAxiosHttpClient(),
  );
}