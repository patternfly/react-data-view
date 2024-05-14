---
# Sidenav top-level section
# should be the same for all markdown files
section: extensions
subsection: Data view
# Sidenav secondary level section
# should be the same for all markdown files
id: Data view toolbar
# Tab (react | react-demos | html | html-demos | design-guidelines | accessibility)
source: react
# If you use typescript, the name of the interface to display props for
# These are found through the sourceProps function provided in patternfly-docs.source.js
propComponents: ['DataViewToolbar']
sourceLink: https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/DataViewToolbar/DataViewToolbar.md
---
import DataViewToolbar from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';

The **data view toolbar** component renders a default opinionated data view toolbar.

### Basic example

Data view toolbar can display a pagination using the `pagination` property accepting a React node. You can also pass a custom `ouiaId` for testing purposes.

```js file="./DataViewToolbarExample.tsx"

```

