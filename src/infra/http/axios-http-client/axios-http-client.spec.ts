import { faker } from '@faker-js/faker';
import axios from 'axios';

import { HttpPostParams } from '@data/protocols/http';

import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
  test('Should call axios with correct URL and verb', async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
});
