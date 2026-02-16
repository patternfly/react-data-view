import { FC, PropsWithChildren, useRef } from 'react';
import { Button, Toolbar, ToolbarContent, ToolbarItem, ToolbarItemVariant, ToolbarProps } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

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
  /** React node to display toggle group */
  toggleGroup?: React.ReactNode;
  /** React node to display filters */
  filters?: React.ReactNode;
  /** React node to display custom filter labels */
  customLabelGroupContent?: React.ReactNode;
}

const useStyles = createUseStyles({
  dataViewToolbarPagination: {
    flexBasis: '100%',
    width: '100%'
  },
  dataViewToolbarPaginationWrapper: {
    flexBasis: '100%',
    width: '100%'
  }
});

export const DataViewToolbar: FC<DataViewToolbarProps> = ({ className, ouiaId = 'DataViewToolbar', bulkSelect, actions, toggleGroup, pagination, filters, customLabelGroupContent, clearAllFilters, children, ...props }: DataViewToolbarProps) => {
  const classes = useStyles();
  const defaultClearFilters = useRef(
    <ToolbarItem>
      <Button ouiaId={`${ouiaId}-clear-all-filters`} variant="link" onClick={clearAllFilters} isInline>
        Clear filters
      </Button>
    </ToolbarItem>
  );
  return (
    <Toolbar ouiaId={ouiaId} className={className} customLabelGroupContent={customLabelGroupContent ?? defaultClearFilters.current} {...props}>
      <ToolbarContent>
        {bulkSelect && (
          <ToolbarItem data-ouia-component-id={`${ouiaId}-bulk-select`}>
            {bulkSelect}
          </ToolbarItem>
        )}
        {filters && (
          <ToolbarItem>
            {filters}
          </ToolbarItem>
        )}
        {actions && (
          <ToolbarItem>
            {actions}
          </ToolbarItem>
        )}
        {toggleGroup && (
          <ToolbarItem>
            {toggleGroup}
          </ToolbarItem>
        )}
        {pagination && (
          <ToolbarItem variant={ToolbarItemVariant.pagination} data-ouia-component-id={`${ouiaId}-pagination`} className={classes.dataViewToolbarPagination}>
            <div className={classes.dataViewToolbarPaginationWrapper}>
              {pagination}
            </div>
          </ToolbarItem>
        )}
        {children}
      </ToolbarContent>
    </Toolbar>
  )
};

export default DataViewToolbar;

