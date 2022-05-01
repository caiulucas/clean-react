import { faker } from '@faker-js/faker';
import axios from 'axios';

import { HttpPostParams } from '@data/protocols/http';

import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedAxiosResult = {
  data: faker.random.objectElement({ key: faker.company.companyName() }),
  status: faker.datatype.number(),
};

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

function makeSut(): AxiosHttpClient {
  return new AxiosHttpClient();
}

function mockPostRequest(): HttpPostParams<any> {
  return {
    url: faker.internet.url(),
    body: faker.random.objectElement({ key: 'value' }),
  };
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct statusCode and body', async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});
