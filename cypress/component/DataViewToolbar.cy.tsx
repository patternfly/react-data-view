import React from 'react';
import DataViewToolbar from '../../packages/module/dist/dynamic/DataViewToolbar';

describe('DataViewToolbar', () => {
  it('renders the data view toolbar', () => {
    cy.mount(<DataViewToolbar page={1} perPage={10} />)
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination-bottom"]').should('not.exist');
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination"]').should('exist');
  });

  it('renders the data view bottom toolbar', () => {
    cy.mount(<DataViewToolbar page={1} perPage={10} isBottom />)
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination"]').should('not.exist');
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination-bottom"]').should('exist');
  });
});