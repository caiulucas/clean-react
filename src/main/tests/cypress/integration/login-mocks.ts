import faker from '@faker-js/faker';

import * as Helpers from '../support/http-mock';

export function mockInvalidCredentialsError(): void {
  Helpers.mockInvalidCredentialsError(/login/);
}

export function mockUnexpectedError(): void {
  Helpers.mockUnexpectedError(/login/, 'POST');
}

export function mockOk(): void {
  Helpers.mockOk(/login/, 'POST', { accessToken: faker.datatype.uuid() });
}

export function mockInvalidData(): void {
  Helpers.mockOk(/login/, 'POST', { invalidProperty: faker.datatype.uuid() });
}
