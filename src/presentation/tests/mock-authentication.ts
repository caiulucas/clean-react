import { AccountModel } from '@domain/models';
import { mockAccountModel } from '@domain/tests';
import { Authentication, AuthenticationParams } from '@domain/usecases';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  callsCount = 0;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
