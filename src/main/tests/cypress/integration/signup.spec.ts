import * as FormHelpers from '../support/form-helpers';

describe('SignUp', () => {
  beforeEach(() => cy.visit('signup'));

  it('Should load with correct initial state', () => {
    FormHelpers.testInputStatus('name', 'Campo obrigatório');
    FormHelpers.testInputStatus('email', 'Campo obrigatório');
    FormHelpers.testInputStatus('password', 'Campo obrigatório');
    FormHelpers.testInputStatus('passwordConfirmation ', 'Campo obrigatório');

    cy.get('[type="submit"]').should('have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });
});
