import React from 'react';
import { DataViewTableHeader } from '@patternfly/react-data-view/dist/dynamic/DataViewTableHeader';

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

describe('DataViewTableHeader', () => {

  it('renders a data view table header', () => {
    const ouiaId = 'data';

    cy.mount(
      <DataViewTableHeader ouiaId={ouiaId} columns={columns} />
    );

    cy.get('[data-ouia-component-id="data-th-0"]').contains('Repositories');
    cy.get('[data-ouia-component-id="data-th-1"]').contains('Branches');
    cy.get('[data-ouia-component-id="data-th-2"]').contains('Pull requests');
    cy.get('[data-ouia-component-id="data-th-3"]').contains('Workspaces');
    cy.get('[data-ouia-component-id="data-th-4"]').contains('Last commit');
  });
});