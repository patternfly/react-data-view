import React from 'react';
import { mount } from 'cypress/react';
import { BasicExample } from '../../packages/module/patternfly-docs/content/extensions/data-view/examples/Toolbar/AllSelectedExample';

describe('BasicExample Component', () => {
  beforeEach(() => {
    mount(<BasicExample />);
  });

  it('displays all rows by default', () => {
    cy.get('table tbody tr').should('have.length', 5);
  });

  it('filters to selected rows when toggled', () => {
    cy.get('table tbody tr')
      .first()
      .find('input[type="checkbox"]')
      .check();

    cy.get('#selected-row-switch').click();

    cy.get('table tbody tr').should('have.length', 1);
  });

  it('switches back to all when last selected row is unselected', () => {
    cy.get('table tbody tr')
      .first()
      .find('input[type="checkbox"]')
      .check();

    cy.get('#selected-row-switch').click();

    cy.get('table tbody tr').should('have.length', 1);

    cy.get('table tbody tr')
      .first()
      .find('input[type="checkbox"]')
      .uncheck();

    cy.get('table tbody tr').should('have.length', 5);
  });
});
