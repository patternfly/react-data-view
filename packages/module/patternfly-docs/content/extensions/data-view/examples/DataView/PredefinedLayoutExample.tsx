import React, { useMemo } from 'react';
import { Pagination } from '@patternfly/react-core';
import { useDataViewPagination, useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { BulkSelect, BulkSelectValue } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';

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

const ouiaId = 'LayoutExample';

export const BasicExample: React.FunctionComponent = () => { 
  const pagination = useDataViewPagination({ perPage: 5 });
  const { page, perPage } = pagination;
  const selection = useDataViewSelection({ matchOption: (a, b) => a[0] === b[0] });
  const { selected, onSelect, isSelected } = selection;

  const pageRows = useMemo(() => rows.slice((page - 1) * perPage, ((page - 1) * perPage) + perPage), [ page, perPage ]);

  const handleBulkSelect = (value: BulkSelectValue) => {
    value === BulkSelectValue.none && onSelect(false);
    value === BulkSelectValue.all && onSelect(true, rows);
    value === BulkSelectValue.nonePage && onSelect(false, pageRows);
    value === BulkSelectValue.page && onSelect(true, pageRows);
  };

  return (
    <DataView selection={selection}>
      <DataViewToolbar 
        ouiaId='LayoutExampleHeader' 
        bulkSelect={
          <BulkSelect
            canSelectAll
            pageCount={pageRows.length}
            totalCount={repositories.length}
            selectedCount={selected.length}
            pageSelected={pageRows.every(item => isSelected(item))}
            pagePartiallySelected={pageRows.some(item => isSelected(item)) && !pageRows.every(item => isSelected(item))}
            onSelect={handleBulkSelect}
          />
        } 
        pagination={
          <Pagination 
            perPageOptions={perPageOptions} 
            itemCount={repositories.length} 
            {...pagination} 
          />
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