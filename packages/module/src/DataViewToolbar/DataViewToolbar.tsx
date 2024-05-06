import React from 'react';
import { Pagination, Toolbar, ToolbarContent, ToolbarItem } from '@patternfly/react-core';
import { DataViewPaginationProps } from '../Hooks';

export interface DataViewToolbarProps extends DataViewPaginationProps {
  /** Toolbar className */
  className?: string;
  /** Flag indicating that toolbar is used below the data part */
  isBottom?: boolean;
  /** Custom OUIA ID */
  ouiaId?: string;
}

export const DataViewToolbar: React.FunctionComponent<DataViewToolbarProps> = ({ className, ouiaId = 'DataViewToolbar', page, perPage, isBottom }: DataViewToolbarProps) => (
  <Toolbar ouiaId={ouiaId} className={className}>
    <ToolbarContent>
      {page && perPage && (
        <ToolbarItem align={{ default: 'alignRight' }}>
          { /* TO DO: Make the pagination work later */ }
          <Pagination page={page} perPage={perPage} isCompact={isBottom} ouiaId={`${ouiaId}-pagination${isBottom ? '-bottom' : ''}`}/>
        </ToolbarItem>
      )}
    </ToolbarContent>
  </Toolbar>
);

export default DataViewToolbar;
