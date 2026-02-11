import React, { useMemo } from 'react';
import { Pagination } from '@patternfly/react-core';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { TreeViewDataItem } from '@patternfly/react-core';
import { useDataViewFilters, useDataViewPagination } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewFilters } from '@patternfly/react-data-view/dist/dynamic/DataViewFilters';
import { DataViewTreeFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewTreeFilter';

const perPageOptions = [
  { title: '5', value: 5 },
  { title: '10', value: 10 }
];

interface Repository {
  name: string;
  workspace: string;
  tags: string[];
  os: string;
  lastSeen: string;
}

interface RepositoryFilters {
  name: string;
  workspace: string[];
  os: string[];
  tags: string[];
}

const repositories: Repository[] = [
  { name: 'Server-001', workspace: 'Development Workspace', tags: ['web', 'frontend'], os: 'Ubuntu 22.04', lastSeen: '2 hours ago' },
  { name: 'Server-002', workspace: 'Development Workspace', tags: ['api', 'backend'], os: 'RHEL 9', lastSeen: '5 hours ago' },
  { name: 'Server-003', workspace: 'Development Workspace', tags: ['database'], os: 'Windows Server 2022', lastSeen: '1 day ago' },
  { name: 'Server-004', workspace: 'Production Workspace', tags: ['web', 'frontend'], os: 'Ubuntu 22.04', lastSeen: '30 minutes ago' },
  { name: 'Server-005', workspace: 'Production Workspace', tags: ['api', 'backend'], os: 'Debian 12', lastSeen: '1 hour ago' },
  { name: 'Server-006', workspace: 'Production Workspace', tags: ['monitoring'], os: 'macOS Ventura', lastSeen: '3 hours ago' },
  { name: 'Server-007', workspace: 'Production Workspace', tags: ['cache'], os: 'macOS Sonoma', lastSeen: '2 days ago' },
  { name: 'Server-008', workspace: 'Testing Workspace', tags: ['test', 'frontend'], os: 'CentOS 8', lastSeen: '6 hours ago' },
  { name: 'Server-009', workspace: 'Testing Workspace', tags: ['test', 'backend'], os: 'Fedora 38', lastSeen: '4 hours ago' }
];


const osOptions: TreeViewDataItem[] = [
  {
    name: 'Linux',
    id: 'os-linux',
    checkProps: { 'aria-label': 'linux-check', checked: false },
    children: [
      {
        name: 'Ubuntu 22.04',
        id: 'os-ubuntu',
        checkProps: { checked: false }
      },
      {
        name: 'RHEL 9',
        id: 'os-rhel',
        checkProps: { checked: false }
      },
      {
        name: 'Debian 12',
        id: 'os-debian',
        checkProps: { checked: false }
      },
      {
        name: 'CentOS 8',
        id: 'os-centos',
        checkProps: { checked: false }
      },
      {
        name: 'Fedora 38',
        id: 'os-fedora',
        checkProps: { checked: false }
      }
    ],
    defaultExpanded: true
  },
  {
    name: 'Windows',
    id: 'os-windows',
    checkProps: { 'aria-label': 'windows-check', checked: false },
    children: [
      {
        name: 'Windows Server 2022',
        id: 'os-windows-2022',
        checkProps: { checked: false }
      }
    ]
  },
  {
    name: 'macOS',
    id: 'os-macos',
    checkProps: { 'aria-label': 'macos-check', checked: false },
    children: [
      {
        name: 'macOS Ventura',
        id: 'os-macos-ventura',
        checkProps: { checked: false }
      },
      {
        name: 'macOS Sonoma',
        id: 'os-macos-sonoma',
        checkProps: { checked: false }
      }
    ]
  }
];

const tagOptions: TreeViewDataItem[] = [
  {
    name: 'Environment',
    id: 'tags-env',
    checkProps: { 'aria-label': 'env-check', checked: false },
    children: [
      {
        name: 'web',
        id: 'tag-web',
        checkProps: { checked: false }
      },
      {
        name: 'api',
        id: 'tag-api',
        checkProps: { checked: false }
      },
      {
        name: 'database',
        id: 'tag-database',
        checkProps: { checked: false }
      }
    ],
    defaultExpanded: true
  },
  {
    name: 'Layer',
    id: 'tags-layer',
    checkProps: { 'aria-label': 'layer-check', checked: false },
    children: [
      {
        name: 'frontend',
        id: 'tag-frontend',
        checkProps: { checked: false }
      },
      {
        name: 'backend',
        id: 'tag-backend',
        checkProps: { checked: false }
      }
    ]
  },
  {
    name: 'Other',
    id: 'tags-other',
    checkProps: { 'aria-label': 'other-check', checked: false },
    children: [
      {
        name: 'monitoring',
        id: 'tag-monitoring',
        checkProps: { checked: false }
      },
      {
        name: 'cache',
        id: 'tag-cache',
        checkProps: { checked: false }
      },
      {
        name: 'test',
        id: 'tag-test',
        checkProps: { checked: false }
      }
    ]
  }
];

const columns = ['Name', 'Workspace', 'Tags', 'OS', 'Last seen'];

const ouiaId = 'TreeFilterExample';

const MyTable: React.FunctionComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, onSetFilters, clearAllFilters } = useDataViewFilters<RepositoryFilters>({
    initialFilters: { name: '', workspace: [], os: [], tags: [] },
    searchParams,
    setSearchParams,
  });
  const pagination = useDataViewPagination({ perPage: 5 });
  const { page, perPage } = pagination;

  const filteredData = useMemo(
    () =>
      repositories.filter(
        (item) =>
          (!filters.name || item.name?.toLocaleLowerCase().includes(filters.name?.toLocaleLowerCase())) &&
          (!filters.workspace || filters.workspace.length === 0 || filters.workspace.includes(item.workspace)) &&
          (!filters.os || filters.os.length === 0 || filters.os.includes(item.os)) &&
          (!filters.tags || filters.tags.length === 0 || filters.tags.some(tag => item.tags.includes(tag)))
      ),
    [filters]
  );

  const pageRows = useMemo(
    () =>
      filteredData
        .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
        .map((item) => [item.name, item.workspace, item.tags.join(', '), item.os, item.lastSeen]),
    [page, perPage, filteredData]
  );

  return (
    <DataView>
      <DataViewToolbar
        ouiaId="TreeFilterExampleHeader"
        clearAllFilters={clearAllFilters}
        pagination={<Pagination perPageOptions={perPageOptions} itemCount={filteredData.length} {...pagination} />}
        filters={
          <DataViewFilters onChange={(_e, values) => onSetFilters(values)} values={filters}>
            <DataViewTreeFilter
              filterId="os"
              title="Operating System"
              items={osOptions}
              defaultExpanded={false}
            />
            <DataViewTreeFilter
              filterId="tags"
              title="Tags"
              items={tagOptions}
              defaultExpanded={false}
              defaultSelected={['tag-web', 'tag-api']}
            />
          </DataViewFilters>
        }
      />
      <DataViewTable aria-label="Repositories table" ouiaId={ouiaId} columns={columns} rows={pageRows} />
      <DataViewToolbar
        ouiaId="TreeFilterExampleFooter"
        pagination={
          <Pagination isCompact variant="bottom" perPageOptions={perPageOptions} itemCount={filteredData.length} {...pagination} />
        }
      />
    </DataView>
  );
};

export const TreeFilterExample: React.FunctionComponent = () => (
  <BrowserRouter>
    <MyTable />
  </BrowserRouter>
);
