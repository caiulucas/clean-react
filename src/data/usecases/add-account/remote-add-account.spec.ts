import { HttpPostClientSpy } from '@data/tests';
import { AccountModel } from '@domain/models';
import { mockAddAccountParams } from '@domain/tests';
import { AddAccountParams } from '@domain/usecases';
import { faker } from '@faker-js/faker';

import { RemoteAddAccount } from './remote-add-account';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

function makeSut(url = faker.internet.url()): SutTypes {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);

    await sut.add(mockAddAccountParams());

    expect(httpPostClientSpy.url).toBe(url);
  });
});
