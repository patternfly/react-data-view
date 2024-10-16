---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Data view
# Sidenav secondary level section
# should be the same for all markdown files
id: Functionality
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
sortValue: 3
sourceLink: https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/Functionality/Functionality.md
---
import { useMemo } from 'react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { useDataViewPagination, useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { BulkSelect, BulkSelectValue } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';


This is a list of functionality you can use to manage data displayed in the **data view**.

# Pagination
Allows to display data records on multiple pages and display the pagination state.

### Toolbar usage
Data view toolbar can display a pagination using the `pagination` property accepting a React node. You can also pass a custom `ouiaId` for testing purposes.

### Pagination state

The `useDataViewPagination` hook manages the pagination state of the data view. 

**Initial values:**
- `perPage` initial value
- optional `page` initial value
- optional `searchParams` object
- optional `setSearchParams` function

While the hook works seamlessly with React Router library, you do not need to use it to take advantage of URL persistence. The `searchParams` and `setSearchParams` props can be managed using native browser APIs (`URLSearchParams` and `window.history.pushState`) or any other routing library of your choice. If you don't pass these two props, the pagination state will be stored internally without the URL usage.

You can also pass custom `pageParam` or `perPageParam` names, renaming the pagination parameters in the URL.

The retrieved values are named to match the PatternFly [pagination](/components/pagination) component props, so you can easily spread them to the component.

**Return values:**
- current `page` number
- `onSetPage` to modify current page
- items `perPage` value
- `onPerPageSelect` to modify per page value

### Pagination example
```js file="./PaginationExample.tsx"

```

# Selection
Allows to select data records inside the data view and show the selection state.

### Toolbar usage
Data view toolbar can display a bulk selection component using the `bulkSelect` property accepting a React node. You can make use of a predefined [bulk select](/extensions/component-groups/bulk-select) component from the [component groups](/extensions/component-groups/about-component-groups) extension.

### Selection state

The `useDataViewSelection` hook manages the selection state of the data view. 

**Initial values:**
- optional `initialSelected` array of record's identifiers selected by default 
- `matchOption` function to check if given record is selected

*When no `matchOption` is passed, the `Array.prototype.includes()` operation is performed on the `selected` array.*

**Return values:**
- `selected` array of currently selected records
- `isSelected` function returning the selection state for given record
- `onSelect` callback to modify the selection state and accepting `isSelecting` flag indicating if records are changing to selected or deselected and `items` containing affected records 

### Selection example

```js file="./SelectionExample.tsx"

```
