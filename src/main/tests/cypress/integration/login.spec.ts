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
});
