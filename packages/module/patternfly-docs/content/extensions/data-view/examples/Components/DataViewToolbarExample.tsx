import React from 'react';
import { Pagination } from '@patternfly/react-core';
import { BulkSelect } from '@patternfly/react-component-groups';
import DataViewToolbar from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';


export const BasicExample: React.FunctionComponent = () => (
  <DataViewToolbar 
    bulkSelect={
      <BulkSelect
        selectedCount={0}
        pageCount={5}
        onSelect={() => null}
      />  
    }
    pagination={
      <Pagination page={1} perPage={10} />
    }
  />
)
