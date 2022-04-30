import {
  HttpPostClient,
  HttpPostParams,
} from '../protocols/http/http-post-client';
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;
  response: HttpResponse = { statusCode: HttpStatusCode.noContent };

  async post({ url, body }: HttpPostParams): Promise<HttpResponse> {
    this.url = url;
    this.body = body;

    return this.response;
  }
}
