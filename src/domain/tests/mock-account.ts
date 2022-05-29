import faker from '@faker-js/faker';

import { AccountModel } from '../models';
import { AuthenticationParams } from '../usecases/authentication';

export function mockAuthentication(): AuthenticationParams {
  return { email: faker.internet.email(), password: faker.internet.password() };
}

export function mockAccountModel(): AccountModel {
  return { name: faker.name.findName(), accessToken: faker.datatype.uuid() };
}
