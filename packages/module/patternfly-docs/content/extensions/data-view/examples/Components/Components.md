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
propComponents: ['DataViewToolbar']
sourceLink: https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/Components/Components.md
---
import { BulkSelect } from '@patternfly/react-component-groups';
import DataViewToolbar from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';

## Data view toolbar

The **data view toolbar** component renders a default opinionated data view toolbar above or below the data section. 

Data view toolbar can contain a `pagination`, `bulkSelect` or any other children content passed. The preffered way of passing children toolbar items is using the [toolbar item](/components/toolbar#toolbar-items) component.

### Basic example

```js file="./DataViewToolbarExample.tsx"

```

