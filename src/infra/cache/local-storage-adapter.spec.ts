import 'jest-localstorage-mock';

import faker from '@faker-js/faker';

import { LocalStorageAdapter } from './local-storage-adapter';

describe('LocalStorageAdapter', () => {
  test('Should call localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter();
    const key = faker.database.column();
    const value = {
      name: faker.name.findName(),
      accessToken: faker.random.alphaNumeric(),
    };

    sut.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value),
    );
  });
});
