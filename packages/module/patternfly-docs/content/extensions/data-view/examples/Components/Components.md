---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Data view
# Sidenav secondary level section
# should be the same for all markdown files
id: Components
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
sortValue: 4
propComponents: ['DataViewToolbar', 'DataViewTableBasic', 'DataViewTableTree', 'DataViewTrTree', 'DataViewTrObject']
sourceLink: https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/Components/Components.md
---
import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateFooter } from '@patternfly/react-core';
import { CubesIcon, FolderIcon, FolderOpenIcon, LeafIcon, ExclamationCircleIcon } from '@patternfly/react-icons';
import { BulkSelect, ErrorState, ResponsiveAction, ResponsiveActions, SkeletonTableHead, SkeletonTableBody } from '@patternfly/react-component-groups';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataView, DataViewState } from '@patternfly/react-data-view/dist/dynamic/DataView';

## Data view toolbar

The **data view toolbar** component renders a default opinionated data view toolbar above or below the data section. 

Data view toolbar can contain a `pagination`, `bulkSelect`, `filters`, `actions` or other children content passed. The preffered way of passing children toolbar items is using the [toolbar item](/components/toolbar#toolbar-items) component.

### Basic toolbar example

```js file="./DataViewToolbarExample.tsx"

```

# Toolbar actions
Data view toolbar can display actions using the `actions` property accepting a React node. You can make use of a predefined [responsive actions](/extensions/component-groups/responsive-actions) component from the [component groups](/extensions/component-groups/about-component-groups) extension.

### Actions configuration

### Actions example

```js file="./DataViewToolbarActionsExample.tsx"

```

## Data view table

The **data view table** component renders your columns and rows definition into a [table](/components/table) component. 

### Rows and columns customization

This example shows possible formats of `rows` and `columns` passed to the `DataViewTable` which allow you various customizations of the table head and body. 

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

### Tree table example
This example shows the tree table variant with expandable rows, custom icons for leaf and parent nodes. Tree table is turned on by passing `isTreeTable` flag to the `DataViewTable` component. You can pass `collapsedIcon`, `expandedIcon` or `leafIcon` to be displayen rows with given status. The tree table rows have to be defined in a format of object with following keys:
  - `row` (`DataViewTd[]`) defining the content for each cell in the row.
  - `id` (`string`) for the row (used to match items in selection end expand the rows).
  - optional `children` (`DataViewTrTree[]`) defining the children rows.

It is also possible to disable row selection using the `isSelectDisabled` function passed to the wrapping data view component through `selection`.

```js file="./DataViewTableTreeExample.tsx"

```

### Empty state example
The data view table supports displaying a custom empty state. You can pass it using the the `headStates` and `bodyStates` properties and their `empty` key. It will be automatically displayed in case there are no rows to be rendered.

```js file="./DataViewTableEmptyExample.tsx"

```

### Error state example
The data view table also supports displaying an error state. You can pass it using the the `headStates` and `bodyStates` properties and their `error` key. It will be displayed in case the data view recieves its `state` property set to `error`.

```js file="./DataViewTableErrorExample.tsx"

```

### Loading state example
The data view table also supports displaying a custom loading state. You can pass it using the `headStates` and `bodyStates` properties and their `loading` key. Your state will be displayed in case the data view recieves its `state` property set to `loading`.

```js file="./DataViewTableLoadingExample.tsx"

```
