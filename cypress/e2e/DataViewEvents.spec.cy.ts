describe('Test the Data view docs page', () => {

  it('displays a table and opens detail', () => {
    const ouiaId = 'ContextExample';

    cy.visit('http://localhost:8006/extensions/data-view/overview');
    
    cy.get(`[data-ouia-component-id="${ouiaId}-th-0"]`).contains('Repositories');
    cy.get(`[data-ouia-component-id="${ouiaId}-th-4"]`).contains('Last commit');

    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-0"]`).contains('Repository one');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-4"]`).contains('Timestamp five');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-7-4"]`).should('not.exist');

    // click the first row
    cy.get(`[data-ouia-component-id="${ouiaId}-tr-0"]`).first().click();
    cy.get(`[data-ouia-component-id="detail-drawer"]`).should('exist');
    cy.get(`[data-ouia-component-id="detail-drawer-title"]`).contains('Detail of Repository one');
    cy.get(`[data-ouia-component-id="detail-drawer-close-btn"]`).should('be.visible');

    // click the first row again
    cy.get(`[data-ouia-component-id="${ouiaId}-tr-0"]`).first().click({ force: true });
    cy.get(`[data-ouia-component-id="detail-drawer-title"]`).should('not.exist');

    // click the second row
    cy.get(`[data-ouia-component-id="${ouiaId}-tr-1"]`).first().click();
    cy.get(`[data-ouia-component-id="detail-drawer"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="detail-drawer-title"]`).contains('Detail of Repository two');

    // click the close button
    cy.get(`[data-ouia-component-id="detail-drawer-close-btn"]`).first().click({ force: true });
    cy.get(`[data-ouia-component-id="detail-drawer-title"]`).should('not.exist');
  })
});