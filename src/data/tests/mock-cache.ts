import { GetStorage } from '@data/protocols/cache';
import faker from '@faker-js/faker';

export class GetStorageSpy implements GetStorage {
  key: string;
  value = {
    [faker.database.column()]: faker.random.words(),
    [faker.database.column()]: faker.random.words(),
    [faker.database.column()]: faker.random.words(),
  };

  get(key: string): any {
    this.key = key;
    return this.value;
  }
}
