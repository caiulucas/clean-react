import { UnexpectedError } from '@domain/errors';
import { AccountModel } from '@domain/models';
import { makeLocalStorageAdapter } from '@main/factories/cache/local-storage-adapter-factory';

export function setCurrentAccountAdapter(account: AccountModel) {
  if (!account?.accessToken) throw new UnexpectedError();

  makeLocalStorageAdapter().set('account', account);
}
