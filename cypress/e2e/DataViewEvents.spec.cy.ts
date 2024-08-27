describe('Test the Data view docs page', () => {

  it('displays a table and opens detail', () => {
    const ouiaId = 'ContextExample';

    cy.visit('http://localhost:8006/extensions/data-view/context');
    
    cy.get(`[data-ouia-component-id="${ouiaId}-th-0"]`).contains('Repositories');
    cy.get(`[data-ouia-component-id="${ouiaId}-th-4"]`).contains('Last commit');

    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-0"]`).contains('one');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-4"]`).contains('five - 5');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-7-4"]`).should('not.exist');

    // click the first row
    cy.get(`[data-ouia-component-id="${ouiaId}-tr-0"]`).first().click();
    cy.get(`[data-ouia-component-id="detail-drawer"]`).should('exist');
    cy.get(`[data-ouia-component-id="detail-drawer-title"]`).contains('Detail of repository one');
    cy.get(`[data-ouia-component-id="detail-drawer-close-btn"]`).should('be.visible');

    // click the first row again
    cy.get(`[data-ouia-component-id="${ouiaId}-tr-0"]`).first().click({ force: true });
    cy.get(`[data-ouia-component-id="detail-drawer-title"]`).should('not.be.visible');

    // click the second row
    cy.get(`[data-ouia-component-id="${ouiaId}-tr-1"]`).first().click();
    cy.get(`[data-ouia-component-id="detail-drawer"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="detail-drawer-title"]`).contains('Detail of repository one - 2');

    // click the close button
    cy.get(`[data-ouia-component-id="detail-drawer-close-btn"]`).first().click({ force: true });
    cy.get(`[data-ouia-component-id="detail-drawer-title"]`).should('not.be.visible');
  })
});