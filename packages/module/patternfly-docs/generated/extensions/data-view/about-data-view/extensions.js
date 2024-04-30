import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from '@patternfly/documentation-framework/components';

const pageData = {
  "id": "About data view",
  "section": "extensions",
  "subsection": "Data view",
  "deprecated": false,
  "template": false,
  "beta": false,
  "demo": false,
  "newImplementationLink": false,
  "source": "extensions",
  "tabName": null,
  "slug": "/extensions/data-view/about-data-view/extensions",
  "sourceLink": "https://github.com/patternfly/patternfly-org/blob/main/packages/module/patternfly-docs/content/extensions/data-view/about-data-view.md",
  "relPath": "packages/module/patternfly-docs/content/extensions/data-view/about-data-view.md",
  "sortValue": 1
};
pageData.examples = {
  
};

const Component = () => (
  <React.Fragment>
    <p {...{"className":"ws-p"}}>
      {`Data view lives in its own package `}
      <PatternflyThemeLink {...{"to":"https://www.npmjs.com/package/@patternfly/react-data-view"}}>
        <code {...{"className":"ws-code"}}>
          {`@patternfly/react-data-view`}
        </code>
      </PatternflyThemeLink>
    </p>
    <AutoLinkHeader {...{"id":"data-view","size":"h1","className":"ws-title ws-h1"}}>
      {`Data view`}
    </AutoLinkHeader>
    <p {...{"className":"ws-p"}}>
      {`The data view extension contains implementation of the data view component allowing to display record data in a configured layout.`}
    </p>
    <p {...{"className":"ws-p"}}>
      {`If you notice a bug or have a suggestion for the data view, feel free to file an issue in our `}
      <PatternflyThemeLink {...{"to":"https://github.com/patternfly/react-data-view/issues"}}>
        {`GitHub repository`}
      </PatternflyThemeLink>
      {`! Please make sure to check if there is already a pre-existing issue before creating a new issue.`}
    </p>
  </React.Fragment>
);
Component.displayName = 'ExtensionsDataViewAboutDataViewExtensionsDocs';
Component.pageData = pageData;

export default Component;
