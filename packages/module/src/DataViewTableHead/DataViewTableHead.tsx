import { FC, useMemo } from 'react';
import { Th, Thead, TheadProps, Tr } from '@patternfly/react-table';
import { useInternalContext } from '../InternalContext';
import { DataViewTh, isDataViewThObject } from '../DataViewTable';
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
  /** Toggles sticky columns and header */
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
  const { selection } = useInternalContext();
  const { onSelect, isSelected } = selection ?? {};

  const cells = useMemo(
    () => {
      // Check if the first column has isStickyColumn
      const firstColumnProps = isDataViewThObject(columns[0]) ? (columns[0]?.props ?? {}) : {};
      const firstColumnIsSticky = firstColumnProps.isStickyColumn;

      return [
        onSelect && isSelected && !isTreeTable ? (
          <Th
            key="row-select"
            screenReaderText="Data selection table head cell"
            isStickyColumn={firstColumnIsSticky}
            stickyMinWidth="45px"
            stickyLeftOffset="0px"
          />
        ) : null,
        ...columns.map((column, index) => {
          const thProps = isDataViewThObject(column) ? (column?.props ?? {}) : {};
          // If the first column is sticky and selection is enabled, offset it by the selection column width
          const enhancedThProps = index === 0 && thProps.isStickyColumn && onSelect && isSelected
            ? { ...thProps, stickyLeftOffset: '45px' }
            : thProps;

          return (
            <DataViewThElement
              key={index}
              content={isDataViewThObject(column) ? column.cell : column}
              resizableProps={isDataViewThObject(column) ? column.resizableProps : undefined}
              data-ouia-component-id={`${ouiaId}-th-${index}`}
              thProps={enhancedThProps}
              hasResizableColumns={hasResizableColumns}
            />
          );
        })
      ];
    },
    [ columns, ouiaId, onSelect, isSelected, isTreeTable, hasResizableColumns, isSticky ]
  );

  return (
    <Thead data-ouia-component-id={`${ouiaId}-thead`} {...props}>
      <Tr ouiaId={`${ouiaId}-tr-head`}>{cells}</Tr>
    </Thead>
  );
};

export default DataViewTableHead;
