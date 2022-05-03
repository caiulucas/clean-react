import axios, { AxiosStatic } from 'axios';

import { faker } from '@faker-js/faker';

export function mockAxios() {
  const mockedAxios = axios as jest.Mocked<AxiosStatic>;

  mockedAxios.post.mockResolvedValue({
    data: faker.helpers.objectValue({ key: faker.company.companyName() }),
    status: faker.datatype.number(),
  });

  return mockedAxios;
}
