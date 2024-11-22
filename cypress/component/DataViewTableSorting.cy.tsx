/* eslint-disable no-nested-ternary */
import React from 'react';
import { useDataViewSort } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { ThProps } from '@patternfly/react-table';

interface Repository {
  name: string;
  branches: string;
  prs: string;
  workspaces: string;
  lastCommit: string;
}

const COLUMNS = [
  { label: 'Repository', key: 'name', index: 0 },
  { label: 'Branch', key: 'branches', index: 1 },
  { label: 'Pull request', key: 'prs', index: 2 },
  { label: 'Workspace', key: 'workspaces', index: 3 },
  { label: 'Last commit', key: 'lastCommit', index: 4 },
];

const repositories: Repository[] = [
  { name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: '2023-11-01' },
  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: '2023-11-06' },
  { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: '2023-11-02' },
  { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: '2023-11-05' },
  { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: '2023-11-03' },
  { name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: '2023-11-04' },
];

const sortData = (data: Repository[], sortBy: keyof Repository | undefined, direction: 'asc' | 'desc' | undefined) =>
  sortBy && direction
    ? [ ...data ].sort((a, b) =>
      direction === 'asc'
        ? a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
        : a[sortBy] > b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0
    )
    : data;

const TestTable: React.FunctionComponent = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { sortBy, direction, onSort } = useDataViewSort({ searchParams, setSearchParams });
  const sortByIndex = React.useMemo(() => COLUMNS.findIndex(item => item.key === sortBy), [ sortBy ]);

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: sortByIndex,
      direction,
      defaultDirection: 'asc',
    },
    onSort: (_event, index, direction) => onSort(_event, COLUMNS[index].key, direction),
    columnIndex,
  });

  const columns: DataViewTh[] = COLUMNS.map((column, index) => ({
    cell: column.label,
    props: { sort: getSortParams(index) },
  }));

  const rows: DataViewTr[] = React.useMemo(
    () =>
      sortData(repositories, sortBy ? sortBy as keyof Repository : undefined, direction).map(({ name, branches, prs, workspaces, lastCommit }) => [
        name,
        branches,
        prs,
        workspaces,
        lastCommit,
      ]),
    [ sortBy, direction ]
  );

  return <DataViewTable aria-label="Repositories table" ouiaId="test-table" columns={columns} rows={rows} />;
};

describe('DataViewTable Sorting with Hook', () => {
  it('sorts by repository name in ascending and descending order', () => {
    cy.mount(
      <BrowserRouter>
        <TestTable />
      </BrowserRouter>
    );

    cy.get('[data-ouia-component-id="test-table-th-0"]')
      .find('button')
      .click();
    cy.get('[data-ouia-component-id="test-table-td-0-0"]').should('contain', 'Repository five');
    cy.get('[data-ouia-component-id="test-table-td-5-0"]').should('contain', 'Repository two');

    cy.get('[data-ouia-component-id="test-table-th-0"]')
      .find('button')
      .click();
    cy.get('[data-ouia-component-id="test-table-td-0-0"]').should('contain', 'Repository two');
    cy.get('[data-ouia-component-id="test-table-td-5-0"]').should('contain', 'Repository five');
  });

  it('sorts by last commit date in ascending and descending order', () => {
    cy.mount(
      <BrowserRouter>
        <TestTable />
      </BrowserRouter>
    );

    cy.get('[data-ouia-component-id="test-table-th-4"]')
      .find('button')
      .click();
    cy.get('[data-ouia-component-id="test-table-td-0-4"]').should('contain', '2023-11-01');
    cy.get('[data-ouia-component-id="test-table-td-5-4"]').should('contain', '2023-11-06');

    cy.get('[data-ouia-component-id="test-table-th-4"]')
      .find('button')
      .click();
    cy.get('[data-ouia-component-id="test-table-td-0-4"]').should('contain', '2023-11-06');
    cy.get('[data-ouia-component-id="test-table-td-5-4"]').should('contain', '2023-11-01');
  });
});
