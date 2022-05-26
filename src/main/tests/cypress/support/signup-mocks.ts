import faker from '@faker-js/faker';

import * as Helpers from './http-mock';

export function mockEmailInUseError(): void {
  Helpers.mockEmailInUseError(/signup/, 'POST');
}

export function mockUnexpectedError(): void {
  Helpers.mockUnexpectedError(/signup/, 'POST');
}

export function mockInvalidData(): void {
  Helpers.mockOk(/signup/, 'POST', { invalidProperty: faker.datatype.uuid() });
}
