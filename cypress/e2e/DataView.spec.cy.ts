describe('Test the Data view docs page', () => {

  it('displays a layout with a table and paginates', () => {
    const ouiaId = 'LayoutExample';

    cy.visit('http://localhost:8006/extensions/data-view/data-view-layout');

    cy.get(`[data-ouia-component-id="${ouiaId}Header-pagination"]`).should('exist');

    cy.get(`[data-ouia-component-id="${ouiaId}Footer-pagination"]`).should('exist');
    
    cy.get(`[data-ouia-component-id="${ouiaId}-th-0"]`).contains('Repositories');
    cy.get(`[data-ouia-component-id="${ouiaId}-th-4"]`).contains('Last commit');

    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-0"]`).contains('one');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-4"]`).contains('five - 5');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-5-4"]`).should('not.exist');

    // move to the next page
    cy.get(`[data-action="next"`).first().click({ force: true });
    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-4"]`).contains('five - 6');

    // move to previous page
    cy.get(`[data-action="previous"`).eq(1).click({ force: true });
    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-4"]`).contains('five');
  })
})