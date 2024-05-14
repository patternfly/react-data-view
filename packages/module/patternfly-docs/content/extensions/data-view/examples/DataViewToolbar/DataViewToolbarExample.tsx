import React from 'react';
import { Pagination } from '@patternfly/react-core';
import DataViewToolbar from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';

export const BasicExample: React.FunctionComponent = () => (
  <DataViewToolbar pagination={<Pagination page={1} perPage={10} />} />
)
