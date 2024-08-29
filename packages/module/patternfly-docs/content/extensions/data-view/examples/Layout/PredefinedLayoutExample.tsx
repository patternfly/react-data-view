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