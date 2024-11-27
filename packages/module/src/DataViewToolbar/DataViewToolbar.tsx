import React, { PropsWithChildren, useRef } from 'react';
import { Button, Toolbar, ToolbarContent, ToolbarItem, ToolbarItemVariant, ToolbarProps } from '@patternfly/react-core';

/** extends ToolbarProps */
export interface DataViewToolbarProps extends Omit<PropsWithChildren<ToolbarProps>, 'ref'> {
  /** Toolbar className */
  className?: string;
  /** Custom OUIA ID */
  ouiaId?: string;
  /** React node to display bulk select */
  bulkSelect?: React.ReactNode;
  /** React node to display pagination */
  pagination?: React.ReactNode;
  /** React node to display actions */
  actions?: React.ReactNode;
  /** React node to display filters */
  filters?: React.ReactNode;
  /** React node to display custom filter chips */
  customChipGroupContent?: React.ReactNode;
}

export const DataViewToolbar: React.FC<DataViewToolbarProps> = ({ className, ouiaId = 'DataViewToolbar', bulkSelect, actions, pagination, filters, customChipGroupContent, clearAllFilters, children, ...props }: DataViewToolbarProps) => {
  const defaultClearFilters = useRef(
    <ToolbarItem>
      <Button ouiaId={`${ouiaId}-clear-all-filters`} variant="link" onClick={clearAllFilters} isInline>
        Clear filters
      </Button>
    </ToolbarItem>
  );
  return (
    <Toolbar ouiaId={ouiaId} className={className} customChipGroupContent={customChipGroupContent ?? defaultClearFilters.current} {...props}>
      <ToolbarContent>
        {bulkSelect && (
          <ToolbarItem data-ouia-component-id={`${ouiaId}-bulk-select`}>
            {bulkSelect}
          </ToolbarItem>
        )}
        {filters && (
          <ToolbarItem variant={ToolbarItemVariant['search-filter']}>
            {filters}
          </ToolbarItem>
        )}
        {actions && (
          <ToolbarItem variant={ToolbarItemVariant['overflow-menu']}>
            {actions}
          </ToolbarItem>
        )}
        {pagination && (
          <ToolbarItem variant={ToolbarItemVariant.pagination} data-ouia-component-id={`${ouiaId}-pagination`}>
            {pagination}
          </ToolbarItem>
        )}
        {children}
      </ToolbarContent>
    </Toolbar>
  )
};

export default DataViewToolbar;

