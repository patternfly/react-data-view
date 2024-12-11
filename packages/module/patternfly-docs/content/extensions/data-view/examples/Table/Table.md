---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Data view
# Sidenav secondary level section
# should be the same for all markdown files
id: Table
title: Data view table
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
sortValue: 3
propComponents: ['DataViewTableBasic', 'DataViewTableTree', 'DataViewTrTree', 'DataViewTrObject']
sourceLink: https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/Table/Table.md
---
import { useMemo } from 'react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateFooter, EmptyStateHeader, EmptyStateIcon } from '@patternfly/react-core';
import { CubesIcon, FolderIcon, FolderOpenIcon, LeafIcon, ExclamationCircleIcon } from '@patternfly/react-icons';
import { ErrorState, ResponsiveAction, ResponsiveActions, SkeletonTableHead, SkeletonTableBody } from '@patternfly/react-component-groups';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { useDataViewSelection, useDataViewSort } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataView, DataViewState } from '@patternfly/react-data-view/dist/dynamic/DataView';

The **data view table** component renders your data into columns and rows within a [PatternFly table](/components/table) component. You can easily customize and configure the table with these additional [data view components and props](/extensions/data-view/table#props).

## Configuring rows and columns
To define rows and columns for your table, use these props:
- `columns`: Defines the column heads of the table. Each item in the array can be a `ReactNode` for simple heads, or an object with the following properties:
  - `cell`: Content to display in the column head.
  - `props` (optional): (`ThProps`) to pass to the `<Th>` component, such as `width`, `sort`, and other table head cell properties.
- `rows`: Defines the rows to be displayed in the table. Each item in the array can be either an array of `DataViewTd` for simple rows, or an object with the following properties:
  - `row`: Content to display in each cell in the row.
  - `id` (optional): Unique identifier for the row that's used for matching selected items.
  - `props` (optional): (`TrProps`) to pass to the `<Tr>` component, such as `isHoverable`, `isRowSelected`, and other table row properties.

It is also possible to disable row selection using the `isSelectDisabled` function, which can be passed to the wrapping `DataView` component through the `selection` prop.

### Table example
```js file="./DataViewTableExample.tsx"

```

## Tree table

A tree table includes expandable rows and custom icons for leaf and parent nodes. 
To enable a tree table, pass the `isTreeTable` flag to the `<DataViewTable>` component.


Tree table rows have to be defined with following keys:
  - `row`: Defines the content for each cell in the row.
  - `id`: Unique identifier for the row that's used for matching selected items.
  - `children` (optional): Defines the children rows.

To update a row's icon to reflect its expansion state, pass `collapsedIcon`, `expandedIcon`, and `leafIcon` to `<DataViewTable>`.

To disable row selection, pass the `isSelectDisabled` function to `selection` prop of the wrapping `<DataView>` component .

### Tree table example

```js file="./DataViewTableTreeExample.tsx"

```

## Sorting
The following example demonstrates how to enable sorting functionality within a data view. This implementation supports dynamic sorting by column and persists the sort state in the page's URL via [React Router](https://reactrouter.com/).

### Sorting example
```js file="./SortingExample.tsx"

```
### Sorting state

The `useDataViewSort` hook manages the sorting state of a data view and provides an easy way to handle sorting logic, such as synchronization with URL parameters and the definition of default sorting behavior.

**Initial values:**
- `initialSort` object to set default `sortBy` and `direction` values:
  - `sortBy`: Key of the initial column to sort.
  - `direction`: Default sorting direction (`asc` or `desc`).
- `searchParams` (optional): Object to manage URL-based synchronization of sort state.
- `setSearchParams` (optional): Function to update the URL parameters when sorting changes.
- `defaultDirection`: Used to set the default direction when no direction is specified.
- Customizable parameter names for the URL:
  - `sortByParam`: Name of the URL parameter for the column key.
  - `directionParam`: Name of the URL parameter for the sorting direction.
The `useDataViewSort` hook integrates seamlessly with [React Router](https://reactrouter.com/) to manage the sort state via URL parameters. Alternatively, you can use `URLSearchParams` and `window.history.pushState` APIs, or other routing libraries. If URL synchronization is not configured, the sort state is managed internally within the component.

**Return values:**
- `sortBy`: Key of the column currently being sorted.
- `direction`: Current sorting direction (`asc` or `desc`).
- `onSort`: Function to handle sorting changes programmatically or via user interaction.

## States

The data view table allows you to react to the `activeState` of the data view (such as `empty`, `error`, `loading`). You can use the `headStates` and `bodyStates` props to define the table head and body for a given state. 

### Empty
When there is no data to render in the data view, you can instead display an empty state. 

You can create your empty state by passing a [PatternFly empty state](/components/empty-state) to the `empty` key of `headStates` or `bodyStates`. 

```js file="./DataViewTableEmptyExample.tsx"

```

### Error
When there is a data connection or retrieval error, you can display an error state.

The error state will be displayed when the data view `activeState` value is `error`.

You can create your error state by passing either the [component groups extension's error state](/component-groups/error-state) or a [PatternFly empty state](/components/empty-state) to the `error` key of `headStates` or `bodyStates`. 

```js file="./DataViewTableErrorExample.tsx"

```

### Loading
To indicate that data is loading, you can display a loading state.

The loading state will be displayed when the data view `activeState` value is `loading`.

You can create your loading state by passing either the [component groups extension's skeleton table](/component-groups/skeleton-table) or a customized [PatternFly empty state](/components/empty-state) to the `loading` key of `headStates` or `bodyStates`. 


```js file="./DataViewTableLoadingExample.tsx"

```
