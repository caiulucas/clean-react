import { UnexpectedError } from '@domain/errors';
import { mockAccountModel } from '@domain/tests';
import { LocalStorageAdapter } from '@infra/cache/local-storage-adapter';

import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from './current-account-adapter';

jest.mock('@infra/cache/local-storage-adapter');

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter setting correct values', () => {
    const account = mockAccountModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');

    setCurrentAccountAdapter(account);
    expect(setSpy).toHaveBeenCalledWith('account', account);
  });

  test('Should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined);
    }).toThrowError(UnexpectedError);
  });

  test('Should call LocalStorageAdapter getting correct values', () => {
    const account = mockAccountModel();
    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account);

    const result = getCurrentAccountAdapter();

    expect(getSpy).toHaveBeenCalledWith('account');
    expect(result).toEqual(account);
  });
});
