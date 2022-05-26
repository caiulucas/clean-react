const baseUrl: string = Cypress.config().baseUrl;

export function testInputStatus(field: string, error?: string): void {
  const attr = `${error ? '' : 'not.'}have.attr`;

  cy.getByTestId(`${field}Wrap`).should(
    'have.attr',
    'data-status',
    error ? 'invalid' : 'valid',
  );
  cy.getByTestId(field).should(attr, 'title', error);
  cy.getByTestId(`${field}Label`).should(attr, 'title', error);
}

export function testMainError(error: string): void {
  cy.getByTestId('spinner').should('not.exist');
  cy.getByTestId('mainError').should('contain.text', error);
}

export function testUrl(path: string) {
  cy.url().should('eq', `${baseUrl}${path}`);
}

export function testLocalStorageItem(key: string): void {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)));
}
