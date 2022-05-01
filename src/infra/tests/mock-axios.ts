import { faker } from '@faker-js/faker';
import axios, { AxiosStatic } from 'axios';

export function mockAxios() {
  const mockedAxios = axios as jest.Mocked<AxiosStatic>;

  mockedAxios.post.mockResolvedValue({
    data: faker.random.objectElement({ key: faker.company.companyName() }),
    status: faker.datatype.number(),
  });

  return mockedAxios;
}
