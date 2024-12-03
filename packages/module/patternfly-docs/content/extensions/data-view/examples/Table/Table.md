---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Data view
# Sidenav secondary level section
# should be the same for all markdown files
id: Table
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

## Data view table

The **data view table** component is an abstraction that renders your columns and rows in the PatternFly [table](/components/table) component. 

Below, you can see an example of displaying `rows` and `columns` in the `DataViewTable`, which simplifies the table declaration, but at the same time keeps the customization possibilities of the core component. 

### Customized table example
```js file="./DataViewTableExample.tsx"

```

The `DataViewTable` component accepts the following props:

- `columns` defining the column heads of the table. Each item in the array can be a `ReactNode` (for simple heads) or an object with the following properties:
  - `cell` (`ReactNode`) content to display in the column head.
  - optional `props` (`ThProps`) to pass to the `<Th>` component, such as `width`, `sort`, and other table head cell properties.

- `rows` defining the rows to be displayed in the table. Each item in the array can be either an array of `DataViewTd` (for simple rows) or an object with the following properties:
  - `row` (`DataViewTd[]`) defining the content for each cell in the row.
  - optional `id` (`string`) for the row (can be used to match items in selection).
  - optional `props` (`TrProps`) to pass to the `<Tr>` component, such as `isHoverable`, `isRowSelected`, and other table row properties.

- optional `ouiaId`

- optional `props` (`TableProps`) that are passed down to the `<Table>` component, except for `onSelect`, which is managed internally.

It is also possible to disable row selection using the `isSelectDisabled` function passed to the wrapping data view component through `selection`.

## Tree table

Instead of a basic table, your data view can use a tree table variant, with expandable rows and custom icons for leaf and parent nodes. 

To enable a tree table, pass the `isTreeTable` flag to the `<DataViewTable>` component. 

Pass `collapsedIcon`, `expandedIcon`, and `leafIcon` to `<DataViewTable>`, to align a row's icon to its state. 

Tree table rows have to be defined in a format of object with following keys:
  - `row` (`DataViewTd[]`) defining the content for each cell in the row.
  - `id` (`string`) for the row (used to match items in selection end expand the rows).
  - optional `children` (`DataViewTrTree[]`) defining the children rows.

It is also possible to disable row selection using the `isSelectDisabled` function passed to the wrapping data view component through `selection`.

### Tree table example
```js file="./DataViewTableTreeExample.tsx"

```

## Sorting

The `useDataViewSort` hook manages the sorting state of a data view. It provides an easy way to handle sorting logic, including synchronization with URL parameters and defining default sorting behavior.

**Initial values:**
- `initialSort` object to set default `sortBy` and `direction` values:
  - `sortBy`: key of the initial column to sort.
  - `direction`: default sorting direction (`asc` or `desc`).
- Optional `searchParams` object to manage URL-based synchronization of sort state.
- Optional `setSearchParams` function to update the URL parameters when sorting changes.
- `defaultDirection` to set the default direction when no direction is specified.
- Customizable parameter names for the URL:
  - `sortByParam`: name of the URL parameter for the column key.
  - `directionParam`: name of the URL parameter for the sorting direction.

The `useDataViewSort` hook integrates seamlessly with React Router to manage sort state via URL parameters. Alternatively, you can use `URLSearchParams` and `window.history.pushState` APIs, or other routing libraries. If URL synchronization is not configured, the sort state is managed internally within the component.

**Return values:**
- `sortBy`: key of the column currently being sorted.
- `direction`: current sorting direction (`asc` or `desc`).
- `onSort`: function to handle sorting changes programmatically or via user interaction.

### Sorting example

The following example demonstrates how to set up and use sorting functionality within a data view. The implementation includes dynamic sorting by column with persistence of sort state in the URL using React Router.
```js file="./SortingExample.tsx"

```

## States

The data view table allows you to react to the `activeState` property passed to the data view (`loading`, `error`, `empty`, etc.). You can use `headStates` and `bodyStates` props to define table head and body applicable to given state. Below, you can see examples of the most common use cases.

### Empty
When there is no data to render in the data view, you can instead display an empty state. 

You can create your error state by using the PatternFly [empty state](/components/empty-state) component. To render the empty state, pass the component under `empty` key to `headStates` or `bodyStates`. 

```js file="./DataViewTableEmptyExample.tsx"

```

### Error
When there is a data connection or retrieval error, you can display an error state. 

You can create your error state by using the [error state](/component-groups/error-state) component from the [component groups](/extensions/component-groups/about-component-groups) extension or PatternFly [empty state](/components/empty-state) component. To render the error state, pass the component under `error` key to `headStates` or `bodyStates`. 

The error state will be displayed when the data view `activeState` value is `error`.

```js file="./DataViewTableErrorExample.tsx"

```

### Loading
To indicate that data is loading, you can display a loading state.

You can create your loading state by using the [skeleton table](/component-groups/skeleton-table) from the [component groups](/extensions/component-groups/about-component-groups)extension or customized PatternFly [empty state](/components/empty-state) component. To render the loading state, pass the component under `loading` key to `headStates` or `bodyStates`. 

The loading state will be displayed when the data view `activeState` value is `loading`.

```js file="./DataViewTableLoadingExample.tsx"

```
