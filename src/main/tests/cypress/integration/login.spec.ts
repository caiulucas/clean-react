import { faker } from '@faker-js/faker';
describe('Login', () => {
  beforeEach(() => cy.visit('login'));

  it('Should load with correct initial state', () => {
    cy.getByTestId('emailStatus')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴');

    cy.getByTestId('passwordStatus')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴');

    cy.get('[type="submit"]').should('have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word());
    cy.getByTestId('emailStatus')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴');

    cy.getByTestId('password').type(faker.random.alphaNumeric(4));
    cy.getByTestId('passwordStatus')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴');

    cy.get('[type="submit"]').should('have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });
});
