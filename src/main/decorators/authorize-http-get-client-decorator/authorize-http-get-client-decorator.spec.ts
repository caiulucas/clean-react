import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@data/tests';
import { mockAccountModel } from '@domain/tests';
import faker from '@faker-js/faker';

import { AuthorizeHttpGetClientDecorator } from './authorize-http-get-client-decorator';

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator;
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy;
};

function makeSut(): SutTypes {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();

  const sut = new AuthorizeHttpGetClientDecorator(
    getStorageSpy,
    httpGetClientSpy,
  );

  return { sut, getStorageSpy, httpGetClientSpy };
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut();
    await sut.get(mockGetRequest());

    expect(getStorageSpy.key).toBe('account');
  });

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpRequest = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words(),
      },
    };

    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
  });

  test('Should add headers to HttpGetClient', async () => {
    const { sut, getStorageSpy, httpGetClientSpy } = makeSut();
    getStorageSpy.value = mockAccountModel();

    const httpRequest = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words(),
      },
    };

    await sut.get(httpRequest);
    expect(httpGetClientSpy.url).toBe(httpRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });
});
