import { HttpGetClient } from '@data/protocols/http';
import { AuthorizeHttpGetClientDecorator } from '@main/decorators';

import { makeLocalStorageAdapter } from '../cache';
import { makeAxiosHttpClient } from '../http';

export function makeAuthorizeHttpGetClientDecorator(): HttpGetClient {
  return new AuthorizeHttpGetClientDecorator(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient(),
  );
}
