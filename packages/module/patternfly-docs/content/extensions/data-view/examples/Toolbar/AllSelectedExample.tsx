import React, { useMemo, useState } from 'react';
import { Pagination, ToggleGroup, ToggleGroupItem } from '@patternfly/react-core';
import { useDataViewPagination, useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { BulkSelect, BulkSelectValue } from '@patternfly/react-component-groups';

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

export const BasicExample: React.FunctionComponent = () => {
  const pagination = useDataViewPagination({ perPage: 5 });
  const selection = useDataViewSelection({ matchOption: (a, b) => a[0] === b[0] });
  const [ selectedToggle, setSelectedToggle ] = useState('all')
  const { selected, onSelect } = selection;
  const { page, perPage, onSetPage } = pagination;

  const pageRows = useMemo(() => (selectedToggle === 'selected' ? selected : rows).slice((page - 1) * perPage, ((page - 1) * perPage) + perPage), [ page, perPage, selectedToggle ]);

  const handleBulkSelect = (value: BulkSelectValue) => {
    value === BulkSelectValue.none && onSelect(false);
    value === BulkSelectValue.all && onSelect(true, rows);
  };
    
  const handleItemClick = (event, _isSelected: boolean) => {
    const id = event.currentTarget.id;
    if (selectedToggle !== id) {
      setSelectedToggle(id);
      onSetPage(undefined, 1);
    }
  };

  return (
    <DataView selection={selection}>
      <DataViewToolbar 
        ouiaId='DataViewHeader'
        bulkSelect={
          <BulkSelect
            canSelectAll
            isDataPaginated={false}
            totalCount={repositories.length}
            selectedCount={selected.length}
            onSelect={handleBulkSelect}
          />
        } 
        toggleGroup={<ToggleGroup aria-label="Default with single selectable">
          <ToggleGroupItem
            text="All"
            buttonId="all"
            isSelected={selectedToggle === 'all'}
            onChange={handleItemClick}
          />
          <ToggleGroupItem
            isDisabled={selected.length === 0}
            text="Selected"
            buttonId="selected"
            isSelected={selectedToggle === 'selected'}
            onChange={handleItemClick}
          />
        </ToggleGroup>
        }
        pagination={<Pagination perPageOptions={perPageOptions} itemCount={repositories.length} {...pagination} />} 
      />
      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={pageRows} />
    </DataView>
  );
};

