import axios, { AxiosStatic } from 'axios';

import faker from '@faker-js/faker';

export function mockHttpResponse() {
  return {
    data: faker.helpers.objectValue({ key: faker.company.companyName() }),
    status: faker.datatype.number(),
  };
}

export function mockAxios() {
  const mockedAxios = axios as jest.Mocked<AxiosStatic>;

  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse());
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse());

  return mockedAxios;
}
