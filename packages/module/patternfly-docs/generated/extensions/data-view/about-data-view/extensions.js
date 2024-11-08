import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from '@patternfly/documentation-framework/components';
import { useState, useEffect, useRef, useMemo } from 'react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { Button, Drawer, DrawerContent, DrawerContentBody, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateFooter } from '@patternfly/react-core';
import { CubesIcon, FolderIcon, FolderOpenIcon, LeafIcon, ExclamationCircleIcon } from '@patternfly/react-icons';
import { Table, Tbody, Th, Thead, Tr, Td } from '@patternfly/react-table';
import { BulkSelect, BulkSelectValue,  ErrorState, ResponsiveAction, ResponsiveActions, SkeletonTableHead, SkeletonTableBody } from '@patternfly/react-component-groups';
import { useDataViewPagination, useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { DataView, DataViewState } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { useDataViewEventsContext, DataViewEventsContext, DataViewEventsProvider, EventTypes } from '@patternfly/react-data-view/dist/dynamic/DataViewEventsContext';
const pageData = {
  "id": "About data view",
  "section": "extensions",
  "subsection": "Data view",
  "deprecated": false,
  "template": false,
  "beta": false,
  "demo": false,
  "newImplementationLink": false,
  "source": "extensions",
  "tabName": null,
  "slug": "/extensions/data-view/about-data-view/extensions",
  "sourceLink": "https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/Components/Components.md",
  "relPath": "packages/module/patternfly-docs/content/extensions/data-view/about-data-view.md",
  "propComponents": [
    {
      "name": "DataViewToolbar",
      "description": "",
      "props": [
        {
          "name": "actions",
          "type": "React.ReactNode",
          "description": "React component to display actions"
        },
        {
          "name": "bulkSelect",
          "type": "React.ReactNode",
          "description": "React component to display bulk select"
        },
        {
          "name": "className",
          "type": "string",
          "description": "Toolbar className"
        },
        {
          "name": "ouiaId",
          "type": "string",
          "description": "Custom OUIA ID",
          "defaultValue": "'DataViewToolbar'"
        },
        {
          "name": "pagination",
          "type": "React.ReactNode",
          "description": "React component to display pagination"
        }
      ]
    },
    {
      "name": "DataViewTableBasic",
      "description": "",
      "props": [
        {
          "name": "bodyStates",
          "type": "Partial<Record<DataViewState | string, React.ReactNode>>",
          "description": "Table body states to be displayed when active"
        },
        {
          "name": "columns",
          "type": "DataViewTh[]",
          "description": "Columns definition",
          "required": true
        },
        {
          "name": "headStates",
          "type": "Partial<Record<DataViewState | string, React.ReactNode>>",
          "description": "Table head states to be displayed when active"
        },
        {
          "name": "ouiaId",
          "type": "string",
          "description": "Custom OUIA ID",
          "defaultValue": "'DataViewTableBasic'"
        },
        {
          "name": "rows",
          "type": "DataViewTr[]",
          "description": "Current page rows",
          "required": true
        }
      ]
    },
    {
      "name": "DataViewTableTree",
      "description": "",
      "props": [
        {
          "name": "bodyStates",
          "type": "Partial<Record<DataViewState | string, React.ReactNode>>",
          "description": "Table body states to be displayed when active"
        },
        {
          "name": "collapsedIcon",
          "type": "React.ReactNode",
          "description": "Optional icon for the collapsed parent rows",
          "defaultValue": "null"
        },
        {
          "name": "columns",
          "type": "DataViewTh[]",
          "description": "Columns definition",
          "required": true
        },
        {
          "name": "expandedIcon",
          "type": "React.ReactNode",
          "description": "Optional icon for the expanded parent rows",
          "defaultValue": "null"
        },
        {
          "name": "headStates",
          "type": "Partial<Record<DataViewState | string, React.ReactNode>>",
          "description": "Table head states to be displayed when active"
        },
        {
          "name": "leafIcon",
          "type": "React.ReactNode",
          "description": "Optional icon for the leaf rows",
          "defaultValue": "null"
        },
        {
          "name": "ouiaId",
          "type": "string",
          "description": "Custom OUIA ID",
          "defaultValue": "'DataViewTableTree'"
        },
        {
          "name": "rows",
          "type": "DataViewTrTree[]",
          "description": "Current page rows",
          "required": true
        }
      ]
    },
    {
      "name": "DataView",
      "description": "",
      "props": [
        {
          "name": "activeState",
          "type": "DataViewState | string",
          "description": "Currently active state"
        },
        {
          "name": "children",
          "type": "React.ReactNode",
          "description": "Content rendered inside the data view",
          "required": true
        },
        {
          "name": "ouiaId",
          "type": "string",
          "description": "Custom OUIA ID"
        },
        {
          "name": "selection",
          "type": "DataViewSelection",
          "description": "Selection context configuration"
        }
      ]
    },
    {
      "name": "DataViewState",
      "description": "",
      "props": []
    }
  ],
  "sortValue": 1,
  "examples": [
    "Basic toolbar example",
    "Actions example",
    "Rows and columns customization",
    "Tree table example",
    "Empty state example",
    "Error state example",
    "Loading state example",
    "Layout example",
    "Predefined layout components",
    "Row click subscription example",
    "Pagination example",
    "Selection example"
  ]
};
pageData.liveContext = {
  useState,
  useEffect,
  useRef,
  useMemo,
  BrowserRouter,
  useSearchParams,
  Button,
  Drawer,
  DrawerContent,
  DrawerContentBody,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  CubesIcon,
  FolderIcon,
  FolderOpenIcon,
  LeafIcon,
  ExclamationCircleIcon,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  BulkSelect,
  BulkSelectValue,
  ErrorState,
  ResponsiveAction,
  ResponsiveActions,
  SkeletonTableHead,
  SkeletonTableBody,
  useDataViewPagination,
  useDataViewSelection,
  DataViewToolbar,
  DataViewTable,
  DataView,
  DataViewState,
  useDataViewEventsContext,
  DataViewEventsContext,
  DataViewEventsProvider,
  EventTypes
};
pageData.examples = {
  'Basic toolbar example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { Pagination } from '@patternfly/react-core';\nimport { BulkSelect } from '@patternfly/react-component-groups';\nimport DataViewToolbar from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';\n\n\nexport const BasicExample: React.FunctionComponent = () => (\n  <DataViewToolbar \n    bulkSelect={\n      <BulkSelect\n        selectedCount={0}\n        pageCount={5}\n        onSelect={() => null}\n      />  \n    }\n    pagination={\n      <Pagination page={1} perPage={10} />\n    }\n  />\n)\n","title":"Basic toolbar example","lang":"js","className":""}}>
      
    </Example>,
  'Actions example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { Pagination } from '@patternfly/react-core';\nimport { BulkSelect, ResponsiveAction, ResponsiveActions } from '@patternfly/react-component-groups';\nimport { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';\n\nexport const BasicExample: React.FunctionComponent = () => (\n  <DataViewToolbar \n    bulkSelect={\n      <BulkSelect\n        selectedCount={0}\n        pageCount={5}\n        onSelect={() => null}\n      />  \n    }\n    actions={\n      <ResponsiveActions breakpoint=\"lg\" ouiaId=\"example-actions\">\n        <ResponsiveAction isPersistent variant=\"primary\">Persistent</ResponsiveAction>\n        <ResponsiveAction isPinned variant=\"secondary\">Pinned</ResponsiveAction>\n        <ResponsiveAction>Action three</ResponsiveAction>\n        <ResponsiveAction>Action four</ResponsiveAction>\n      </ResponsiveActions>\n    }\n    pagination={\n      <Pagination page={1} perPage={10} />\n    }\n  />\n)\n","title":"Actions example","lang":"js","className":""}}>
      
    </Example>,
  'Rows and columns customization': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';\nimport { ExclamationCircleIcon } from '@patternfly/react-icons';\nimport { Button } from '@patternfly/react-core';\nimport { ActionsColumn } from '@patternfly/react-table';\n\ninterface Repository {\n  id: number;\n  name: string;\n  branches: string | null;\n  prs: string | null;\n  workspaces: string;\n  lastCommit: string;\n}\n\nconst repositories: Repository[] = [\n  { id: 1, name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },\n  { id: 2, name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },\n  { id: 3, name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },\n  { id: 4, name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },\n  { id: 5, name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },\n  { id: 6, name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }\n];\n\nconst rowActions = [\n  {\n    title: 'Some action',\n    onClick: () => console.log('clicked on Some action')  // eslint-disable-line no-console\n  },\n  {\n    title: <div>Another action</div>,\n    onClick: () => console.log('clicked on Another action')  // eslint-disable-line no-console\n  },\n  {\n    isSeparator: true\n  },\n  {\n    title: 'Third action',\n    onClick: () => console.log('clicked on Third action')  // eslint-disable-line no-console\n  }\n];\n\n// you can also pass props to Tr by returning { row: DataViewTd[], props: TrProps } }\nconst rows: DataViewTr[] = repositories.map(({ id, name, branches, prs, workspaces, lastCommit }) => [\n  { id, cell: workspaces, props: { favorites: { isFavorited: true } } },\n  { cell: <Button href='#' variant='link' isInline>{name}</Button> },\n  branches,\n  prs,\n  workspaces,\n  lastCommit,\n  { cell: <ActionsColumn items={rowActions}/>, props: { isActionCell: true } },\n]);\n\nconst columns: DataViewTh[] = [\n  null,\n  'Repositories', \n  { cell: <>Branches<ExclamationCircleIcon className='pf-v5-u-ml-sm' color=\"var(--pf-t--temp--dev--tbd)\"/* CODEMODS: original v5 color was --pf-v5-global--danger-color--100 *//></> }, \n  'Pull requests', \n  { cell: 'Workspaces', props: { info: { tooltip: 'More information' } } }, \n  { cell: 'Last commit', props: { sort: { sortBy: {}, columnIndex: 4 } } },\n];\n\nconst ouiaId = 'TableExample';\n\nexport const BasicExample: React.FunctionComponent = () => (\n  <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} />\n);\n","title":"Rows and columns customization","lang":"js","className":""}}>
      
      <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
        {`This example shows possible formats of `}
        
        <code {...{"className":"ws-code "}}>
          {`rows`}
        </code>
        {` and `}
        
        <code {...{"className":"ws-code "}}>
          {`columns`}
        </code>
        {` passed to the `}
        
        <code {...{"className":"ws-code "}}>
          {`DataViewTable`}
        </code>
        {` which allow you various customizations of the table head and body.`}
      </p>
    </Example>,
  'Tree table example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';\nimport { DataViewTable, DataViewTh, DataViewTrTree } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';\nimport { useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';\nimport { FolderIcon, FolderOpenIcon, LeafIcon } from '@patternfly/react-icons';\n\ninterface Repository {\n  name: string;\n  branches: string | null;\n  prs: string | null;\n  workspaces: string;\n  lastCommit: string;\n  children?: Repository[];\n}\n\nconst repositories: Repository[] = [\n  { \n    name: 'Repository one',\n    branches: 'Branch one',\n    prs: 'Pull request one',\n    workspaces: 'Workspace one',\n    lastCommit: 'Timestamp one',\n    children: [\n      { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },\n      { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },\n    ]\n  },\n  { \n    name: 'Repository four',\n    branches: 'Branch four',\n    prs: 'Pull request four',\n    workspaces: 'Workspace four',\n    lastCommit: 'Timestamp four',\n    children: [ { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' } ]\n  },\n  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }\n];\n\nconst buildRows = (repositories: Repository[]): DataViewTrTree[] => repositories.map((repo) => ({\n  row: [ repo.name, repo.branches, repo.prs, repo.workspaces, repo.lastCommit ],\n  id: repo.name, // unique ID for each row\n  ...(repo.children\n    ? { \n      children: buildRows(repo.children) // build rows for children\n    } \n    : {})\n}));\n\nconst rows: DataViewTrTree[] = buildRows(repositories);\n\nconst columns: DataViewTh[] = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];\n\nconst ouiaId = 'TreeTableExample';\n\nexport const BasicExample: React.FunctionComponent = () => {\n  const selection = useDataViewSelection({ matchOption: (a, b) => a.id === b.id });\n\n  return (\n    <DataView selection={selection}>\n      <DataViewTable \n        isTreeTable \n        ouiaId={ouiaId}\n        columns={columns} \n        rows={rows}\n        leafIcon={<LeafIcon/>}\n        expandedIcon={<FolderOpenIcon aria-hidden />}\n        collapsedIcon={<FolderIcon aria-hidden />} \n      />\n    </DataView>\n  );\n}\n","title":"Tree table example","lang":"js","className":""}}>
      
      <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
        {`This example shows the tree table variant with expandable rows, custom icons for leaf and parent nodes. Tree table is turned on by passing `}
        
        <code {...{"className":"ws-code "}}>
          {`isTreeTable`}
        </code>
        {` flag to the `}
        
        <code {...{"className":"ws-code "}}>
          {`DataViewTable`}
        </code>
        {` component. You can pass `}
        
        <code {...{"className":"ws-code "}}>
          {`collapsedIcon`}
        </code>
        {`, `}
        
        <code {...{"className":"ws-code "}}>
          {`expandedIcon`}
        </code>
        {` or `}
        
        <code {...{"className":"ws-code "}}>
          {`leafIcon`}
        </code>
        {` to be displayen rows with given status. The tree table rows have to be defined in a format of object with following keys:`}
      </p>
      
      <ul {...{"className":"pf-v6-c-content--ul pf-m-editorial ws-ul "}}>
        

        
        <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
          
          <code {...{"className":"ws-code "}}>
            {`row`}
          </code>
          {` (`}
          
          <code {...{"className":"ws-code "}}>
            {`DataViewTd[]`}
          </code>
          {`) defining the content for each cell in the row.`}
        </li>
        

        
        <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
          
          <code {...{"className":"ws-code "}}>
            {`id`}
          </code>
          {` (`}
          
          <code {...{"className":"ws-code "}}>
            {`string`}
          </code>
          {`) for the row (used to match items in selection end expand the rows).`}
        </li>
        

        
        <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
          {`optional `}
          
          <code {...{"className":"ws-code "}}>
            {`children`}
          </code>
          {` (`}
          
          <code {...{"className":"ws-code "}}>
            {`DataViewTrTree[]`}
          </code>
          {`) defining the children rows.`}
        </li>
        

      </ul>
      
      <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
        {`It is also possible to disable row selection using the `}
        
        <code {...{"className":"ws-code "}}>
          {`isSelectDisabled`}
        </code>
        {` function passed to the wrapping data view component.`}
      </p>
    </Example>,
  'Empty state example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { DataView, DataViewState } from '@patternfly/react-data-view/dist/dynamic/DataView';\nimport { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';\nimport { CubesIcon } from '@patternfly/react-icons';\nimport { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateFooter,  } from '@patternfly/react-core';\nimport { Tbody, Td, Tr } from '@patternfly/react-table';\n\ninterface Repository {\n  id: number;\n  name: string;\n  branches: string | null;\n  prs: string | null;\n  workspaces: string;\n  lastCommit: string;\n}\n\nconst repositories: Repository[] = [];\n\n// you can also pass props to Tr by returning { row: DataViewTd[], props: TrProps } }\nconst rows: DataViewTr[] = repositories.map((repository) => Object.values(repository));\n\nconst columns: DataViewTh[] = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];\n\nconst ouiaId = 'TableExample';\n\nconst empty = (\n  <Tbody>\n    <Tr key=\"loading\" ouiaId={`${ouiaId}-tr-loading`}>\n      <Td colSpan={columns.length}>\n        <EmptyState  headingLevel=\"h4\" icon={CubesIcon} titleText=\"No data found\">\n          <EmptyStateBody>There are no matching data to be displayed.</EmptyStateBody>\n          <EmptyStateFooter>\n            <EmptyStateActions>\n              <Button variant=\"primary\">Primary action</Button>\n            </EmptyStateActions>\n            <EmptyStateActions>\n              <Button variant=\"link\">Multiple</Button>\n              <Button variant=\"link\">Action Buttons</Button>\n            </EmptyStateActions>\n          </EmptyStateFooter>\n        </EmptyState>\n      </Td>\n    </Tr>\n  </Tbody>\n);\n\nexport const BasicExample: React.FunctionComponent = () => (\n  <DataView activeState={DataViewState.empty}>\n    <DataViewTable \n      aria-label='Repositories table' \n      ouiaId={ouiaId}\n      columns={columns}\n      rows={rows}\n      bodyStates={{ empty }}\n    />\n  </DataView>\n);\n","title":"Empty state example","lang":"js","className":""}}>
      
      <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
        {`The data view table supports displaying a custom empty state. You can pass it using the the `}
        
        <code {...{"className":"ws-code "}}>
          {`headStates`}
        </code>
        {` and `}
        
        <code {...{"className":"ws-code "}}>
          {`bodyStates`}
        </code>
        {` properties and their `}
        
        <code {...{"className":"ws-code "}}>
          {`empty`}
        </code>
        {` key. It will be automatically displayed in case there are no rows to be rendered.`}
      </p>
    </Example>,
  'Error state example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { DataView, DataViewState } from '@patternfly/react-data-view/dist/dynamic/DataView';\nimport { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';\nimport { ErrorState } from '@patternfly/react-component-groups';\nimport { Tbody, Td, Tr } from '@patternfly/react-table';\n\ninterface Repository {\n  id: number;\n  name: string;\n  branches: string | null;\n  prs: string | null;\n  workspaces: string;\n  lastCommit: string;\n}\n\nconst repositories: Repository[] = [];\n\n// you can also pass props to Tr by returning { row: DataViewTd[], props: TrProps } }\nconst rows: DataViewTr[] = repositories.map((repository) => Object.values(repository));\n\nconst columns: DataViewTh[] = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];\n\nconst ouiaId = 'TableErrorExample';\n\nconst error = (\n  <Tbody>\n    <Tr key=\"loading\" ouiaId={`${ouiaId}-tr-loading`}>\n      <Td colSpan={columns.length}>\n        <ErrorState titleText='Unable to load data' bodyText='There was an error retrieving data. Check your connection and reload the page.' />\n      </Td>\n    </Tr>\n  </Tbody>\n);\n\nexport const BasicExample: React.FunctionComponent = () => (\n  <DataView activeState={DataViewState.error}>\n    <DataViewTable \n      aria-label='Repositories table' \n      ouiaId={ouiaId}\n      columns={columns}\n      rows={rows}\n      bodyStates={{ error }}\n    />\n  </DataView>\n);\n","title":"Error state example","lang":"js","className":""}}>
      
      <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
        {`The data view table also supports displaying an error state. You can pass it using the the `}
        
        <code {...{"className":"ws-code "}}>
          {`headStates`}
        </code>
        {` and `}
        
        <code {...{"className":"ws-code "}}>
          {`bodyStates`}
        </code>
        {` properties and their `}
        
        <code {...{"className":"ws-code "}}>
          {`error`}
        </code>
        {` key. It will be displayed in case the data view recieves its `}
        
        <code {...{"className":"ws-code "}}>
          {`state`}
        </code>
        {` property set to `}
        
        <code {...{"className":"ws-code "}}>
          {`error`}
        </code>
        {`.`}
      </p>
    </Example>,
  'Loading state example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { DataView, DataViewState } from '@patternfly/react-data-view/dist/dynamic/DataView';\nimport { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';\nimport { SkeletonTableBody, SkeletonTableHead } from '@patternfly/react-component-groups';\n\n// you can also pass props to Tr by returning { row: DataViewTd[], props: TrProps } }\nconst rows: DataViewTr[] = [];\n\nconst columns: DataViewTh[] = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];\n\nconst ouiaId = 'TableExample';\n\nconst headLoading = <SkeletonTableHead columns={columns} />\nconst bodyLoading = <SkeletonTableBody rowsCount={5} columnsCount={columns.length} />;\n\nexport const BasicExample: React.FunctionComponent = () => (\n  <DataView activeState={DataViewState.loading}>\n    <DataViewTable\n      aria-label='Repositories table' \n      ouiaId={ouiaId}\n      columns={columns}\n      rows={rows}\n      headStates={{ loading: headLoading }}\n      bodyStates={{ loading: bodyLoading }}\n    />\n  </DataView>\n);\n","title":"Loading state example","lang":"js","className":""}}>
      
      <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
        {`The data view table also supports displaying a custom loading state. You can pass it using the `}
        
        <code {...{"className":"ws-code "}}>
          {`headStates`}
        </code>
        {` and `}
        
        <code {...{"className":"ws-code "}}>
          {`bodyStates`}
        </code>
        {` properties and their `}
        
        <code {...{"className":"ws-code "}}>
          {`loading`}
        </code>
        {` key. Your state will be displayed in case the data view recieves its `}
        
        <code {...{"className":"ws-code "}}>
          {`state`}
        </code>
        {` property set to `}
        
        <code {...{"className":"ws-code "}}>
          {`loading`}
        </code>
        {`.`}
      </p>
    </Example>,
  'Layout example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport DataView from '@patternfly/react-data-view/dist/dynamic/DataView';\n\nconst layoutItemStyling = {\n  width: '100%',\n  height: '5rem',\n  padding: 'var(--pf-t--global--spacer--md)',\n  border: 'var(--pf-t--global--border--width--box--default) dashed var(--pf-t--global--border--color--default)'\n};\n\nexport const BasicExample: React.FunctionComponent = () => (\n  <DataView>\n    <div style={layoutItemStyling}>Header</div>\n    <div style={layoutItemStyling}>Data representation</div>\n    <div style={layoutItemStyling}>Footer</div>\n  </DataView>\n)\n","title":"Layout example","lang":"js","className":""}}>
      
      <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
        {`Data view is expected to consist of header, data part and footer stacked below each other and passed as `}
        
        <code {...{"className":"ws-code "}}>
          {`children`}
        </code>
        {`.`}
      </p>
    </Example>,
  'Predefined layout components': props => 
    <Example {...pageData} {...props} {...{"code":"import React, { useMemo } from 'react';\nimport { Pagination } from '@patternfly/react-core';\nimport { useDataViewPagination, useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';\nimport { BulkSelect, BulkSelectValue } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';\nimport { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';\nimport { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';\nimport { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';\n\nconst perPageOptions = [\n  { title: '5', value: 5 },\n  { title: '10', value: 10 }\n];\n\ninterface Repository {\n  name: string;\n  branches: string | null;\n  prs: string | null;\n  workspaces: string;\n  lastCommit: string;\n}\n\nconst repositories: Repository[] = [\n  { name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },\n  { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },\n  { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },\n  { name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },\n  { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },\n  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }\n];\n\nconst rows = repositories.map(item => Object.values(item));\n\nconst columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];\n\nconst ouiaId = 'LayoutExample';\n\nexport const BasicExample: React.FunctionComponent = () => { \n  const pagination = useDataViewPagination({ perPage: 5 });\n  const { page, perPage } = pagination;\n  const selection = useDataViewSelection({ matchOption: (a, b) => a[0] === b[0] });\n  const { selected, onSelect, isSelected } = selection;\n\n  const pageRows = useMemo(() => rows.slice((page - 1) * perPage, ((page - 1) * perPage) + perPage), [ page, perPage ]);\n\n  const handleBulkSelect = (value: BulkSelectValue) => {\n    value === BulkSelectValue.none && onSelect(false);\n    value === BulkSelectValue.all && onSelect(true, rows);\n    value === BulkSelectValue.nonePage && onSelect(false, pageRows);\n    value === BulkSelectValue.page && onSelect(true, pageRows);\n  };\n\n  return (\n    <DataView selection={selection}>\n      <DataViewToolbar \n        ouiaId='LayoutExampleHeader' \n        bulkSelect={\n          <BulkSelect\n            canSelectAll\n            pageCount={pageRows.length}\n            totalCount={repositories.length}\n            selectedCount={selected.length}\n            pageSelected={pageRows.every(item => isSelected(item))}\n            pagePartiallySelected={pageRows.some(item => isSelected(item)) && !pageRows.every(item => isSelected(item))}\n            onSelect={handleBulkSelect}\n          />\n        } \n        pagination={\n          <Pagination \n            perPageOptions={perPageOptions} \n            itemCount={repositories.length} \n            {...pagination} \n          />\n        } \n      />\n      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={pageRows} />\n      <DataViewToolbar\n        ouiaId='LayoutExampleFooter'\n        pagination={\n          <Pagination \n            isCompact  \n            perPageOptions={perPageOptions} \n            itemCount={repositories.length} \n            {...pagination} \n          />\n        } \n      />\n    </DataView>\n  );\n}","title":"Predefined layout components","lang":"js","className":""}}>
      
      <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
        {`You can make use of the predefined layout components to display a default header and footer. See `}
        
        <PatternflyThemeLink {...{"to":"/extensions/data-view/components#dataviewtoolbar","className":""}}>
          {`data view toolbar`}
        </PatternflyThemeLink>
        {` for more information`}
      </p>
    </Example>,
  'Row click subscription example': props => 
    <Example {...pageData} {...props} {...{"code":"import React, { useEffect, useState, useRef, useMemo } from 'react';\nimport { Drawer, DrawerActions, DrawerCloseButton, DrawerContent, DrawerContentBody, DrawerHead, DrawerPanelContent, Title, Content } from '@patternfly/react-core';\nimport { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';\nimport { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';\nimport { DataViewEventsProvider, EventTypes, useDataViewEventsContext } from '@patternfly/react-data-view/dist/dynamic/DataViewEventsContext';\n\ninterface Repository {\n  name: string;\n  branches: string | null;\n  prs: string | null;\n  workspaces: string;\n  lastCommit: string;\n}\n\nconst repositories: Repository[] = [\n  { name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },\n  { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },\n  { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },\n  { name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },\n  { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },\n  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }\n];\n\nconst columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];\n\nconst ouiaId = 'ContextExample';\n\ninterface RepositoryDetailProps {\n  selectedRepo?: Repository;\n  setSelectedRepo: React.Dispatch<React.SetStateAction<Repository | undefined>>;\n}\n\nconst RepositoryDetail: React.FunctionComponent<RepositoryDetailProps> = ({ selectedRepo, setSelectedRepo }) => {\n  const context = useDataViewEventsContext();\n\n  useEffect(() => {\n    const unsubscribe = context.subscribe(EventTypes.rowClick, (repo: Repository) => {\n      setSelectedRepo(repo);\n    });\n\n    return () => unsubscribe();\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, []);\n\n  return (\n    <DrawerPanelContent>\n      <DrawerHead>\n        <Title className=\"pf-v5-u-mb-md\" headingLevel=\"h2\" ouiaId=\"detail-drawer-title\">\n          Detail of {selectedRepo?.name}\n        </Title>\n        <Content component=\"p\">Branches: {selectedRepo?.branches}</Content>\n        <Content component=\"p\">Pull requests: {selectedRepo?.prs}</Content>\n        <Content component=\"p\">Workspaces: {selectedRepo?.workspaces}</Content>\n        <Content component=\"p\">Last commit: {selectedRepo?.lastCommit}</Content>\n        <DrawerActions>\n          <DrawerCloseButton onClick={() => setSelectedRepo(undefined)} data-ouia-component-id=\"detail-drawer-close-btn\"/>\n        </DrawerActions>\n      </DrawerHead>\n    </DrawerPanelContent>\n  );\n};\n\ninterface RepositoriesTableProps {\n  selectedRepo?: Repository;\n}\n\nconst RepositoriesTable: React.FunctionComponent<RepositoriesTableProps> = ({ selectedRepo = undefined }) => {\n  const { trigger } = useDataViewEventsContext();\n  const rows = useMemo(() => {\n    const handleRowClick = (repo: Repository | undefined) => {\n      trigger(EventTypes.rowClick, repo);\n    };\n\n    return repositories.map(repo => ({\n      row: Object.values(repo),\n      props: {\n        isClickable: true,\n        onRowClick: () => handleRowClick(selectedRepo?.name === repo.name ? undefined : repo),\n        isRowSelected: selectedRepo?.name === repo.name\n      }\n    }));\n  }, [ selectedRepo?.name, trigger ]);\n\n  return (\n    <DataView>\n      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} />\n    </DataView>\n  );\n};\n\nexport const BasicExample: React.FunctionComponent = () => {\n  const [ selectedRepo, setSelectedRepo ] = useState<Repository>();\n  const drawerRef = useRef<HTMLDivElement>(null);\n\n  return (\n    <DataViewEventsProvider>\n      <Drawer isExpanded={Boolean(selectedRepo)} onExpand={() => drawerRef.current?.focus()} data-ouia-component-id=\"detail-drawer\" >\n        <DrawerContent\n          panelContent={<RepositoryDetail selectedRepo={selectedRepo} setSelectedRepo={setSelectedRepo} />}\n        >\n          <DrawerContentBody>\n            <RepositoriesTable selectedRepo={selectedRepo} />\n          </DrawerContentBody>\n        </DrawerContent>\n      </Drawer>\n    </DataViewEventsProvider>\n  );\n};\n","title":"Row click subscription example","lang":"js","className":""}}>
      
      <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
        {`The following example demonstrates how to use the `}
        
        <code {...{"className":"ws-code "}}>
          {`DataViewEventsContext`}
        </code>
        {` to manage shared state and handle events. The `}
        
        <code {...{"className":"ws-code "}}>
          {`DataViewEventsProvider`}
        </code>
        {` is used to wrap components that need access to the shared context. This example illustrates how to set up a layout that listens for data view row click events and displays detailed information about the selected row in a `}
        
        <PatternflyThemeLink {...{"to":"/components/drawer","className":""}}>
          {`drawer component`}
        </PatternflyThemeLink>
        {`.`}
      </p>
    </Example>,
  'Pagination example': props => 
    <Example {...pageData} {...props} {...{"code":"import React, { useMemo } from 'react';\nimport { Pagination } from '@patternfly/react-core';\nimport { BrowserRouter, useSearchParams } from 'react-router-dom';\nimport { useDataViewPagination } from '@patternfly/react-data-view/dist/dynamic/Hooks';\nimport { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';\nimport { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';\nimport { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';\n\nconst perPageOptions = [\n  { title: '5', value: 5 },\n  { title: '10', value: 10 }\n];\n\ninterface Repository {\n  name: string;\n  branches: string | null;\n  prs: string | null;\n  workspaces: string;\n  lastCommit: string;\n};\n\nconst repositories: Repository[] = [\n  { name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },\n  { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },\n  { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },\n  { name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },\n  { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },\n  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }\n];\n\nconst rows = repositories.map(item => Object.values(item));\n\nconst columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];\n\nconst ouiaId = 'LayoutExample';\n\nconst MyTable: React.FunctionComponent = () => {\n  const [ searchParams, setSearchParams ] = useSearchParams()\n  const pagination = useDataViewPagination({ perPage: 5, searchParams, setSearchParams });\n  const { page, perPage } = pagination;\n\n  const pageRows = useMemo(() => rows.slice((page - 1) * perPage, ((page - 1) * perPage) + perPage), [ page, perPage ]);\n  return (\n    <DataView>\n      <DataViewToolbar ouiaId='DataViewHeader' pagination={<Pagination perPageOptions={perPageOptions} itemCount={repositories.length} {...pagination} />} />\n      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={pageRows} />\n      <DataViewToolbar ouiaId='DataViewFooter' pagination={<Pagination isCompact perPageOptions={perPageOptions} itemCount={repositories.length} {...pagination} />} />\n    </DataView>\n  );\n};\n\nexport const BasicExample: React.FunctionComponent = () => (\n  <BrowserRouter>\n    <MyTable/>\n  </BrowserRouter>\n);\n","title":"Pagination example","lang":"js","className":""}}>
      
    </Example>,
  'Selection example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';\nimport { BulkSelect, BulkSelectValue } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';\nimport { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';\nimport { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';\nimport { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';\n\ninterface Repository {\n  name: string;\n  branches: string | null;\n  prs: string | null;\n  workspaces: string;\n  lastCommit: string;\n}\n\nconst repositories: Repository[] = [\n  { name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },\n  { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },\n  { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },\n  { name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },\n  { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },\n  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }\n];\n\nconst rows = repositories.map(item => Object.values(item));\n\nconst columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];\n\nconst ouiaId = 'LayoutExample';\n\nexport const BasicExample: React.FunctionComponent = () => { \n  const selection = useDataViewSelection({ matchOption: (a, b) => a[0] === b[0] });\n  const { selected, onSelect } = selection;\n\n  const handleBulkSelect = (value: BulkSelectValue) => {\n    value === BulkSelectValue.none && onSelect(false);\n    value === BulkSelectValue.all && onSelect(true, rows);\n  };\n\n  return (\n    <DataView selection={selection}>\n      <DataViewToolbar \n        ouiaId='DataViewHeader'\n        bulkSelect={\n          <BulkSelect\n            canSelectAll\n            isDataPaginated={false}\n            totalCount={repositories.length}\n            selectedCount={selected.length}\n            onSelect={handleBulkSelect}\n          />\n        } \n      />\n      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} />\n    </DataView>\n  );\n}","title":"Selection example","lang":"js","className":""}}>
      
    </Example>
};

const Component = () => (
  <React.Fragment>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      <strong {...{"className":""}}>
        {`Note:`}
      </strong>
      {` Data view lives in its own package `}
      <PatternflyThemeLink {...{"to":"https://www.npmjs.com/package/@patternfly/react-data-view","className":""}}>
        <code {...{"className":"ws-code "}}>
          {`@patternfly/react-data-view`}
        </code>
      </PatternflyThemeLink>
    </p>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`The `}
      <strong {...{"className":""}}>
        {`data view`}
      </strong>
      {` extension contains enables you to display record data in a configured layout.`}
    </p>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`If you notice a bug in the data view extension, or if have a suggestion for improving the extension or documentation, file an issue in `}
      <PatternflyThemeLink {...{"to":"https://github.com/patternfly/react-data-view/issues","className":""}}>
        {`the react-data-view repository`}
      </PatternflyThemeLink>
      {`! Please make sure to check if there is already a pre-existing issue before creating a new issue.`}
    </p>
    <AutoLinkHeader {...{"id":"data-view-toolbar","headingLevel":"h2","className":"ws-title ws-h2"}}>
      {`Data view toolbar`}
    </AutoLinkHeader>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`The `}
      <strong {...{"className":""}}>
        {`data view toolbar`}
      </strong>
      {` component renders a default opinionated data view toolbar above or below the data section.`}
    </p>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`Data view toolbar can contain a `}
      <code {...{"className":"ws-code "}}>
        {`pagination`}
      </code>
      {`, `}
      <code {...{"className":"ws-code "}}>
        {`bulkSelect`}
      </code>
      {`, `}
      <code {...{"className":"ws-code "}}>
        {`actions`}
      </code>
      {` or other children content passed. The preffered way of passing children toolbar items is using the `}
      <PatternflyThemeLink {...{"to":"/components/toolbar#toolbar-items","className":""}}>
        {`toolbar item`}
      </PatternflyThemeLink>
      {` component.`}
    </p>
    {React.createElement(pageData.examples["Basic toolbar example"])}
    <AutoLinkHeader {...{"id":"toolbar-actions","headingLevel":"h1","className":"ws-title ws-h1"}}>
      {`Toolbar actions`}
    </AutoLinkHeader>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`Data view toolbar can display actions using the `}
      <code {...{"className":"ws-code "}}>
        {`actions`}
      </code>
      {` property accepting a React node. You can make use of a predefined `}
      <PatternflyThemeLink {...{"to":"/extensions/component-groups/responsive-actions","className":""}}>
        {`responsive actions`}
      </PatternflyThemeLink>
      {` component from the `}
      <PatternflyThemeLink {...{"to":"/extensions/component-groups/about-component-groups","className":""}}>
        {`component groups`}
      </PatternflyThemeLink>
      {` extension.`}
    </p>
    <AutoLinkHeader {...{"id":"actions-configuration","headingLevel":"h3","className":"ws-title ws-h3"}}>
      {`Actions configuration`}
    </AutoLinkHeader>
    {React.createElement(pageData.examples["Actions example"])}
    <AutoLinkHeader {...{"id":"data-view-table","headingLevel":"h2","className":"ws-title ws-h2"}}>
      {`Data view table`}
    </AutoLinkHeader>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`The `}
      <strong {...{"className":""}}>
        {`data view table`}
      </strong>
      {` component renders your columns and rows definition into a `}
      <PatternflyThemeLink {...{"to":"/components/table","className":""}}>
        {`table`}
      </PatternflyThemeLink>
      {` component.`}
    </p>
    {React.createElement(pageData.examples["Rows and columns customization"])}
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`The `}
      <code {...{"className":"ws-code "}}>
        {`DataViewTable`}
      </code>
      {` component accepts the following props:`}
    </p>
    <ul {...{"className":"pf-v6-c-content--ul pf-m-editorial ws-ul "}}>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
          <code {...{"className":"ws-code "}}>
            {`columns`}
          </code>
          {` defining the column heads of the table. Each item in the array can be a `}
          <code {...{"className":"ws-code "}}>
            {`ReactNode`}
          </code>
          {` (for simple heads) or an object with the following properties:`}
        </p>
        <ul {...{"className":"pf-v6-c-content--ul pf-m-editorial ws-ul "}}>
          <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
            <code {...{"className":"ws-code "}}>
              {`cell`}
            </code>
            {` (`}
            <code {...{"className":"ws-code "}}>
              {`ReactNode`}
            </code>
            {`) content to display in the column head.`}
          </li>
          <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
            {`optional `}
            <code {...{"className":"ws-code "}}>
              {`props`}
            </code>
            {` (`}
            <code {...{"className":"ws-code "}}>
              {`ThProps`}
            </code>
            {`) to pass to the `}
            <code {...{"className":"ws-code "}}>
              {`<Th>`}
            </code>
            {` component, such as `}
            <code {...{"className":"ws-code "}}>
              {`width`}
            </code>
            {`, `}
            <code {...{"className":"ws-code "}}>
              {`sort`}
            </code>
            {`, and other table head cell properties.`}
          </li>
        </ul>
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
          <code {...{"className":"ws-code "}}>
            {`rows`}
          </code>
          {` defining the rows to be displayed in the table. Each item in the array can be either an array of `}
          <code {...{"className":"ws-code "}}>
            {`DataViewTd`}
          </code>
          {` (for simple rows) or an object with the following properties:`}
        </p>
        <ul {...{"className":"pf-v6-c-content--ul pf-m-editorial ws-ul "}}>
          <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
            <code {...{"className":"ws-code "}}>
              {`row`}
            </code>
            {` (`}
            <code {...{"className":"ws-code "}}>
              {`DataViewTd[]`}
            </code>
            {`) defining the content for each cell in the row.`}
          </li>
          <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
            {`optional `}
            <code {...{"className":"ws-code "}}>
              {`id`}
            </code>
            {` (`}
            <code {...{"className":"ws-code "}}>
              {`string`}
            </code>
            {`) for the row (can be used to match items in selection).`}
          </li>
          <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
            {`optional `}
            <code {...{"className":"ws-code "}}>
              {`props`}
            </code>
            {` (`}
            <code {...{"className":"ws-code "}}>
              {`TrProps`}
            </code>
            {`) to pass to the `}
            <code {...{"className":"ws-code "}}>
              {`<Tr>`}
            </code>
            {` component, such as `}
            <code {...{"className":"ws-code "}}>
              {`isHoverable`}
            </code>
            {`, `}
            <code {...{"className":"ws-code "}}>
              {`isRowSelected`}
            </code>
            {`, and other table row properties.`}
          </li>
        </ul>
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
          {`optional `}
          <code {...{"className":"ws-code "}}>
            {`ouiaId`}
          </code>
        </p>
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
          {`optional `}
          <code {...{"className":"ws-code "}}>
            {`props`}
          </code>
          {` (`}
          <code {...{"className":"ws-code "}}>
            {`TableProps`}
          </code>
          {`) that are passed down to the `}
          <code {...{"className":"ws-code "}}>
            {`<Table>`}
          </code>
          {` component, except for `}
          <code {...{"className":"ws-code "}}>
            {`onSelect`}
          </code>
          {`, which is managed internally.`}
        </p>
      </li>
    </ul>
    {React.createElement(pageData.examples["Tree table example"])}
    {React.createElement(pageData.examples["Empty state example"])}
    {React.createElement(pageData.examples["Error state example"])}
    {React.createElement(pageData.examples["Loading state example"])}
    {React.createElement(pageData.examples["Layout example"])}
    {React.createElement(pageData.examples["Predefined layout components"])}
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`The `}
      <strong {...{"className":""}}>
        {`data view  events context`}
      </strong>
      {` provides a way of listening to the data view events from the outside of the component.`}
    </p>
    {React.createElement(pageData.examples["Row click subscription example"])}
    <AutoLinkHeader {...{"id":"pagination","headingLevel":"h1","className":"ws-title ws-h1"}}>
      {`Pagination`}
    </AutoLinkHeader>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`Allows to display data records on multiple pages and display the pagination state.`}
    </p>
    <AutoLinkHeader {...{"id":"toolbar-usage","headingLevel":"h3","className":"ws-title ws-h3"}}>
      {`Toolbar usage`}
    </AutoLinkHeader>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`Data view toolbar can display a pagination using the `}
      <code {...{"className":"ws-code "}}>
        {`pagination`}
      </code>
      {` property accepting a React node. You can also pass a custom `}
      <code {...{"className":"ws-code "}}>
        {`ouiaId`}
      </code>
      {` for testing purposes.`}
    </p>
    <AutoLinkHeader {...{"id":"pagination-state","headingLevel":"h3","className":"ws-title ws-h3"}}>
      {`Pagination state`}
    </AutoLinkHeader>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`The `}
      <code {...{"className":"ws-code "}}>
        {`useDataViewPagination`}
      </code>
      {` hook manages the pagination state of the data view.`}
    </p>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      <strong {...{"className":""}}>
        {`Initial values:`}
      </strong>
    </p>
    <ul {...{"className":"pf-v6-c-content--ul pf-m-editorial ws-ul "}}>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <code {...{"className":"ws-code "}}>
          {`perPage`}
        </code>
        {` initial value`}
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        {`optional `}
        <code {...{"className":"ws-code "}}>
          {`page`}
        </code>
        {` initial value`}
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        {`optional `}
        <code {...{"className":"ws-code "}}>
          {`searchParams`}
        </code>
        {` object`}
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        {`optional `}
        <code {...{"className":"ws-code "}}>
          {`setSearchParams`}
        </code>
        {` function`}
      </li>
    </ul>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`While the hook works seamlessly with React Router library, you do not need to use it to take advantage of URL persistence. The `}
      <code {...{"className":"ws-code "}}>
        {`searchParams`}
      </code>
      {` and `}
      <code {...{"className":"ws-code "}}>
        {`setSearchParams`}
      </code>
      {` props can be managed using native browser APIs (`}
      <code {...{"className":"ws-code "}}>
        {`URLSearchParams`}
      </code>
      {` and `}
      <code {...{"className":"ws-code "}}>
        {`window.history.pushState`}
      </code>
      {`) or any other routing library of your choice. If you don't pass these two props, the pagination state will be stored internally without the URL usage.`}
    </p>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`You can also pass custom `}
      <code {...{"className":"ws-code "}}>
        {`pageParam`}
      </code>
      {` or `}
      <code {...{"className":"ws-code "}}>
        {`perPageParam`}
      </code>
      {` names, renaming the pagination parameters in the URL.`}
    </p>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`The retrieved values are named to match the PatternFly `}
      <PatternflyThemeLink {...{"to":"/components/pagination","className":""}}>
        {`pagination`}
      </PatternflyThemeLink>
      {` component props, so you can easily spread them to the component.`}
    </p>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      <strong {...{"className":""}}>
        {`Return values:`}
      </strong>
    </p>
    <ul {...{"className":"pf-v6-c-content--ul pf-m-editorial ws-ul "}}>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        {`current `}
        <code {...{"className":"ws-code "}}>
          {`page`}
        </code>
        {` number`}
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <code {...{"className":"ws-code "}}>
          {`onSetPage`}
        </code>
        {` to modify current page`}
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        {`items `}
        <code {...{"className":"ws-code "}}>
          {`perPage`}
        </code>
        {` value`}
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <code {...{"className":"ws-code "}}>
          {`onPerPageSelect`}
        </code>
        {` to modify per page value`}
      </li>
    </ul>
    {React.createElement(pageData.examples["Pagination example"])}
    <AutoLinkHeader {...{"id":"selection","headingLevel":"h1","className":"ws-title ws-h1"}}>
      {`Selection`}
    </AutoLinkHeader>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`Allows to select data records inside the data view and show the selection state.`}
    </p>
    <AutoLinkHeader {...{"id":"toolbar-usage-0","headingLevel":"h3","className":"ws-title ws-h3"}}>
      {`Toolbar usage`}
    </AutoLinkHeader>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`Data view toolbar can display a bulk selection component using the `}
      <code {...{"className":"ws-code "}}>
        {`bulkSelect`}
      </code>
      {` property accepting a React node. You can make use of a predefined `}
      <PatternflyThemeLink {...{"to":"/extensions/component-groups/bulk-select","className":""}}>
        {`bulk select`}
      </PatternflyThemeLink>
      {` component from the `}
      <PatternflyThemeLink {...{"to":"/extensions/component-groups/about-component-groups","className":""}}>
        {`component groups`}
      </PatternflyThemeLink>
      {` extension.`}
    </p>
    <AutoLinkHeader {...{"id":"selection-state","headingLevel":"h3","className":"ws-title ws-h3"}}>
      {`Selection state`}
    </AutoLinkHeader>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      {`The `}
      <code {...{"className":"ws-code "}}>
        {`useDataViewSelection`}
      </code>
      {` hook manages the selection state of the data view.`}
    </p>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      <strong {...{"className":""}}>
        {`Initial values:`}
      </strong>
    </p>
    <ul {...{"className":"pf-v6-c-content--ul pf-m-editorial ws-ul "}}>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        {`optional `}
        <code {...{"className":"ws-code "}}>
          {`initialSelected`}
        </code>
        {` array of record's identifiers selected by default`}
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <code {...{"className":"ws-code "}}>
          {`matchOption`}
        </code>
        {` function to check if given record is selected`}
      </li>
    </ul>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      <em {...{"className":""}}>
        {`When no `}
        <code {...{"className":"ws-code "}}>
          {`matchOption`}
        </code>
        {` is passed, the `}
        <code {...{"className":"ws-code "}}>
          {`Array.prototype.includes()`}
        </code>
        {` operation is performed on the `}
        <code {...{"className":"ws-code "}}>
          {`selected`}
        </code>
        {` array.`}
      </em>
    </p>
    <p {...{"className":"pf-v6-c-content--p pf-m-editorial ws-p "}}>
      <strong {...{"className":""}}>
        {`Return values:`}
      </strong>
    </p>
    <ul {...{"className":"pf-v6-c-content--ul pf-m-editorial ws-ul "}}>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <code {...{"className":"ws-code "}}>
          {`selected`}
        </code>
        {` array of currently selected records`}
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <code {...{"className":"ws-code "}}>
          {`isSelected`}
        </code>
        {` function returning the selection state for given record`}
      </li>
      <li {...{"className":"pf-v6-c-content--li pf-m-editorial ws-li "}}>
        <code {...{"className":"ws-code "}}>
          {`onSelect`}
        </code>
        {` callback to modify the selection state and accepting `}
        <code {...{"className":"ws-code "}}>
          {`isSelecting`}
        </code>
        {` flag indicating if records are changing to selected or deselected and `}
        <code {...{"className":"ws-code "}}>
          {`items`}
        </code>
        {` containing affected records`}
      </li>
    </ul>
    {React.createElement(pageData.examples["Selection example"])}
  </React.Fragment>
);
Component.displayName = 'ExtensionsDataViewAboutDataViewExtensionsDocs';
Component.pageData = pageData;

export default Component;
