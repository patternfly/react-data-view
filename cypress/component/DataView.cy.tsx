import React from 'react';
import DataView from '../../packages/module/dist/dynamic/DataView';
import DataViewToolbar from '../../packages/module/dist/esm/DataViewToolbar';

describe('DataView', () => {
  it('renders the data view layout', () => {
    cy.mount(<DataView><>Data view content</></DataView>)
    cy.get('[data-ouia-component-id="DataView-stack-item-0"]').contains('Data view content');
  });

  it('renders the data view with toolbar, data section and footer', () => {
    cy.mount(
      <DataView>
        <DataViewToolbar page={1} perPage={10} />
        <>Data section</>
        <DataViewToolbar page={1} perPage={10} isBottom />
      </DataView>
    );
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination"]').should('exist');
    cy.get('[data-ouia-component-id="DataView-stack-item-1"]').contains('Data section');
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination-bottom"]').should('exist');
  });
});