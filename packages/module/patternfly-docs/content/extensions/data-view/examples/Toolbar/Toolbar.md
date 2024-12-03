---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Data view
# Sidenav secondary level section
# should be the same for all markdown files
id: Toolbar
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
sortValue: 2
propComponents: ['DataViewToolbar', 'DataViewFilters', 'DataViewTextFilter', 'DataViewCheckboxFilter']
sourceLink: https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/Toolbar/Toolbar.md
---
import { useMemo } from 'react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { useDataViewPagination, useDataViewSelection, useDataViewFilters } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { BulkSelect, BulkSelectValue, ErrorState, ResponsiveAction, ResponsiveActions, SkeletonTableHead, SkeletonTableBody } from '@patternfly/react-component-groups';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { DataViewFilters } from '@patternfly/react-data-view/dist/dynamic/DataViewFilters';
import { DataViewTextFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewTextFilter';
import { DataViewCheckboxFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewCheckboxFilter';

## Data view toolbar

The **data view toolbar** component renders a default opinionated data view toolbar above or below the data section. 

Data view toolbar can contain pagination, bulk select, filters, actions or other child content passed. The preffered way of passing child toolbar items is using the [toolbar item](/components/toolbar#toolbar-items) component or predefined `DataViewToolbar` props for specific use cases.

You can further customize toolbar interactions by referring to the additional documentation: 
- [Actions](#toolbar-actions)
- [Pagination](#pagination)
- [Selection](#selection)
- [Filters](#filters)

### Basic toolbar example

```js file="./DataViewToolbarExample.tsx"

```

## Toolbar actions
To support additional user needs, you can pass relevant actions to the toolbar via `actions`. Add standard PatternFly actions (like buttons) or choose predefined [responsive actions](/component-groups/responsive-actions) which ensure the responsive behavior of multiple actions in one toolbar.

### Actions example

```js file="./DataViewToolbarActionsExample.tsx"

```

## Pagination

Helps users navigate data records that span multiple pages.

### Toolbar usage
Data view toolbar can display a pagination using the `pagination` property accepting a React node. You can also pass a custom `ouiaId` for testing purposes.

### Pagination state

The `useDataViewPagination` hook manages the pagination state of the data view. 

**Initial values:**
- `perPage` initial value
- optional `page` initial value
- optional `searchParams` object
- optional `setSearchParams` function

While the hook works seamlessly with the React Router library, you do not need to use it to take advantage of URL persistence. The `searchParams` and `setSearchParams` props can be managed using native browser APIs (`URLSearchParams` and `window.history.pushState`) or any other routing library of your choice. If you don't pass these two props, the pagination state will be stored internally without the URL usage.

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

## Selection
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

## Filters
Enables filtering of data records in the data view and displays the applied filter chips.

### Toolbar usage
The data view toolbar can include a set of filters by passing a React node to the `filters` property. You can use predefined components `DataViewFilters`, `DataViewTextFilter` and `DataViewCheckboxFilter` to customize and handle filtering directly in the toolbar. The `DataViewFilters` is a wrapper allowing conditional filtering using multiple attributes. If you need just a single filter, you can use `DataViewTextFilter`, `DataViewCheckboxFilter` or a different filter component alone. Props of these filter components are listed at the bottom of this page. 

You can decide between passing `value` and `onChange` event to every filter separately or pass `values` and `onChange` to the `DataViewFilters` wrapper which make them available to its children. Props directly passed to child filters have a higher priority than the "inherited" ones. 

### Filters state

The `useDataViewFilters` hook manages the filter state of the data view. It allows you to define default filter values, synchronize filter state with URL parameters, and handle filter changes efficiently.

**Initial values:**
- `initialFilters` object with default filter values (if the filter param allows multiple values, pass an array)
- optional `searchParams` object for managing URL-based filter state
- optional `setSearchParams` function to update the URL when filters are modified

The `useDataViewFilters` hook works well with the React Router library to support URL-based filtering. Alternatively, you can manage filter state in the URL using `URLSearchParams` and `window.history.pushState` APIs, or other routing libraries. If no URL parameters are provided, the filter state is managed internally.

**Return values:**
- `filters` object representing the current filter values
- `onSetFilters` function to update the filter state
- `clearAllFilters` function to reset all filters to their initial values

### Filtering example
This example demonstrates the setup and usage of filters within the data view. It includes text filters for different attributes, the ability to clear all filters, and persistence of filter state in the URL.

```js file="./FiltersExample.tsx"

```
