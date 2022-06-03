import faker from '@faker-js/faker';

import { AccountModel } from '../models';

export function mockAccountModel(): AccountModel {
  return { name: faker.name.findName(), accessToken: faker.datatype.uuid() };
}
