import { HttpResponse } from './http-response';

export type HttpGetParams = {
  url: string;
  body?: any;
};

export interface HttpGetClient<R = any> {
  get(params: HttpGetParams): Promise<HttpResponse<R>>;
}
