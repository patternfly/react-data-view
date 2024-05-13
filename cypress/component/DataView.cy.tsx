import React from 'react';
import { Pagination } from '@patternfly/react-core';
import DataView from '../../packages/module/dist/dynamic/DataView';
import DataViewToolbar from '../../packages/module/dist/esm/DataViewToolbar';

const PAGINATION = {
  page: 1,
  perPage: 1
}

describe('DataView', () => {
  it('renders the data view layout', () => {
    cy.mount(<DataView><>Data view content</></DataView>)
    cy.get('[data-ouia-component-id="DataView-stack-item-0"]').contains('Data view content');
  });

  it('renders the data view with toolbar, data section and footer', () => {
    cy.mount(
      <DataView>
        <DataViewToolbar pagination={<Pagination {...PAGINATION} ouiaId="DataViewToolbar-pagination" />} />
        <>Data section</>
        <DataViewToolbar pagination={<Pagination isCompact {...PAGINATION} ouiaId="DataViewFooter-pagination" />} ouiaId="DataViewFooter" />
      </DataView>
    );
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination"]').should('exist');
    cy.get('[data-ouia-component-id="DataView-stack-item-1"]').contains('Data section');
    cy.get('[data-ouia-component-id="DataViewFooter-pagination"]').should('exist');
  });
});