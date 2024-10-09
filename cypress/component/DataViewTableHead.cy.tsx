import React from 'react';
import { DataViewTableHead } from '@patternfly/react-data-view/dist/dynamic/DataViewTableHead';

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

describe('DataViewTableHead', () => {

  it('renders a data view table head', () => {
    const ouiaId = 'data';

    cy.mount(
      <DataViewTableHead ouiaId={ouiaId} columns={columns} />
    );

    cy.get('[data-ouia-component-id="data-th-0"]').contains('Repositories');
    cy.get('[data-ouia-component-id="data-th-1"]').contains('Branches');
    cy.get('[data-ouia-component-id="data-th-2"]').contains('Pull requests');
    cy.get('[data-ouia-component-id="data-th-3"]').contains('Workspaces');
    cy.get('[data-ouia-component-id="data-th-4"]').contains('Last commit');
  });
});