import { UnexpectedError } from '@domain/errors';
import { AccountModel } from '@domain/models';
import { makeLocalStorageAdapter } from '@main/factories/cache/local-storage-adapter-factory';

export function setCurrentAccountAdapter(account: AccountModel): void {
  if (!account?.accessToken) throw new UnexpectedError();

  makeLocalStorageAdapter().set('account', account);
}

export function getCurrentAccountAdapter(): AccountModel {
  return makeLocalStorageAdapter().get('account');
}
