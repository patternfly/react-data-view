---
section: extensions
subsection: Data view
id: Data view
propComponents: ['DataViewToolbar', 'DataViewTableBasic', 'DataViewTableTree','DataView', 'DataViewState']
sourceLink: https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/Components/Components.md
---
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

**Note:** Data view lives in its own package [`@patternfly/react-data-view`](https://www.npmjs.com/package/@patternfly/react-data-view) 

If you notice a bug, or if have a suggestion for improving the data view extension or its documentation, file an issue in [the react-data-view repository](https://github.com/patternfly/react-data-view/issues)! Before creating a new issue, make sure there is not already a pre-existing issue. 

## Basic data view 

The **data view** extension helps you display datasets in organized layouts. 

A basic data view places data in a [PatternFly table](/components/table), with [toolbars](/components/toolbar) above and below the table that support interactions like selection and pagination. 

These table and toolbar components are combined and passed as `children` to the `<DataView>` component.

```js file="./PredefinedLayoutExample.tsx"

```

## Basic toolbar

A basic data view toolbar typically supports bulk selection, to allow users to select data, and pagination, to help users navigate large datasets that span multiple pages.

To enable selection and pagination, pass `bulkSelect` or `pagination` to the [toolbar item component](/components/toolbar#toolbar-items). 

You can further customize these actions by referring to the additional documentation: 
- [Selection](#selection)
- [Pagination](#pagination)

```js file="./DataViewToolbarExample.tsx"

```

### Toolbar actions

To support additional user needs, you can pass relevant actions to the toolbar via `actions`. Add standard PatternFly actions (like buttons) or choose a predefined [responsive action component group](/component-groups/controls/responsive-actions).

```js file="./DataViewToolbarActionsExample.tsx"

```

### Selection

To allow users to select data records inside the data view, add support for [bulk selection](/patterns/bulk-selection). 

To enable selection, pass a predefined [bulk select component group](/component-groups/controls/bulk-select) to the `bulkSelect` property of the `<DataViewToolbar>`.

This example includes the following: 

- The `useDataViewSelection` hook, which manages the selection state of the data view. 

- Initial values, before selection:
    - An optional `initialSelected` array of a record's identifiers, selected by default
    - A `matchOption` function that checks if a record is selected
        - When no `matchOption` is passed, the `Array.prototype.includes()` operation is performed on the `selected` array.

- Return values, after selection:
    - A `selected` array of currently selected records
    - An `isSelected` function that returns the selection state of a record
    - An `onSelect` callback that modifies the selection state
        - This callback accepts the `isSelecting` flag, which dictates when records are selected or deselected, and `items`, which contains affected records. 

```js file="./SelectionExample.tsx"

```

### Pagination

To help users navigate data records that span multiple pages, enable [pagination](/components/pagination/design-guidelines).

To support pagination, pass a [pagination component](/components/pagination) to `pagination` in the `<DataViewToolbar>`. For testing purposes, you can also pass a custom `ouiaId`.

This example includes the following: 

- The `useDataViewPagination` hook, which manages the pagination state of the data view. 

- Initial values:
    - A `perPage` initial value
    - An optional `page` initial value
    - An optional `searchParams` object
    - An optional `setSearchParams` function

    - While the hook works seamlessly with React Router library, you do not need to use it to take advantage of URL persistence. The `searchParams` and `setSearchParams` props can be managed using native browser APIs (`URLSearchParams` and `window.history.pushState`) or any other routing library of your choice. If you don't pass these two props, the pagination state will be stored internally without the URL usage.

    You can also pass custom `pageParam` or `perPageParam` names, renaming the pagination parameters in the URL.

    The retrieved values are named to match the PatternFly [pagination](/components/pagination) component props, so you can easily spread them to the component.

- Return values:
    - A current `page` number
    - An `onSetPage` function to modify the current page
    - An items `perPage` value
    - An `onPerPageSelect` function to modify per page value

```js file="./PaginationExample.tsx"

```

## Basic table

A basic data view table supports various customizations of the table head and body.

The `<DataViewTable>` component accepts the following props:

- `columns`: Defines the columns the table. Each item in the array can be a `ReactNode` (for simple heads) or an object with the following properties:
  - `cell` (`ReactNode`): Content to display in the column head
  - Optional `props` (`ThProps`) to pass to the `<Th>` component, such as `width`, `sort`, and other table head cell properties.

- `rows`: Defines the rows in the table. Each item in the array can be either an array of `DataViewTd` (for simple rows) or an object with the following properties:
  - `row` (`DataViewTd[]`): Content for each cell in the row
  - Optional `id` (`string`) for the row, which can be used to match items in selection.
  - Optional `props` (`TrProps`) to pass to the `<Tr>` component, such as `isHoverable`, `isRowSelected`, and other table row properties.

- Optional `ouiaId`

- Optional `props` (`TableProps`) that are passed down to the `<Table>` component, except for `onSelect`, which is managed internally.

```js file="./DataViewTableExample.tsx"

```

### Tree table 

Instead of a basic table, your data view can use a tree table variant, with expandable rows and custom icons for leaf and parent nodes. 

To enable a tree table, pass the `isTreeTable` flag to the `<DataViewTable>` component. 

Pass `collapsedIcon`, `expandedIcon`, and `leafIcon` to `<DataViewTable>`, to align a row's icon to its state. 

Tree table rows have to be defined as an object with the following keys:
  - A `row` (`DataViewTd[]`) that defines the content for each cell in the row
  - An `id` (`string`) for the row, which is used to identify selected items and expand the row
  - Optional `children` (`DataViewTrTree[]`) that define the children rows

You can disable row selection by passing the `isSelectDisabled` function to the wrapping `<DataView>`.

```js file="./DataViewTableTreeExample.tsx"

```

### Empty state 

When there is no data to render in the data view, you can instead display a customizable empty state. 

You can customize your `<EmptyState>` component within `empty` by using [PatternFly empty state options](/components/empty-state). To load the empty state, pass the `empty` key to `headStates` or `bodyStates`. 

```js file="./DataViewTableEmptyExample.tsx"

```

### Error state 

When there is a data connection or retrieval error, you can display an error state. 

You can customize your `<EmptyState>` component within `error` by using the [error state component group](/component-groups/error-communication/error-state). To load the empty state, pass the `error` key to `headStates` or `bodyStates`. 

The error state will be displayed when the data view `state` value is `error`.

```js file="./DataViewTableErrorExample.tsx"

```

### Loading state 

To indicate that data is still loading, you can display a [skeleton table](/component-groups/status-and-state-indicators/skeleton-table).

You can pass `<SkeletonTableHead>` to the `loading` key of `headStates` and `<SkeletonTableBody>` to the `loading` key of `bodyStates`.  

The loading state will be displayed when the data view `state` value is `loading`.

```js file="./DataViewTableLoadingExample.tsx"

```

### Events context hook

You can use the `DataViewEventsContext` hook to manage a shared state and handle events from outside of the data view component. The `DataViewEventsProvider` hook wraps components that need access to the shared context. 

This example illustrates how to set up a layout that listens for row click events and displays detailed information about the selected row in a [drawer component](/components/drawer).


```js file="./EventsExample.tsx"

```

