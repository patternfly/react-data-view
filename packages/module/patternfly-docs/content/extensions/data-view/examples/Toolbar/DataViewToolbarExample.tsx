/* eslint-disable no-console */
import React from 'react';
import { Pagination } from '@patternfly/react-core';
import { BulkSelect } from '@patternfly/react-component-groups';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';
import { ResponsiveAction, ResponsiveActions } from '@patternfly/react-component-groups';
import { DataViewFilters } from '@patternfly/react-data-view/dist/dynamic/DataViewFilters';
import { DataViewTextFilter } from '@patternfly/react-data-view/dist/dynamic/DataViewTextFilter';

export const BasicExample: React.FunctionComponent = () => (
  <DataViewToolbar 
    clearAllFilters={() => console.log('clearAllFilters called')}
    bulkSelect={
      <BulkSelect
        selectedCount={0}
        pageCount={5}
        onSelect={() => console.log('onSelect called')}
      />  
    }
    filters={ 
      <DataViewFilters onChange={() => console.log('onSetFilters calles')} values={{}}>
        <DataViewTextFilter filterId="name" title='Name' placeholder='Filter by name' />
        <DataViewTextFilter filterId="branch" title='Branch' placeholder='Filter by branch' />
      </DataViewFilters>
    }
    actions={
      <ResponsiveActions ouiaId="example-actions">
        <ResponsiveAction>Add repository</ResponsiveAction>
        <ResponsiveAction>Delete repository</ResponsiveAction>
      </ResponsiveActions>
    }
    pagination={
      <Pagination page={1} perPage={10} isCompact />
    } 
  />
)
