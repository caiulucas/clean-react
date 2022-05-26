import faker from '@faker-js/faker';

import * as FormHelpers from '../support/form-helpers';
import * as Http from '../support/signup-mocks';

function simulateValidSubmit(): void {
  const password = faker.internet.password();

  cy.getByTestId('name').type(faker.name.findName());
  cy.getByTestId('email').type(faker.internet.email());
  cy.getByTestId('password').type(password);
  cy.getByTestId('passwordConfirmation').type(password);

  cy.get('[type="submit"]').click();
}

describe('SignUp', () => {
  beforeEach(() => cy.visit('signup'));

  it('Should load with correct initial state', () => {
    FormHelpers.testInputStatus('name', 'Campo obrigatório');
    FormHelpers.testInputStatus('email', 'Campo obrigatório');
    FormHelpers.testInputStatus('password', 'Campo obrigatório');
    FormHelpers.testInputStatus('passwordConfirmation', 'Campo obrigatório');

    cy.get('[type="submit"]').should('have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.name.findName());
    cy.getByTestId('email').type(faker.random.word());
    cy.getByTestId('password').type(faker.random.alphaNumeric(4));
    cy.getByTestId('passwordConfirmation').type(faker.internet.password());

    FormHelpers.testInputStatus('email', 'Valor inválido');
    FormHelpers.testInputStatus('password', 'Valor inválido');
    FormHelpers.testInputStatus('passwordConfirmation', 'Valor inválido');

    cy.get('[type="submit"]').should('have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    const password = faker.internet.password();

    cy.getByTestId('name').type(faker.name.findName());
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(password);
    cy.getByTestId('passwordConfirmation').type(password);

    FormHelpers.testInputStatus('name');
    FormHelpers.testInputStatus('email');
    FormHelpers.testInputStatus('password');
    FormHelpers.testInputStatus('passwordConfirmation');

    cy.get('[type="submit"]').should('not.have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present email in use error on 403', () => {
    Http.mockEmailInUseError();
    simulateValidSubmit();

    FormHelpers.testMainError('Esse e-mail já está em uso');
    FormHelpers.testUrl('/signup');
  });

  it('Should present unexpected error on 400', () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();

    FormHelpers.testMainError(
      'Ops! Algo que não deveria acontecer, aconteceu. Tente de novo mais tarde',
    );
    FormHelpers.testUrl('/signup');
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
