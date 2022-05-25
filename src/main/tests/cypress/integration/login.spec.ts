import { faker } from '@faker-js/faker';

const baseUrl: string = Cypress.config().baseUrl;

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('emailWrap').should('have.attr', 'data-status', 'invalid');
    cy.getByTestId('email').should('have.attr', 'title', 'Campo obrigatório');
    cy.getByTestId('emailLabel').should(
      'have.attr',
      'title',
      'Campo obrigatório',
    );

    cy.getByTestId('passwordWrap').should(
      'have.attr',
      'data-status',
      'invalid',
    );
    cy.getByTestId('password').should(
      'have.attr',
      'title',
      'Campo obrigatório',
    );
    cy.getByTestId('passwordLabel').should(
      'have.attr',
      'title',
      'Campo obrigatório',
    );

    cy.get('[type="submit"]').should('have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word());
    cy.getByTestId('password').type(faker.random.alphaNumeric(4));

    cy.getByTestId('emailWrap').should('have.attr', 'data-status', 'invalid');
    cy.getByTestId('email').should('have.attr', 'title', 'Valor inválido');
    cy.getByTestId('emailLabel').should('have.attr', 'title', 'Valor inválido');

    cy.getByTestId('passwordWrap').should(
      'have.attr',
      'data-status',
      'invalid',
    );
    cy.getByTestId('password').should('have.attr', 'title', 'Valor inválido');
    cy.getByTestId('passwordLabel').should(
      'have.attr',
      'title',
      'Valor inválido',
    );

    cy.get('[type="submit"]').should('have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.internet.password());

    cy.getByTestId('emailWrap').should('have.attr', 'data-status', 'valid');
    cy.getByTestId('email').should('not.have.attr', 'title');
    cy.getByTestId('emailLabel').should('not.have.attr', 'title');

    cy.getByTestId('passwordWrap').should('have.attr', 'data-status', 'valid');
    cy.getByTestId('password').should('not.have.attr', 'title');
    cy.getByTestId('passwordLabel').should('not.have.attr', 'title');

    cy.get('[type="submit"]').should('not.have.attr', 'disabled');
    cy.getByTestId('formStatus').should('not.have.descendants');
  });

  it('Should present invalid credentials error on 401', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 401,
        body: {
          error: faker.random.words(),
        },
      },
    );
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.internet.password());

    cy.get('[type="submit"]').click();
    cy.getByTestId('formStatus')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('mainError')
      .should('contain.text', 'Credenciais inválidas');

    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present unexpected error on 400', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 400,
        body: {
          error: faker.random.words(),
        },
      },
    );
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.internet.password());

    cy.get('[type="submit"]').click();
    cy.getByTestId('formStatus')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('mainError')
      .should(
        'contain.text',
        'Ops! Algo que não deveria acontecer, aconteceu. Tente de novo mais tarde',
      );

    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present unexpected error if invalid data is returned', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          invalidProperty: faker.datatype.uuid(),
        },
      },
    );

    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.internet.password());

    cy.get('[type="submit"]').click();
    cy.getByTestId('formStatus')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('mainError')
      .should(
        'contain.text',
        'Ops! Algo que não deveria acontecer, aconteceu. Tente de novo mais tarde',
      );

    cy.window().then(window =>
      assert.isNotOk(window.localStorage.getItem('accessToken')),
    );
  });

  it('Should save access token if valid credentials are provided', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid(),
        },
      },
    );

    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.internet.password());

    cy.get('[type="submit"]').click();
    cy.url().should('eq', `${baseUrl}/`);

    cy.window().then(window =>
      assert.isOk(window.localStorage.getItem('accessToken')),
    );
  });

  it('Should prevent submit if form is invalid', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid(),
        },
      },
    ).as('request');

    cy.getByTestId('email').type(faker.internet.email()).type('{enter}');
    cy.get('@request.all').should('have.length', 0);
  });
});
