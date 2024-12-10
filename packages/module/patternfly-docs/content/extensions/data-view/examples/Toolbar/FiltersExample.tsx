import React, { useMemo } from 'react';
import { Pagination } from '@patternfly/react-core';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { useDataViewFilters, useDataViewPagination } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewFilterOption, DataViewFilters } from '@patternfly/react-data-view/dist/dynamic/DataViewFilters';
import { DataViewTextFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewTextFilter';
import { DataViewCheckboxFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewCheckboxFilter';

const perPageOptions = [
  { title: '5', value: 5 },
  { title: '10', value: 10 }
];

interface Repository {
  name: string;
  branch: string | null;
  prs: string | null;
  workspace: string;
  lastCommit: string;
}

interface RepositoryFilters {
  name: string,
  branch: string,
  workspace: string[]
}

const repositories: Repository[] = [
  { name: 'Repository one', branch: 'Branch one', prs: 'Pull request one', workspace: 'Workspace one', lastCommit: 'Timestamp one' },
  { name: 'Repository two', branch: 'Branch two', prs: 'Pull request two', workspace: 'Workspace two', lastCommit: 'Timestamp two' },
  { name: 'Repository three', branch: 'Branch three', prs: 'Pull request three', workspace: 'Workspace one', lastCommit: 'Timestamp three' },
  { name: 'Repository four', branch: 'Branch four', prs: 'Pull request four', workspace: 'Workspace one', lastCommit: 'Timestamp four' },
  { name: 'Repository five', branch: 'Branch five', prs: 'Pull request five', workspace: 'Workspace two', lastCommit: 'Timestamp five' },
  { name: 'Repository six', branch: 'Branch six', prs: 'Pull request six', workspace: 'Workspace three', lastCommit: 'Timestamp six' }
];

const filterOptions: DataViewFilterOption[] = [
  { label: 'Workspace one', value: 'workspace-one' },
  { label: 'Workspace two', value: 'workspace-two' },
  { label: 'Workspace three', value: 'workspace-three' }
];

const columns = [ 'Name', 'Branch', 'Pull requests', 'Workspace', 'Last commit' ];

const ouiaId = 'LayoutExample';

const MyTable: React.FunctionComponent = () => { 
  const [ searchParams, setSearchParams ] = useSearchParams();
  const { filters, onSetFilters, clearAllFilters } = useDataViewFilters<RepositoryFilters>({ initialFilters: { name: '', branch: '', workspace: [] }, searchParams, setSearchParams });
  const pagination = useDataViewPagination({ perPage: 5 });
  const { page, perPage } = pagination;

  const filteredData = useMemo(() => repositories.filter(item => 
    (!filters.name || item.name?.toLocaleLowerCase().includes(filters.name?.toLocaleLowerCase())) &&
    (!filters.branch || item.branch?.toLocaleLowerCase().includes(filters.branch?.toLocaleLowerCase())) &&
    (!filters.workspace || filters.workspace.length === 0 || filters.workspace.includes(String(filterOptions.find(option => option.label === item.workspace)?.value)))
  ), [ filters ]);

  const pageRows = useMemo(() => filteredData
    .slice((page - 1) * perPage, ((page - 1) * perPage) + perPage)
    .map(item => Object.values(item)),
  [ page, perPage, filteredData ]);

  return (
    <DataView>
      <DataViewToolbar
        ouiaId='LayoutExampleHeader'
        clearAllFilters = {clearAllFilters}
        pagination={
          <Pagination 
            perPageOptions={perPageOptions} 
            itemCount={filteredData.length} 
            {...pagination} 
          />
        }
        filters={ 
          <DataViewFilters onChange={(_e, values) => onSetFilters(values)} values={filters}>
            <DataViewTextFilter filterId="name" title='Name' placeholder='Filter by name' />
            <DataViewTextFilter filterId="branch" title='Branch' placeholder='Filter by branch' />
            <DataViewCheckboxFilter filterId="workspace" title='Workspace' placeholder='Filter by workspace' options={filterOptions} />
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
            itemCount={filteredData.length} 
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
