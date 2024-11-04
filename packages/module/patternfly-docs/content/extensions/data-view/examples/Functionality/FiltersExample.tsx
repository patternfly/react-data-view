import React, { useMemo } from 'react';
import { Pagination } from '@patternfly/react-core';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { useDataViewFilters, useDataViewPagination } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewFilters } from '@patternfly/react-data-view/dist/dynamic/DataViewFilters';
import { DataViewTextFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewTextFilter';

const perPageOptions = [
  { title: '5', value: 5 },
  { title: '10', value: 10 }
];

interface Repository {
  name: string;
  branch: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
}

interface RepositoryFilters {
  name: string,
  branch: string
}

const repositories: Repository[] = [
  { name: 'Repository one', branch: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },
  { name: 'Repository two', branch: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },
  { name: 'Repository three', branch: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },
  { name: 'Repository four', branch: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },
  { name: 'Repository five', branch: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },
  { name: 'Repository six', branch: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }
];

const columns = [ 'Name', 'Branch', 'Pull requests', 'Workspaces', 'Last commit' ];

const ouiaId = 'LayoutExample';

const MyTable: React.FunctionComponent = () => { 
  const [ searchParams, setSearchParams ] = useSearchParams();
  const pagination = useDataViewPagination({ perPage: 5 });
  const { page, perPage } = pagination;
  const { filters, onSetFilters, clearAllFilters } = useDataViewFilters<RepositoryFilters>({ initialFilters: { name: '', branch: '' }, searchParams, setSearchParams });

  const pageRows = useMemo(() => repositories
    .filter(item => (!filters.name || item.name?.toLocaleLowerCase().includes(filters.name?.toLocaleLowerCase())) && (!filters.branch || item.branch?.toLocaleLowerCase().includes(filters.branch?.toLocaleLowerCase())))
    .slice((page - 1) * perPage, ((page - 1) * perPage) + perPage)
    .map(item => Object.values(item)), [ page, perPage, filters ]);

  return (
    <DataView>
      <DataViewToolbar
        ouiaId='LayoutExampleHeader'
        clearAllFilters = {clearAllFilters}
        pagination={
          <Pagination 
            perPageOptions={perPageOptions} 
            itemCount={repositories.length} 
            {...pagination} 
          />
        }
        filters={ 
          <DataViewFilters onChange={(_e, values) => onSetFilters(values)} values={filters}>
            <DataViewTextFilter filterId="name" title='Name' placeholder='Filter by name' />
            <DataViewTextFilter filterId="branch" title='Branch' placeholder='Filter by branch' />
          </DataViewFilters>
        }
      />
      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={pageRows} />
      <DataViewToolbar
        ouiaId='LayoutExampleFooter'
        pagination={
          <Pagination 
            isCompact  
            perPageOptions={perPageOptions} 
            itemCount={repositories.length} 
            {...pagination} 
          />
        } 
      />
    </DataView>
  );
}

export const BasicExample: React.FunctionComponent = () => (
  <BrowserRouter>
    <MyTable/>
  </BrowserRouter>
)
