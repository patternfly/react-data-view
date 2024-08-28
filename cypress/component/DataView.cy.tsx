import React from 'react';
import { Pagination } from '@patternfly/react-core';
import { BulkSelect } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';

interface Repository {
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
}

const PAGINATION = {
  page: 1,
  perPage: 10
}

const repositories: Repository[] = [
  { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
  { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
  { name: 'one - 3', branches: 'two - 3', prs: 'three - 3', workspaces: 'four - 3', lastCommit: 'five - 3' },
  { name: 'one - 4', branches: 'two - 4', prs: 'null', workspaces: 'four - 4', lastCommit: 'five - 4' },
  { name: 'one - 5', branches: 'two - 5', prs: 'three - 5', workspaces: 'four - 5', lastCommit: 'five - 5' },
  { name: 'one - 6', branches: 'two - 6', prs: 'three - 6', workspaces: 'four - 6', lastCommit: 'five - 6' }
];
const rows = repositories.map(item => Object.values(item));

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

describe('DataView', () => {
  it('renders the data view layout', () => {
    cy.mount(<DataView><>Data view content</></DataView>)
    cy.get('[data-ouia-component-id="DataView-stack-item-0"]').contains('Data view content');
  });

  it('renders the data view with toolbar, tabular data section and footer', () => {
    const ouiaId = 'data';

    cy.mount(
      <DataView>
        <DataViewToolbar 
          ouiaId="DataViewToolbar" 
          pagination={<Pagination {...PAGINATION} />} 
          bulkSelect={
            <BulkSelect
              canSelectAll
              pageCount={5}
              totalCount={10}
              selectedCount={2}
              pageSelected={false}
              pagePartiallySelected={true}
              onSelect={() => null}
            />
          } 
        />
        <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} />
        <DataViewToolbar ouiaId="DataViewFooter" pagination={<Pagination isCompact {...PAGINATION} />} />
      </DataView>
    );
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination"]').should('exist');
    cy.get('[data-ouia-component-id="DataViewToolbar-bulk-select"]').should('exist');
    
    cy.get('[data-ouia-component-id="data-th-0"]').contains('Repositories');
    cy.get('[data-ouia-component-id="data-th-1"]').contains('Branches');
    cy.get('[data-ouia-component-id="data-th-2"]').contains('Pull requests');
    cy.get('[data-ouia-component-id="data-th-3"]').contains('Workspaces');
    cy.get('[data-ouia-component-id="data-th-4"]').contains('Last commit');

    cy.get('[data-ouia-component-id="data-td-0-0"]').contains('one');
    cy.get('[data-ouia-component-id="data-td-2-1"]').contains('two - 3');
    cy.get('[data-ouia-component-id="data-td-3-2"]').contains('null');
    cy.get('[data-ouia-component-id="data-td-4-3"]').contains('four - 5');
    cy.get('[data-ouia-component-id="data-td-5-4"]').contains('five - 6');

    cy.get('[data-ouia-component-id="DataViewFooter-pagination"]').should('exist');
  });
});