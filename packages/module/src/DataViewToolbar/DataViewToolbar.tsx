import React, { PropsWithChildren } from 'react';
import { Toolbar, ToolbarContent, ToolbarItem, ToolbarItemVariant } from '@patternfly/react-core';

export interface DataViewToolbarProps extends PropsWithChildren {
  /** Toolbar className */
  className?: string;
  /** Custom OUIA ID */
  ouiaId?: string;
  /** React component to display bulk select */
  bulkSelect?: React.ReactNode;
  /** React component to display pagination */
  pagination?: React.ReactNode;
  /** React component to display actions */
  actions?: React.ReactNode;
}

export const DataViewToolbar: React.FC<DataViewToolbarProps> = ({ className, ouiaId = 'DataViewToolbar', bulkSelect, actions = null, pagination, children, ...props }: DataViewToolbarProps) => (
  <Toolbar ouiaId={ouiaId} className={className} {...props}>
    <ToolbarContent>
      {bulkSelect && (
        <ToolbarItem data-ouia-component-id={`${ouiaId}-bulk-select`}>
          {bulkSelect}
        </ToolbarItem>
      )}
      {actions}
      {pagination && (
        <ToolbarItem variant={ToolbarItemVariant.pagination} data-ouia-component-id={`${ouiaId}-pagination`}>
          {pagination}
        </ToolbarItem>
      )}
      {children}
    </ToolbarContent>
  </Toolbar>
);

export default DataViewToolbar;

