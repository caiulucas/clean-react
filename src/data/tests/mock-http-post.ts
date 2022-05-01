import { faker } from '@faker-js/faker';

import { HttpPostParams } from '@data/protocols/http';

export function mockPostRequest(): HttpPostParams<any> {
  return {
    url: faker.internet.url(),
    body: faker.random.objectElement({ key: 'value' }),
  };
}
