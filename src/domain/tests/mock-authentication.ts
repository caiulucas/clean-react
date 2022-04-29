import { faker } from '@faker-js/faker';

import { AuthenticationParams } from '../usecases/authentication';

export function mockAuthentication(): AuthenticationParams {
  return { email: faker.internet.email(), password: faker.internet.password() };
}
