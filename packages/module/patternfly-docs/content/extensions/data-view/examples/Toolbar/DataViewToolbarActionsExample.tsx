import React from 'react';
import { Pagination } from '@patternfly/react-core';
import { BulkSelect, ResponsiveAction, ResponsiveActions } from '@patternfly/react-component-groups';
import { DataViewToolbar } from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';

export const BasicExample: React.FunctionComponent = () => (
  <DataViewToolbar 
    bulkSelect={
      <BulkSelect
        selectedCount={0}
        pageCount={5}
        onSelect={() => null}
      />  
    }
    actions={
      <ResponsiveActions breakpoint="lg" ouiaId="example-actions">
        <ResponsiveAction isPersistent variant="primary">Persistent</ResponsiveAction>
        <ResponsiveAction isPinned variant="secondary">Pinned</ResponsiveAction>
        <ResponsiveAction>Action three</ResponsiveAction>
        <ResponsiveAction>Action four</ResponsiveAction>
      </ResponsiveActions>
    }
    pagination={
      <Pagination page={1} perPage={10} />
    }
  />
)
