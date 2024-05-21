import React, { PropsWithChildren } from 'react';
import { Toolbar, ToolbarContent, ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core';

export interface DataViewToolbarProps extends PropsWithChildren {
  /** Toolbar className */
  className?: string;
  /** Custom OUIA ID */
  ouiaId?: string;
  /** React component to display pagination */
  pagination?: React.ReactNode;
}

export const DataViewToolbar: React.FC<DataViewToolbarProps> = ({ className, ouiaId = 'DataViewToolbar', pagination, children, ...props }: DataViewToolbarProps) => (
  <Toolbar ouiaId={ouiaId} className={className} {...props}>
    <ToolbarContent>
      {pagination && (
        <ToolbarItem variant={ToolbarItemVariant.pagination}>
          { /* TO DO: Make the pagination work later */ }
          {pagination}
        </ToolbarItem>
      )}
      {children}
    </ToolbarContent>
  </Toolbar>
);

export default DataViewToolbar;
