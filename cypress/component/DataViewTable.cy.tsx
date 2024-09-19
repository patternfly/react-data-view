import React from 'react';
import { DataViewTable, DataViewTrTree } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';

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

const repositoriesTree: Repository[] = [
  { 
    name: 'Repository one',
    branches: 'Branch one',
    prs: 'Pull request one',
    workspaces: 'Workspace one',
    lastCommit: 'Timestamp one',
    children: [
      { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },
      { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },
    ]
  },
  { 
    name: 'Repository four',
    branches: 'Branch four',
    prs: 'Pull request four',
    workspaces: 'Workspace four',
    lastCommit: 'Timestamp four',
    children: [ { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' } ]
  },
  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }
];



const buildRows = (repositories: Repository[]): DataViewTrTree[] => repositories.map((repo) => ({
  row: [ repo.name, repo.branches, repo.prs, repo.workspaces, repo.lastCommit ],
  id: repo.name, // unique ID for each row
  ...(repo.children
    ? { 
      children: buildRows(repo.children) // build rows for children
    }
    : {})
}));

const treeRows = buildRows(repositoriesTree);

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

describe('DataViewTable', () => {

  it('renders a basic data view table', () => {
    const ouiaId = 'data';

    cy.mount(
      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} />
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

  it('renders a tree data view table', () => {
    const ouiaId = 'tree';

    cy.mount(
      <DataViewTable isTreeTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={treeRows} />
    );

    cy.get('[data-ouia-component-id="tree-td-0-0"]')
      .should('exist')
      .find('button')
      .should('have.length', 2);

    cy.get('[data-ouia-component-id="tree-td-3-0"]')
      .should('exist')
      .find('button')
      .should('have.length', 2);

    cy.get('[data-ouia-component-id="tree-td-5-0"]')
      .should('exist')
      .find('button')
      .should('have.length', 1);

    cy.get('[data-ouia-component-id="tree-th-0"]').contains('Repositories');
    cy.get('[data-ouia-component-id="tree-th-1"]').contains('Branches');
    cy.get('[data-ouia-component-id="tree-th-2"]').contains('Pull requests');
    cy.get('[data-ouia-component-id="tree-th-3"]').contains('Workspaces');
    cy.get('[data-ouia-component-id="tree-th-4"]').contains('Last commit');

    cy.get('[data-ouia-component-id="tree-td-0-0"]').contains('Repository one');
    cy.get('[data-ouia-component-id="tree-td-0-0"]').should('be.visible');
    cy.get('[data-ouia-component-id="tree-td-2-1"]').contains('Branch three');
    cy.get('[data-ouia-component-id="tree-td-2-1"]').should('not.be.visible');
    cy.get('[data-ouia-component-id="tree-td-3-2"]').contains('Pull request four');
    cy.get('[data-ouia-component-id="tree-td-4-3"]').contains('Workspace five');
    cy.get('[data-ouia-component-id="tree-td-4-3"]').should('not.be.visible');
    cy.get('[data-ouia-component-id="tree-td-5-4"]').contains('Timestamp six');
    cy.get('[data-ouia-component-id="tree-td-5-4"]').should('be.visible');
  });
});