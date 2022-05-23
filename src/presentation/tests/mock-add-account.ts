import { AccountModel } from '@domain/models';
import { mockAccountModel } from '@domain/tests';
import { AddAccount, AddAccountParams } from '@domain/usecases';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  callsCount = 0;
  params: AddAccountParams;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
