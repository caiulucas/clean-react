import { AddAccount } from '@domain/usecases';
import faker from '@faker-js/faker';

import { mockAccountModel } from './mock-account';

export function mockAddAccountParams(): AddAccount.Params {
  const password = faker.internet.password();

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
}

export function mockAddAccountModel(): AddAccount.Model {
  return mockAccountModel();
}

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  callsCount = 0;
  params: AddAccount.Params;

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
