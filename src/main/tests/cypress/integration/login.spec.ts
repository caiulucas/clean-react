import faker from '@faker-js/faker';

import * as FormHelpers from '../support/form-helpers';
import * as Http from '../support/login-mocks';

function simulateValidSubmit(): void {
  cy.getByTestId('email').type(faker.internet.email());
  cy.getByTestId('password').type(faker.internet.password());

  cy.get('[type="submit"]').click();
}

describe('Login', () => {
  beforeEach(() => cy.visit('login'));

  it('Should load with correct initial state', () => {
    FormHelpers.testInputStatus('email', 'Campo obrigatório');
    FormHelpers.testInputStatus('password', 'Campo obrigatório');

    cy.get('[type="submit"]').should('have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word());
    cy.getByTestId('password').type(faker.random.alphaNumeric(4));

    FormHelpers.testInputStatus('email', 'Valor inválido');
    FormHelpers.testInputStatus('password', 'Valor inválido');

    cy.get('[type="submit"]').should('have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.internet.password());

    FormHelpers.testInputStatus('email');
    FormHelpers.testInputStatus('password');

    cy.get('[type="submit"]').should('not.have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present invalid credentials error on 401', () => {
    Http.mockInvalidCredentialsError();
    simulateValidSubmit();

    FormHelpers.testMainError('Credenciais inválidas');
    FormHelpers.testUrl('/login');
  });

  it('Should present unexpected error on 400', () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();

    FormHelpers.testMainError(
      'Ops! Algo que não deveria acontecer, aconteceu. Tente de novo mais tarde',
    );
    FormHelpers.testUrl('/login');
  });

  it('Should present unexpected error if invalid data is returned', () => {
    Http.mockInvalidData();
    simulateValidSubmit();

    FormHelpers.testMainError(
      'Ops! Algo que não deveria acontecer, aconteceu. Tente de novo mais tarde',
    );

    cy.window().then(window =>
      assert.isNotOk(window.localStorage.getItem('accessToken')),
    );
  });

  it('Should save access token if valid credentials are provided', () => {
    Http.mockOk();
    simulateValidSubmit();

    FormHelpers.testUrl('/');

    FormHelpers.testLocalStorageItem('accessToken');
  });

  it('Should prevent submit if form is invalid', () => {
    Http.mockOk();

    cy.getByTestId('email').type(faker.internet.email()).type('{enter}');
    cy.get('@request.all').should('have.length', 0);
  });
});
