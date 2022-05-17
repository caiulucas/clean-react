import { HttpStatusCode } from '@data/protocols/http';
import { HttpPostClientSpy } from '@data/tests';
import { UnexpectedError } from '@domain/errors';
import { EmailInUseError } from '@domain/errors/email-in-use-error';
import { AccountModel } from '@domain/models';
import { mockAccountModel, mockAddAccountParams } from '@domain/tests';
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

  test('Should call HttpPostClient with correct body', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);

    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toBe(addAccountParams);
  });

  test('Should throw EmailInUseError if HttpPostClient returns 403', () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };

    const promise = sut.add(mockAddAccountParams());

    expect(promise).rejects.toThrowError(new EmailInUseError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.add(mockAddAccountParams());

    expect(promise).rejects.toThrowError(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const promise = sut.add(mockAddAccountParams());

    expect(promise).rejects.toThrowError(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', () => {
    const { sut, httpPostClientSpy } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.add(mockAddAccountParams());

    expect(promise).rejects.toThrowError(new UnexpectedError());
  });

  test('Should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAccountModel();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const account = await sut.add(mockAddAccountParams());

    expect(account).toEqual(httpResult);
  });
});
