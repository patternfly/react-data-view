/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import { useDataViewSort } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { ThProps } from '@patternfly/react-table';
import { BrowserRouter, useSearchParams } from 'react-router-dom';

interface Repository {
  name: string;
  branches: string;
  prs: string;
  workspaces: string;
  lastCommit: string;
};

const COLUMNS = [
  { label: 'Repository', key: 'name', index: 0 },
  { label: 'Branch', key: 'branches', index: 1 },
  { label: 'Pull request', key: 'prs', index: 2 },
  { label: 'Workspace', key: 'workspaces', index: 3 },
  { label: 'Last commit', key: 'lastCommit', index: 4 }
];

const repositories: Repository[] = [
  { name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },
  { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },
  { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },
  { name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },
  { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },
  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }
];

const sortData = (data: Repository[], sortBy: string | undefined, direction: 'asc' | 'desc' | undefined) =>
  sortBy && direction
    ? [ ...data ].sort((a, b) =>
      direction === 'asc'
        ? a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
        : a[sortBy] > b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0
    )
    : data;

const ouiaId = 'TableExample';

export const MyTable: React.FunctionComponent = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { sortBy, direction, onSort } = useDataViewSort({ searchParams, setSearchParams });
  const sortByIndex = useMemo(() => COLUMNS.findIndex(item => item.key === sortBy), [ sortBy ]);

  const getSortParams = (columnIndex: number): ThProps['sort'] => ({
    sortBy: {
      index: sortByIndex,
      direction,
      defaultDirection: 'asc'
    },
    onSort: (_event, index, direction) => onSort(_event, COLUMNS[index].key, direction),
    columnIndex
  });

  const columns: DataViewTh[] = COLUMNS.map((column, index) => ({
    cell: column.label,
    props: { sort: getSortParams(index) }
  }));

  const rows: DataViewTr[] = useMemo(() => sortData(repositories, sortBy, direction).map(({ name, branches, prs, workspaces, lastCommit }) => [
    name,
    branches,
    prs,
    workspaces,
    lastCommit,
  ]), [ sortBy, direction ]);

  return (
    <DataViewTable
      aria-label="Repositories table"
      ouiaId={ouiaId}
      columns={columns}
      rows={rows}
    />
  );
};

export const BasicExample: React.FunctionComponent = () => (
  <BrowserRouter>
    <MyTable/>
  </BrowserRouter>
)

