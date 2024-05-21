import React from 'react';
import { Pagination } from '@patternfly/react-core';
import { Table, Tbody, Th, Thead, Tr, Td } from '@patternfly/react-table';
import DataView from '../../packages/module/dist/dynamic/DataView';
import DataViewToolbar from '../../packages/module/dist/esm/DataViewToolbar';

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

const cols: Record<keyof Repository, string> = {
  name: 'Repositories',
  branches: 'Branches',
  prs: 'Pull requests',
  workspaces: 'Workspaces',
  lastCommit: 'Last commit'
};

describe('DataView', () => {
  it('renders the data view layout', () => {
    cy.mount(<DataView><>Data view content</></DataView>)
    cy.get('[data-ouia-component-id="DataView-stack-item-0"]').contains('Data view content');
  });

  it('renders the data view with toolbar, tabular data section and footer', () => {
    const ouiaId = 'data';

    cy.mount(
      <DataView>
        <DataViewToolbar pagination={<Pagination {...PAGINATION} ouiaId="DataViewToolbar-pagination" />} />
        <Table aria-label="Repositories table" ouiaId={ouiaId}>
          <Thead data-ouia-component-id={`${ouiaId}-thead`}>
            <Tr ouiaId={`${ouiaId}-tr-head`}>
              {Object.values(cols).map((column, index) => <Th key={index} data-ouia-component-id={`${ouiaId}-th-${index}`}>{column}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
            {repositories.map((repo, rowIndex) => (
              <Tr key={repo.name}>
                <Td data-ouia-component-id={`${ouiaId}-td-${rowIndex}-name`} dataLabel={cols.name}>{repo.name}</Td>
                <Td data-ouia-component-id={`${ouiaId}-td-${rowIndex}-branches`} dataLabel={cols.branches}>{repo.branches}</Td>
                <Td data-ouia-component-id={`${ouiaId}-td-${rowIndex}-prs`} dataLabel={cols.prs}>{repo.prs}</Td>
                <Td data-ouia-component-id={`${ouiaId}-td-${rowIndex}-workspaces`} dataLabel={cols.workspaces}>{repo.workspaces}</Td>
                <Td data-ouia-component-id={`${ouiaId}-td-${rowIndex}-last-commit`} dataLabel={cols.lastCommit}>{repo.lastCommit}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <DataViewToolbar pagination={<Pagination isCompact {...PAGINATION} ouiaId="DataViewFooter-pagination" />} ouiaId="DataViewFooter" />
      </DataView>
    );
    cy.get('[data-ouia-component-id="DataViewToolbar-pagination"]').should('exist');
    
    cy.get('[data-ouia-component-id="data-th-0"]').contains('Repositories');
    cy.get('[data-ouia-component-id="data-th-1"]').contains('Branches');
    cy.get('[data-ouia-component-id="data-th-2"]').contains('Pull requests');
    cy.get('[data-ouia-component-id="data-th-3"]').contains('Workspaces');
    cy.get('[data-ouia-component-id="data-th-4"]').contains('Last commit');

    cy.get('[data-ouia-component-id="data-td-0-name"]').contains('one');
    cy.get('[data-ouia-component-id="data-td-2-branches"]').contains('two - 3');
    cy.get('[data-ouia-component-id="data-td-3-prs"]').contains('null');
    cy.get('[data-ouia-component-id="data-td-4-workspaces"]').contains('four - 5');
    cy.get('[data-ouia-component-id="data-td-5-last-commit"]').contains('five - 6');

    cy.get('[data-ouia-component-id="DataViewFooter-pagination"]').should('exist');
  });
});