import { faker } from '@faker-js/faker';

const baseUrl: string = Cypress.config().baseUrl;

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

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('emailStatus')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢');

    cy.getByTestId('password').type(faker.internet.password());
    cy.getByTestId('passwordStatus')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢');

    cy.get('[type="submit"]').should('not.have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present error if invalid credentials are provided', () => {
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.internet.password());

    cy.get('[type="submit"]').click();
    cy.getByTestId('formStatus')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('mainError')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('mainError')
      .should('contain.text', 'Credenciais inválidas');

    cy.url().should('eq', `${baseUrl}/login`);
  });
});
