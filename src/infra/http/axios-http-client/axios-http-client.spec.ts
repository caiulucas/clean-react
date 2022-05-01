import { mockAxios } from '@infra/tests';
import { AxiosStatic } from 'axios';

import { mockPostRequest } from '@data/tests';

import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<AxiosStatic>;
};

function makeSut(): SutTypes {
  return { sut: new AxiosHttpClient(), mockedAxios: mockAxios() };
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
