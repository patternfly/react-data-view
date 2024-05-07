import React from 'react';
import DataViewToolbar from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';

export const BasicExample: React.FunctionComponent = () => (
  <DataViewToolbar pagination={{ page: 1, perPage: 10 }} isBottom />
)
