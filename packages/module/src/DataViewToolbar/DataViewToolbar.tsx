import React, { PropsWithChildren, useRef } from 'react';
import { Button, Toolbar, ToolbarContent, ToolbarItem, ToolbarItemVariant, ToolbarProps } from '@patternfly/react-core';

export interface DataViewToolbarProps extends Omit<PropsWithChildren<ToolbarProps>, 'ref'> {
  /** Toolbar className */
  className?: string;
  /** Custom OUIA ID */
  ouiaId?: string;
  /** React component to display bulk select */
  bulkSelect?: React.ReactNode;
  /** React component to display pagination */
  pagination?: React.ReactNode;
  /** React component to display search input */
  search?: React.ReactNode;
}

export const DataViewToolbar: React.FC<DataViewToolbarProps> = ({ className, ouiaId = 'DataViewToolbar', bulkSelect, search, pagination, children, clearAllFilters, customChipGroupContent, ...props }: DataViewToolbarProps) => {
  
  const defaultClearFilters = useRef(
    <ToolbarItem>
      <Button variant="link" onClick={clearAllFilters} isInline>
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
        {search && (
          <ToolbarItem variant={ToolbarItemVariant['search-filter']} data-ouia-component-id={`${ouiaId}-search-filter`}>
            {search}
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
  );
}

export default DataViewToolbar;

