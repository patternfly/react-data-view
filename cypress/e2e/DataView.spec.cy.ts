describe('Test the Data view docs page', () => {
  
  it('displays a layout with a table and paginates', () => {
    const ouiaId = 'LayoutExample';
    cy.viewport(1400, 2800)

    cy.visit('http://localhost:8006/extensions/data-view/overview');

    cy.get(`[data-ouia-component-id="${ouiaId}-th-0"]`).scrollIntoView().contains('Repository');
    cy.get(`[data-ouia-component-id="${ouiaId}Header-pagination"]`).should('exist');
    cy.get(`[data-ouia-component-id="${ouiaId}Header-bulk-select"]`).should('exist');

    cy.get(`[data-ouia-component-id="${ouiaId}Footer-pagination"]`).should('exist');
    cy.get(`[data-ouia-component-id="${ouiaId}Footer-bulk-select"]`).should('not.exist');
    
    cy.get(`[data-ouia-component-id="${ouiaId}-th-0"]`).contains('Repository');
    cy.get(`[data-ouia-component-id="${ouiaId}-th-4"]`).contains('Last commit');

    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-0"]`).contains('Repository one');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-4"]`).contains('Timestamp five');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-5-4"]`).should('not.exist');

    // move to the next page
    cy.get(`[data-action="next"`).first().click({ force: true });
    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-4"]`).contains('Timestamp six');

    // move to previous page
    cy.get(`[data-action="previous"`).eq(1).click({ force: true });
    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-4"]`).contains('Timestamp one');

    // test bulk select
    cy.get(`input[type="checkbox"`).each(($checkbox) => {cy.wrap($checkbox).should('not.be.checked')});

    // page checkbox select
    cy.get(`[data-ouia-component-id="BulkSelect-checkbox"`).first().click();
    cy.get(`input[type="checkbox"`).each(($checkbox) => {cy.wrap($checkbox).should('be.checked')});
    cy.contains('5 selected').should('exist');

    // page checkbox deselect
    cy.get(`[data-ouia-component-id="BulkSelect-checkbox"`).first().click();
    cy.get('[data-ouia-component-id="LayoutExample"] input[type="checkbox"]')
      .each(($checkbox) => {
        cy.wrap($checkbox).should('not.be.checked');
      });

    // select page
    cy.get(`[data-ouia-component-id="BulkSelect-toggle"`).first().click({ force: true });
    cy.get(`[data-ouia-component-id="BulkSelect-select-page"`).first().click();
    cy.get('[data-ouia-component-id="LayoutExample"] input[type="checkbox"]')
      .each(($checkbox) => {
        cy.wrap($checkbox).should('be.checked');
      });
    cy.contains('5 selected').should('exist');
  })
});