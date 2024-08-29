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
]

interface Repository {
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
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
  )
}

export const BasicExample: React.FunctionComponent = () => (
  <BrowserRouter>
    <MyTable/>
  </BrowserRouter>
)
