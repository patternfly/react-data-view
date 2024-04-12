import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from '@patternfly/documentation-framework/components';
import DataView from '@patternfly/react-data-view/dist/dynamic/DataView';
const pageData = {
  "id": "Data view",
  "section": "extensions",
  "subsection": "Data view",
  "deprecated": false,
  "beta": false,
  "demo": false,
  "newImplementationLink": false,
  "source": "react",
  "tabName": null,
  "slug": "/extensions/data-view/data-view/react",
  "sourceLink": "https://github.com/patternfly/react-data-view/blob/main/packages/module/patternfly-docs/content/extensions/data-view/examples/DataView/DataView.md",
  "relPath": "packages/module/patternfly-docs/content/extensions/data-view/examples/DataView/DataView.md",
  "propComponents": [
    {
      "name": "DataView",
      "description": "",
      "props": [
        {
          "name": "text",
          "type": "string",
          "description": "Example prop",
          "defaultValue": "'This is Data view'"
        }
      ]
    }
  ],
  "examples": [
    "Basic example"
  ]
};
pageData.liveContext = {
  DataView
};
pageData.relativeImports = {
  
};
pageData.examples = {
  'Basic example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport DataView from '@patternfly/react-data-view/dist/dynamic/DataView';\n\nexport const BasicExample: React.FunctionComponent = () => (\n  <DataView />\n);\n","title":"Basic example","lang":"js"}}>
      
      <p {...{"className":"ws-p"}}>
        {`A blank example of the data view layout.`}
      </p>
    </Example>
};

const Component = () => (
  <React.Fragment>
    <p {...{"className":"ws-p"}}>
      {`The `}
      <strong>
        {`data view`}
      </strong>
      {` component renders record data in a configured layout.`}
    </p>
    {React.createElement(pageData.examples["Basic example"])}
  </React.Fragment>
);
Component.displayName = 'ExtensionsDataViewDataViewReactDocs';
Component.pageData = pageData;

export default Component;
