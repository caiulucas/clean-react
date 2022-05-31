import 'jest-localstorage-mock';

import faker from '@faker-js/faker';

import { LocalStorageAdapter } from './local-storage-adapter';

describe('LocalStorageAdapter', () => {
  test('Should set item on localStorage with correct values', async () => {
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

  test('Should get item on localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter();
    const key = faker.database.column();
    const value = {
      name: faker.name.findName(),
      accessToken: faker.random.alphaNumeric(),
    };

    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value));

    const obj = sut.get(key);

    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});
