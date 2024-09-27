import React from 'react';
import DataViewTableBasic from '@patternfly/react-data-view/dist/dynamic/DataViewTableBasic';
import DataView from '@patternfly/react-data-view/dist/dynamic/DataView';

interface Repository {
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
  children?: Repository[];
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

describe('DataViewTableBasic', () => {

  it('renders a basic data view table', () => {
    const ouiaId = 'data';

    cy.mount(
      <DataViewTableBasic aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} />
    );

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
  });

  it('renders a basic data view table with an empty state', () => {
    const ouiaId = 'data';

    cy.mount(
      <DataView activeState="empty">
        <DataViewTableBasic aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={[]} states={{ empty: "No data found" }} />
      </DataView>
    );

    cy.get('[data-ouia-component-id="data-th-0"]').contains('Repositories');
    cy.get('[data-ouia-component-id="data-th-1"]').contains('Branches');
    cy.get('[data-ouia-component-id="data-th-2"]').contains('Pull requests');
    cy.get('[data-ouia-component-id="data-th-3"]').contains('Workspaces');
    cy.get('[data-ouia-component-id="data-th-4"]').contains('Last commit');

    cy.get('[data-ouia-component-id="data-tr-empty"]').should('be.visible');
    cy.get('[data-ouia-component-id="data-tr-empty"]').contains('No data found');
  });

  it('renders a basic data view table with an error state', () => {
    const ouiaId = 'data';

    cy.mount(
      <DataView activeState="error">
        <DataViewTableBasic aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={[]} states={{ error: "Some error" }} />
      </DataView>
    );

    cy.get('[data-ouia-component-id="data-th-0"]').contains('Repositories');
    cy.get('[data-ouia-component-id="data-th-1"]').contains('Branches');
    cy.get('[data-ouia-component-id="data-th-2"]').contains('Pull requests');
    cy.get('[data-ouia-component-id="data-th-3"]').contains('Workspaces');
    cy.get('[data-ouia-component-id="data-th-4"]').contains('Last commit');

    cy.get('[data-ouia-component-id="data-tr-error"]').should('be.visible');
    cy.get('[data-ouia-component-id="data-tr-error"]').contains('Some error');
  });
});