import { HttpPostParams } from '@data/protocols/http';
import { faker } from '@faker-js/faker';

export function mockPostRequest(): HttpPostParams<any> {
  return {
    url: faker.internet.url(),
    body: faker.helpers.objectValue({ key: 'value' }),
  };
}
