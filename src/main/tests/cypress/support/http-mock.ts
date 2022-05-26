import faker from '@faker-js/faker';

export function mockInvalidCredentialsError(url: RegExp): void {
  cy.intercept(
    {
      method: 'POST',
      url,
    },
    {
      statusCode: 401,
      body: {
        error: faker.random.words(),
      },
    },
  ).as('request');
}

export function mockUnexpectedError(url: RegExp, method: string): void {
  cy.intercept(
    {
      method,
      url,
    },
    {
      statusCode: 400,
      body: {
        error: faker.random.words(),
      },
    },
  ).as('request');
}

export function mockOk(url: RegExp, method: string, response: object): void {
  cy.intercept(
    {
      method,
      url,
    },
    {
      statusCode: 200,
      body: response,
    },
  ).as('request');
}
