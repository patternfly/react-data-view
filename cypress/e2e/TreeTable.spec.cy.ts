describe('Test the Data view docs with tree table', () => {

  it('displays a a components page with tree table', () => {
    const ouiaId = 'TreeTableExample';
  
    cy.visit('http://localhost:8006/extensions/data-view/table');
      
    cy.get(`[data-ouia-component-id="${ouiaId}-th-0"]`).scrollIntoView().contains('Repositories');
    cy.get(`[data-ouia-component-id="${ouiaId}-th-1"]`).contains('Branches');
    cy.get(`[data-ouia-component-id="${ouiaId}-th-2"]`).contains('Pull requests');
    cy.get(`[data-ouia-component-id="${ouiaId}-th-3"]`).contains('Workspaces');
    cy.get(`[data-ouia-component-id="${ouiaId}-th-4"]`).contains('Last commit');
  
    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-0"]`).contains('Repository one');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-0"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-1-0"]`).contains('Repository two');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-1-0"]`).should('not.be.visible');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-2-0"]`).contains('Repository three');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-2-0"]`).should('not.be.visible');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-3-0"]`).contains('Repository four');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-3-0"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-0"]`).contains('Repository five');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-0"]`).should('not.be.visible');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-5-0"]`).contains('Repository six');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-5-0"]`).should('be.visible');
  
    // try open and close tree nodes
    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-0"]`)
      .should('exist')
      .find('button')
      .first()
      .click({ force: true })

    cy.get(`[data-ouia-component-id="${ouiaId}-td-1-0"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-2-0"]`).should('be.visible');

    cy.get(`[data-ouia-component-id="${ouiaId}-td-0-0"]`)
      .should('exist')
      .find('button')
      .first()
      .click({ force: true })

    cy.get(`[data-ouia-component-id="${ouiaId}-td-1-0"]`).should('not.be.visible');
    cy.get(`[data-ouia-component-id="${ouiaId}-td-2-0"]`).should('not.be.visible');

    cy.get(`[data-ouia-component-id="${ouiaId}-td-3-0"]`)
      .should('exist')
      .find('button')
      .first()
      .click({ force: true })

    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-0"]`).should('be.visible');

    // try check and uncheck rows
    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-0"]`)
      .should('exist')
      .find('input')
      .first()
      .click({ force: true })

    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-0"]`)
      .should('exist')
      .find('input')
      .should('be.checked')

    cy.get(`[data-ouia-component-id="${ouiaId}-td-3-0"]`)
      .should('exist')
      .find('input')
      .should('be.checked')

    cy.get(`[data-ouia-component-id="${ouiaId}-td-3-0"]`)
      .should('exist')
      .find('input')
      .first()
      .click({ force: true })

    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-0"]`)
      .should('exist')
      .find('input')
      .should('not.be.checked')

    cy.get(`[data-ouia-component-id="${ouiaId}-td-3-0"]`)
      .should('exist')
      .find('button')
      .first()
      .click({ force: true })

    cy.get(`[data-ouia-component-id="${ouiaId}-td-4-0"]`).should('not.be.visible');
  })
});