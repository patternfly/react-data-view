import React from 'react';
import { Pagination } from '@patternfly/react-core';
import DataViewToolbar from '../../packages/module/dist/dynamic/DataViewToolbar';

describe('DataViewToolbar', () => {
  it('renders the data view toolbar', () => {
    cy.mount(<DataViewToolbar pagination={<Pagination page={1} perPage={10} ouiaId="DataViewToolbar-pagination" />} />)
    cy.get('[data-ouia-component-id="DataViewToolbar"]').should('exist');
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination"]').should('exist');
  });
});