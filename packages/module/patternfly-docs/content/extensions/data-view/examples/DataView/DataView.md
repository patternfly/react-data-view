---
section: extensions
subsection: Data view
id: Data view
propComponents: ['DataView']
sortValue: 1
sourceLink: https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/DataView/DataView.md
--- 
import { useState, useEffect, useRef, useMemo } from 'react';
import { Drawer, DrawerContent, DrawerContentBody } from '@patternfly/react-core';
import { useDataViewPagination, useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { BulkSelect, BulkSelectValue } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { useDataViewEventsContext, DataViewEventsContext, DataViewEventsProvider, EventTypes } from '@patternfly/react-data-view/dist/dynamic/DataViewEventsContext';

## Core concepts

The **data view** extension helps you display datasets in organized layouts containing data representation and toolbars allowing interactions like selection or pagination. 

Sub-components for displaying the data (card view, table) and toolbars (top and bottom) are always passed as `children` to the `DataView` component.

---

**Note:** Data view lives in its own package [`@patternfly/react-data-view`](https://www.npmjs.com/package/@patternfly/react-data-view)

If you notice a bug, or if you have a suggestion for improving the data view extension or its documentation, please file an issue in [the react-data-view repository](https://github.com/patternfly/react-data-view/issues). Before doing so, please make sure there is not already a pre-existing issue.

---

### Layout

Data view is expected to consist of header, data representation part and footer stacked below each other. The layout is implemented using PatternFly [stack](/layouts/stack). 

```js file="./AbstractLayoutExample.tsx"

```

### Modularity

The extension's modular architecture lets you efficiently create consistent data views by using predefined sub-components and hooks or defining your own. You can choose the tools that suit your needs and easily replace any part with a custom implementation.

For the toolbar, you can make use of the predefined `DataViewToolbar` component, which extends the PatternFly [toolbar](/components/toolbar) with the most common use cases. For more details, please refer to the [Toolbar](/extensions/data-view/toolbar) section. In case it does not fit your needs, you can also use your custom toolbar component.

Data can be presented using the predefined `DataViewTable` component, which is an abstraction above the PatternFly [table](/components/table). For more details, please refer to the [Table](/extensions/data-view/table) docs section. In the near future, we are also planning to introduce a predefined Card view component. If you have more specific needs to display data, you can pass your custom implementation as a `DataView` child.

```js file="./PredefinedLayoutExample.tsx"

```

## Advanced concepts

This section contains advanced features related to the `DataView` wrapping component and information to better understand how the data view works under the hood. 

### Data view context

The **data view internal context** provides shared state to all sub-components. It lives inside the `DataView` component to store callbacks for the data selection (`onSelect`, `isSelected`, `isSelectDisabled`), internally computed `isSelectable` flag based on selection callbacks passed, and `activeState` of the data view (loading, error, etc.). Its values are set up through props of the `DataView` component.

### Events context

The **data view events context** provides a way of listening to the data view events from the outside of the component through the `DataViewEventsContext`. 

In order to give your components an access to the shared context, wrap them and your data view with the `DataViewEventsProvider`.

### Row click subscription example
This example illustrates how to set up a layout that listens for row click events and displays detailed information about the selected row in a [drawer component](/components/drawer).


```js file="./EventsExample.tsx"

```
