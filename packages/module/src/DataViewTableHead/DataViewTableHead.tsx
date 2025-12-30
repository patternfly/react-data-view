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
  /** Indicates whether table rows are draggable */
  isDraggable?: boolean;
}

export const DataViewTableHead: FC<DataViewTableHeadProps> = ({
  isTreeTable = false,
  columns,
  ouiaId = 'DataViewTableHead',
  hasResizableColumns,
  isDraggable = false,
  ...props
}: DataViewTableHeadProps) => {
  const { selection } = useInternalContext();
  const { onSelect, isSelected } = selection ?? {};

  const cells = useMemo(
    () => [
      onSelect && isSelected && !isTreeTable ? (
        <Th key="row-select" screenReaderText="Data selection table head cell" />
      ) : null,
      isDraggable ? (
        <Th key="draggable" screenReaderText="Draggable row handle" />
      ) : null,
      ...columns.map((column, index) => (
        <DataViewThElement
          key={index}
          content={isDataViewThObject(column) ? column.cell : column}
          resizableProps={isDataViewThObject(column) ? column.resizableProps : undefined}
          data-ouia-component-id={`${ouiaId}-th-${index}`}
          thProps={isDataViewThObject(column) ? (column?.props ?? {}) : {}}
          hasResizableColumns={hasResizableColumns}
        />
      ))
    ],
    [ columns, ouiaId, onSelect, isSelected, isTreeTable, hasResizableColumns, isDraggable ]
  );

  return (
    <Thead data-ouia-component-id={`${ouiaId}-thead`} {...props}>
      <Tr ouiaId={`${ouiaId}-tr-head`}>{cells}</Tr>
    </Thead>
  );
};

export default DataViewTableHead;
