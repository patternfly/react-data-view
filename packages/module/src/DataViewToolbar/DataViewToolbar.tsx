import React from 'react';
import { Pagination, Toolbar, ToolbarContent, ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core';
import { DataViewPaginationProps } from '../Hooks';

export interface DataViewToolbarProps {
  /** Toolbar className */
  className?: string;
  /** Flag indicating that toolbar is used below the data part */
  isBottom?: boolean;
  /** Custom OUIA ID */
  ouiaId?: string;
  /** Props to display pagination in the toolbar */
  pagination: DataViewPaginationProps;
}

export const DataViewToolbar: React.FunctionComponent<DataViewToolbarProps> = ({ className, ouiaId = 'DataViewToolbar', pagination, isBottom }: DataViewToolbarProps) => (
  <Toolbar ouiaId={ouiaId} className={className}>
    <ToolbarContent>
      {pagination.page && (
        <ToolbarItem variant={ToolbarItemVariant.pagination}>
          { /* TO DO: Make the pagination work later */ }
          <Pagination page={pagination.page} perPage={pagination.perPage} isCompact={isBottom} ouiaId={`${ouiaId}-pagination${isBottom ? '-bottom' : ''}`}/>
        </ToolbarItem>
      )}
    </ToolbarContent>
  </Toolbar>
);

export default DataViewToolbar;
