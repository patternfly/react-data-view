---
section: extensions
subsection: Data view
id: Overview
title: Data view overview
propComponents: ['DataView']
sortValue: 1
sourceLink: https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/DataView/DataView.md
--- 
import { useState, useEffect, useRef, useMemo } from 'react';
import { Drawer, DrawerContent, DrawerContentBody } from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons';
import { useDataViewPagination, useDataViewSelection, useDataViewFilters, useDataViewSort } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { BulkSelect, BulkSelectValue, ErrorState, ResponsiveAction, ResponsiveActions, SkeletonTableHead, SkeletonTableBody } from '@patternfly/react-component-groups';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { useDataViewEventsContext, DataViewEventsContext, DataViewEventsProvider, EventTypes } from '@patternfly/react-data-view/dist/dynamic/DataViewEventsContext';
import { DataViewFilters } from '@patternfly/react-data-view/dist/dynamic/DataViewFilters';
import { DataViewTextFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewTextFilter';
import { DataViewCheckboxFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewCheckboxFilter';

**Note:** Data view lives in its own package [`@patternfly/react-data-view`](https://www.npmjs.com/package/@patternfly/react-data-view)

If you notice a bug, or if you have a suggestion for improving the data view extension or its documentation, please file an issue in the [react-data-view](https://github.com/patternfly/react-data-view/issues) repository. Before doing so, please make sure there is not already a pre-existing issue.

---

The **data view** extension enables you to display datasets in organized layouts, with data representations and interactive toolbars for actions like selection and pagination.

### Layout

A data view should contain a header, the data representation, and a footer. These parts are organized in a [stack layout](/layouts/stack).

The data view toolbars and sub-components that display the data (like a card view or table) are always passed as `children` to the `<DataView>` component.

```js file="./AbstractLayoutExample.tsx"

```

### Modularity

The extension's modular architecture lets you efficiently create consistent data views, either by using predefined sub-components and hooks, or by defining your own. You can choose the tools that suit your needs and easily replace any part with a custom implementation.

The `<DataViewToolbar>` component extends the [PatternFly toolbar](/components/toolbar) to support the most common needs. For more details, refer to the [data view toolbar](/extensions/data-view/toolbar) examples. You can also use a custom toolbar component if needed for your use case.

Data can be presented using the predefined `<DataViewTable>` component, which is an abstraction above the [PatternFly table](/components/table). For more details, refer to the [data view table](/extensions/data-view/table) examples. If you have more specific data display needs, you can pass a custom implementation as a `<DataView>` child. In the near future, we are also planning to introduce a predefined card view component.

```js file="./PredefinedLayoutFullExample.tsx"

```

## Events context

The `<DataViewEventsContext>` component is an advanced feature that enables external listening of data view events. In order to share data view context with your other UI components, both your components and your data view should be wrapped with the `<DataViewEventsProvider>`. This is demonstrated in the following example.

### Row click subscription example
This example uses the `<DataViewEventsProvider>` to display details about a selected row in a [drawer component](/components/drawer).


```js file="./EventsExample.tsx"

```
