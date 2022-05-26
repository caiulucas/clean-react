import * as Helpers from './http-mock';

export function mockEmailInUseError(): void {
  Helpers.mockEmailInUseError(/signup/, 'POST');
}

export function mockUnexpectedError(): void {
  Helpers.mockUnexpectedError(/signup/, 'POST');
}
