import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '@data/protocols/http';
import faker from '@faker-js/faker';

export function mockGetRequest(): HttpGetParams {
  return {
    url: faker.internet.url(),
    headers: {
      [faker.database.column()]: faker.random.words(),
    },
  };
}

export function mockPostRequest(): HttpPostParams {
  return {
    url: faker.internet.url(),
    body: faker.helpers.objectValue({ key: 'value' }),
  };
}

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string;
  headers?: any;
  response: HttpResponse<R> = { statusCode: HttpStatusCode.ok };

  async get({ url, headers }: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = url;
    this.headers = headers;

    return this.response;
  }
}

export class HttpPostClientSpy<R = any> implements HttpPostClient<R> {
  url?: string;
  body?: any;
  response: HttpResponse<R> = { statusCode: HttpStatusCode.ok };

  async post({ url, body }: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = url;
    this.body = body;

    return this.response;
  }
}
