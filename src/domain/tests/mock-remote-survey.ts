import { RemoteLoadSurveyList } from '@data/usecases/load-survey-list/remote-load-survey-list';
import faker from '@faker-js/faker';

export function mockRemoteSurveyModel(): RemoteLoadSurveyList.Model {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(),
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent().toISOString(),
  };
}

export function mockRemoteSurveyListModel(): RemoteLoadSurveyList.Model[] {
  return [
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel(),
    mockRemoteSurveyModel(),
  ];
}
