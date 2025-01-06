/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Drawer, DrawerActions, DrawerCloseButton, DrawerContent, DrawerContentBody, DrawerHead, DrawerPanelContent, Title, Content, EmptyState, EmptyStateBody, EmptyStateFooter, EmptyStateActions, Button,  } from '@patternfly/react-core';
import { ActionsColumn, Tbody, Td, ThProps, Tr } from '@patternfly/react-table';
import { BulkSelect, BulkSelectValue } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';
import { Pagination } from '@patternfly/react-core';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { DataViewEventsProvider, EventTypes, useDataViewEventsContext } from '@patternfly/react-data-view/dist/dynamic/DataViewEventsContext';
import { useDataViewPagination, useDataViewSelection, useDataViewFilters, useDataViewSort } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { ResponsiveAction, ResponsiveActions } from '@patternfly/react-component-groups';
import { DataViewFilterOption, DataViewFilters } from '@patternfly/react-data-view/dist/dynamic/DataViewFilters';
import { DataViewTextFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewTextFilter';
import { DataViewCheckboxFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewCheckboxFilter';
import { CubesIcon } from '@patternfly/react-icons';

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
};

interface RepositoryFilters {
  name: string,
  branch: string,
  workspace: string[]
};

const repositories: Repository[] = [
  { name: 'Repository one', branch: 'Branch one', prs: 'Pull request one', workspace: 'Workspace one', lastCommit: 'Timestamp one' },
  { name: 'Repository two', branch: 'Branch two', prs: 'Pull request two', workspace: 'Workspace two', lastCommit: 'Timestamp two' },
  { name: 'Repository three', branch: 'Branch three', prs: 'Pull request three', workspace: 'Workspace three', lastCommit: 'Timestamp three' },
  { name: 'Repository four', branch: 'Branch four', prs: 'Pull request four', workspace: 'Workspace four', lastCommit: 'Timestamp four' },
  { name: 'Repository five', branch: 'Branch five', prs: 'Pull request five', workspace: 'Workspace five', lastCommit: 'Timestamp five' },
  { name: 'Repository six', branch: 'Branch six', prs: 'Pull request six', workspace: 'Workspace six', lastCommit: 'Timestamp six' }
];

const filterOptions: DataViewFilterOption[] = [
  { label: 'Workspace one', value: 'workspace-one' },
  { label: 'Workspace two', value: 'workspace-two' },
  { label: 'Workspace three', value: 'workspace-three' }
];

const COLUMNS = [
  { label: 'Repository', key: 'name', index: 0 },
  { label: 'Branch', key: 'branches', index: 1 },
  { label: 'Pull request', key: 'prs', index: 2 },
  { label: 'Workspace', key: 'workspaces', index: 3 },
  { label: 'Last commit', key: 'lastCommit', index: 4 }
];

const ouiaId = 'LayoutExample';

const sortData = (data: Repository[], sortBy: string | undefined, direction: 'asc' | 'desc' | undefined) =>
  sortBy && direction
    ? [ ...data ].sort((a, b) =>
      direction === 'asc'
        ? a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0
        : a[sortBy] > b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0
    )
    : data;

const empty = (
  <Tbody>
    <Tr key="loading" ouiaId={`${ouiaId}-tr-loading`}>
      <Td colSpan={COLUMNS.length}>
        <EmptyState headingLevel="h4" icon={CubesIcon} titleText="No data found">
          <EmptyStateBody>There are no matching data to be displayed.</EmptyStateBody>
          <EmptyStateFooter>
            <EmptyStateActions>
              <Button variant="primary">Primary action</Button>
            </EmptyStateActions>
            <EmptyStateActions>
              <Button variant="link">Multiple</Button>
              <Button variant="link">Action Buttons</Button>
            </EmptyStateActions>
          </EmptyStateFooter>
        </EmptyState>
      </Td>
    </Tr>
  </Tbody>
);

interface RepositoryDetailProps {
  selectedRepo?: Repository;
  setSelectedRepo: React.Dispatch<React.SetStateAction<Repository | undefined>>;
}

const RepositoryDetail: React.FunctionComponent<RepositoryDetailProps> = ({ selectedRepo, setSelectedRepo }) => {
  const context = useDataViewEventsContext();

  useEffect(() => {
    const unsubscribe = context.subscribe(EventTypes.rowClick, (repo: Repository) => {
      setSelectedRepo(repo);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DrawerPanelContent>
      <DrawerHead>
        <Title className="pf-v5-u-mb-md" headingLevel="h2" ouiaId="detail-drawer-title">
          Detail of {selectedRepo?.name}
        </Title>
        <Content component="p">Branch: {selectedRepo?.branch}</Content>
        <Content component="p">Pull requests: {selectedRepo?.prs}</Content>
        <Content component="p">Workspace: {selectedRepo?.workspace}</Content>
        <Content component="p">Last commit: {selectedRepo?.lastCommit}</Content>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setSelectedRepo(undefined)} data-ouia-component-id="detail-drawer-close-btn"/>
        </DrawerActions>
      </DrawerHead>
    </DrawerPanelContent>
  );
};

interface RepositoriesTableProps {
  selectedRepo?: Repository;
}

const rowActions = [
  {
    title: 'Some action',
    onClick: () => console.log('clicked on Some action')  // eslint-disable-line no-console
  },
  {
    title: <div>Another action</div>,
    onClick: () => console.log('clicked on Another action')  // eslint-disable-line no-console
  },
  {
    isSeparator: true
  },
  {
    title: 'Third action',
    onClick: () => console.log('clicked on Third action')  // eslint-disable-line no-console
  }
];

const RepositoriesTable: React.FunctionComponent<RepositoriesTableProps> = ({ selectedRepo = undefined }) => {
  const { filters, onSetFilters, clearAllFilters } = useDataViewFilters<RepositoryFilters>({ initialFilters: { name: '', branch: '', workspace: [] } });
  
  const pagination = useDataViewPagination({ perPage: 5 });
  const { page, perPage } = pagination;

  const selection = useDataViewSelection({ matchOption: (a, b) => a[0] === b[0] });
  const { selected, onSelect, isSelected } = selection;
  
  const { trigger } = useDataViewEventsContext();

  const { sortBy, direction, onSort } = useDataViewSort();
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

  const finalData = useMemo(() => sortData(repositories, sortBy, direction).filter(item => 
    (!filters.name || item.name?.toLocaleLowerCase().includes(filters.name?.toLocaleLowerCase())) &&
    (!filters.branch || item.branch?.toLocaleLowerCase().includes(filters.branch?.toLocaleLowerCase())) &&
    (!filters.workspace || filters.workspace.length === 0 || filters.workspace.includes(String(filterOptions.find(option => option.label === item.workspace)?.value)))
  ), [ filters, sortBy, direction ]);

  const pageRows = useMemo(() => {
    const handleRowClick = (event, repo: Repository | undefined) => {
      // prevents drawer toggle on actions or checkbox click
      (event.target.matches('td') || event.target.matches('tr')) && trigger(EventTypes.rowClick, repo);
    };

    return finalData.map(repo => ({
      row: [ ...Object.values(repo), { cell: <ActionsColumn items={rowActions}/>, props: { isActionCell: true } } ],
      props: {
        isClickable: true,
        onRowClick: (event) => handleRowClick(event, selectedRepo?.name === repo.name ? undefined : repo),
        isRowSelected: selectedRepo?.name === repo.name
      }
    })).slice((page - 1) * perPage, ((page - 1) * perPage) + perPage);
  }, [ selectedRepo?.name, trigger, page, perPage, finalData ]);

  const handleBulkSelect = (value: BulkSelectValue) => {
    value === BulkSelectValue.none && onSelect(false);
    value === BulkSelectValue.nonePage && onSelect(false, pageRows);
    value === BulkSelectValue.page && onSelect(true, pageRows);
  };

  return (
    <DataView selection={selection} activeState={finalData.length > 0 ? undefined : 'empty'}>
      <DataViewToolbar 
        ouiaId='LayoutExampleHeader'
        clearAllFilters={clearAllFilters}
        bulkSelect={
          <BulkSelect
            pageCount={pageRows.length}
            totalCount={repositories.length}
            selectedCount={selected.length}
            pageSelected={pageRows.every(item => isSelected(item))}
            pagePartiallySelected={pageRows.some(item => isSelected(item)) && !pageRows.every(item => isSelected(item))}
            onSelect={handleBulkSelect}
          />
        }
        filters={ 
          <DataViewFilters onChange={(_e, values) => onSetFilters(values)} values={filters}>
            <DataViewTextFilter filterId="name" title='Name' placeholder='Filter by name' />
            <DataViewTextFilter filterId="branch" title='Branch' placeholder='Filter by branch' />
            <DataViewCheckboxFilter filterId="workspace" title='Workspace' placeholder='Filter by workspace' options={filterOptions} />
          </DataViewFilters>
        }
        actions={
          <ResponsiveActions ouiaId="example-actions">
            <ResponsiveAction>Add repository</ResponsiveAction>
            <ResponsiveAction>Delete repository</ResponsiveAction>
          </ResponsiveActions>
        }
        pagination={
          <Pagination
            isCompact
            perPageOptions={perPageOptions} 
            itemCount={repositories.length} 
            {...pagination} 
          />
        } 
      />
      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={pageRows} bodyStates={{ empty }} />
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
};

export const BasicExample: React.FunctionComponent = () => {
  const [ selectedRepo, setSelectedRepo ] = useState<Repository>();
  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <DataViewEventsProvider>
      <Drawer isExpanded={Boolean(selectedRepo)} onExpand={() => drawerRef.current?.focus()} data-ouia-component-id="detail-drawer" >
        <DrawerContent
          panelContent={<RepositoryDetail selectedRepo={selectedRepo} setSelectedRepo={setSelectedRepo} />}
        >
          <DrawerContentBody>
            <RepositoriesTable selectedRepo={selectedRepo} />
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </DataViewEventsProvider>
  );
};
