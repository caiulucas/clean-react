import { LoadSurveyList } from '@domain/usecases/load-survey-list';
import faker from '@faker-js/faker';

export function mockSurveyModel(): LoadSurveyList.Model {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(),
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent(),
  };
}

export function mockSurveyListModel(): LoadSurveyList.Model[] {
  return [mockSurveyModel(), mockSurveyModel(), mockSurveyModel()];
}
