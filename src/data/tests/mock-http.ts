import {
  HttpPostParams,
  HttpPostClient,
  HttpResponse,
  HttpStatusCode,
} from '@data/protocols/http';
import { faker } from '@faker-js/faker';

export function mockPostRequest(): HttpPostParams<any> {
  return {
    url: faker.internet.url(),
    body: faker.helpers.objectValue({ key: 'value' }),
  };
}

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;
  response: HttpResponse<R> = { statusCode: HttpStatusCode.ok };

  async post({ url, body }: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = url;
    this.body = body;

    return this.response;
  }
}
