import { FC, useMemo } from 'react';
import { Th, Thead, TheadProps, Tr } from '@patternfly/react-table';
import { useInternalContext } from '../InternalContext';
import { DataViewTh, isDataViewThObject } from '../DataViewTable';
import {
  mergeFirstStickyDataColumnProps,
  shouldIncludeStickySelectionColumn,
  stickySelectionCellProps,
} from '../DataViewTable/stickySelectionColumn';
import { DataViewTh as DataViewThElement } from '../DataViewTh/DataViewTh';

/** extends TheadProps */
export interface DataViewTableHeadProps extends TheadProps {
  /** Indicates whether table is a tree */
  isTreeTable?: boolean;
  /** Columns definition */
  columns: DataViewTh[];
  /** Custom OUIA ID */
  ouiaId?: string;
  /** @hide Indicates whether table is resizable */
  hasResizableColumns?: boolean;
  /** When true with a sticky first data column and row selection, the selection column participates in the sticky group */
  isSticky?: boolean;
}

export const DataViewTableHead: FC<DataViewTableHeadProps> = ({
  isTreeTable = false,
  columns,
  ouiaId = 'DataViewTableHead',
  hasResizableColumns,
  isSticky = false,
  ...props
}: DataViewTableHeadProps) => {
  const { selection, isSelectable } = useInternalContext();
  const { onSelect, isSelected } = selection ?? {};

  const includeStickySelection = useMemo(
    () => shouldIncludeStickySelectionColumn(columns, isSelectable, isSticky),
    [ columns, isSelectable, isSticky ]
  );

  const cells = useMemo(
    () => [
      onSelect && isSelected && !isTreeTable ? (
        <Th
          key="row-select"
          screenReaderText="Data selection table head cell"
          {...(includeStickySelection ? stickySelectionCellProps : {})}
        />
      ) : null,
      ...columns.map((column, index) => (
        <DataViewThElement
          key={index}
          content={isDataViewThObject(column) ? column.cell : column}
          resizableProps={isDataViewThObject(column) ? column.resizableProps : undefined}
          data-ouia-component-id={`${ouiaId}-th-${index}`}
          thProps={mergeFirstStickyDataColumnProps(
            isDataViewThObject(column) ? (column?.props ?? {}) : {},
            index === 0 && includeStickySelection
          )}
          hasResizableColumns={hasResizableColumns}
        />
      ))
    ],
    [ columns, ouiaId, onSelect, isSelected, isTreeTable, hasResizableColumns, includeStickySelection ]
  );

  return (
    <Thead data-ouia-component-id={`${ouiaId}-thead`} {...props}>
      <Tr ouiaId={`${ouiaId}-tr-head`}>{cells}</Tr>
    </Thead>
  );
};

export default DataViewTableHead;
