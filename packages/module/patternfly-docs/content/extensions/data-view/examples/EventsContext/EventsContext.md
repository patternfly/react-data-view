---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Data view
# Sidenav secondary level section
# should be the same for all markdown files
id: Events context
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
sortValue: 3
sourceLink: https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/EventsContext/EventsContext.md
---
import { useState, useEffect, useRef, useMemo } from 'react';
import { Table, Tbody, Th, Thead, Tr, Td } from '@patternfly/react-table';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { useDataViewEventsContext, DataViewEventsContext, DataViewEventsProvider, EventTypes } from '@patternfly/react-data-view/dist/dynamic/DataViewEventsContext';
import { useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { Drawer, DrawerContent, DrawerContentBody } from '@patternfly/react-core';

The **data view  events context** provides a way of listening to the data view events from the outside of the component.

### Row click subscription example
The following example demonstrates how to use the `DataViewEventsContext` to manage shared state and handle events. The `DataViewEventsProvider` is used to wrap components that need access to the shared context. This example illustrates how to set up a layout that listens for data view row click events and displays detailed information about the selected row in a [drawer component](/components/drawer).


```js file="./EventsExample.tsx"

```

