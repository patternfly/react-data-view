import React, { useMemo } from 'react';
import { Pagination } from '@patternfly/react-core';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { useDataViewPagination } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';

const perPageOptions = [
  { title: '5', value: 5 },
  { title: '10', value: 10 }
];

interface Repository {
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
};

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

const ouiaId = 'LayoutExample';

const MyTable: React.FunctionComponent = () => {
  const [ searchParams, setSearchParams ] = useSearchParams()
  const pagination = useDataViewPagination({ perPage: 5, searchParams, setSearchParams });
  const { page, perPage } = pagination;

  const pageRows = useMemo(() => rows.slice((page - 1) * perPage, ((page - 1) * perPage) + perPage), [ page, perPage ]);
  return (
    <DataView>
      <DataViewToolbar ouiaId='DataViewHeader' pagination={<Pagination perPageOptions={perPageOptions} itemCount={repositories.length} {...pagination} />} />
      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={pageRows} />
      <DataViewToolbar ouiaId='DataViewFooter' pagination={<Pagination isCompact perPageOptions={perPageOptions} itemCount={repositories.length} {...pagination} />} />
    </DataView>
  );
};

export const BasicExample: React.FunctionComponent = () => (
  <BrowserRouter>
    <MyTable/>
  </BrowserRouter>
);
