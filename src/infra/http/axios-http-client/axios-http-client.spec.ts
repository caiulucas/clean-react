import { AxiosStatic } from 'axios';

import { mockGetRequest, mockPostRequest } from '@data/tests';
import { mockAxios, mockHttpResponse } from '@infra/tests';

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
  describe('Post', () => {
    test('Should post with correct values', async () => {
      const request = mockPostRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.post(request);

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    test('Should return correct response on post', async () => {
      const { sut, mockedAxios } = makeSut();

      const httpResponse = await sut.post(mockPostRequest());
      const axiosResponse = await mockedAxios.post.mock.results[0].value;

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });

    test('Should return correct error on post', async () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse(),
      });

      const promise = sut.post(mockPostRequest());

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });

  describe('Get', () => {
    test('Should get with correct values', async () => {
      const request = mockGetRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.get(request);

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url);
    });

    test('Should return correct response on get', async () => {
      const { sut, mockedAxios } = makeSut();
      const httpResponse = await sut.get(mockGetRequest());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;

      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });
  });
});
