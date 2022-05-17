import { SetStorageSpy } from '@data/tests/mock-storage';
import { faker } from '@faker-js/faker';

import { LocalSaveAccessToken } from './local-save-access-token';

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const setStorage = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorage);
    const accessToken = faker.random.alphaNumeric();
    await sut.save(accessToken);

    expect(setStorage.key).toBe('accessToken');
    expect(setStorage.value).toBe(accessToken);
  });
});
