import { faker } from '@faker-js/faker';

import { AccountModel } from '../models/account-model';
import { AuthenticationParams } from '../usecases/authentication';

export function mockAuthentication(): AuthenticationParams {
  return { email: faker.internet.email(), password: faker.internet.password() };
}

export function mockAccountModel(): AccountModel {
  return { access_token: faker.random.alphaNumeric() };
}
