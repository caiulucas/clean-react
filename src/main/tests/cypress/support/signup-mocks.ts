import * as Helpers from './http-mock';

export function mockEmailInUseError(): void {
  Helpers.mockEmailInUseError(/signup/, 'POST');
}
