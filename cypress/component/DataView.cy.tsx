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
  { name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },
  { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },
  { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },
  { name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },
  { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },
  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }
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
        <DataViewToolbar ouiaId="DataViewFooter" pagination={<Pagination isCompact variant="bottom" {...PAGINATION} />} />
      </DataView>
    );
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination"]').should('exist');
    cy.get('[data-ouia-component-id="DataViewToolbar-bulk-select"]').should('exist');
    
    cy.get('[data-ouia-component-id="data-th-0"]').contains('Repositories');
    cy.get('[data-ouia-component-id="data-th-1"]').contains('Branches');
    cy.get('[data-ouia-component-id="data-th-2"]').contains('Pull requests');
    cy.get('[data-ouia-component-id="data-th-3"]').contains('Workspaces');
    cy.get('[data-ouia-component-id="data-th-4"]').contains('Last commit');

    cy.get('[data-ouia-component-id="data-td-0-0"]').contains('Repository one');
    cy.get('[data-ouia-component-id="data-td-2-1"]').contains('Branch three');
    cy.get('[data-ouia-component-id="data-td-3-2"]').contains('Pull request four');
    cy.get('[data-ouia-component-id="data-td-4-3"]').contains('Workspace five');
    cy.get('[data-ouia-component-id="data-td-5-4"]').contains('Timestamp six');

    cy.get('[data-ouia-component-id="DataViewFooter-pagination"]').should('exist');
  });
});