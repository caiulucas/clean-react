import faker from '@faker-js/faker';

import { SurveyModel } from '../models';

export function mockSurveyListModel(): SurveyModel[] {
  return [
    {
      id: faker.datatype.uuid(),
      question: faker.random.words(),
      answers: [
        {
          answer: faker.random.words(),
          image: faker.internet.url(),
        },
      ],
      didAnswer: faker.datatype.boolean(),
      date: faker.date.recent(),
    },
  ];
}