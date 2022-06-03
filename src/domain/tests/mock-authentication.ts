import faker from '@faker-js/faker';

import { AccountModel } from '../models';
import { Authentication } from '../usecases/authentication';
import { mockAccountModel } from './mock-account';

export function mockAuthentication(): Authentication.Params {
  return { email: faker.internet.email(), password: faker.internet.password() };
}

export function mockAuthenticationModel(): AccountModel {
  return mockAccountModel();
}

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: Authentication.Params;
  callsCount = 0;

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
