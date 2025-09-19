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
}

export const DataViewTableHead: FC<DataViewTableHeadProps> = ({
  isTreeTable = false,
  columns,
  ouiaId = 'DataViewTableHead',
  ...props
}: DataViewTableHeadProps) => {
  const { selection } = useInternalContext();
  const { onSelect, isSelected } = selection ?? {};

  const cells = useMemo(
    () => [
      onSelect && isSelected && !isTreeTable ? (
        <Th key="row-select" screenReaderText="Data selection table head cell" />
      ) : null,
      ...columns.map((column, index) => (
        <DataViewThElement
          key={index}
          content={isDataViewThObject(column) ? column.cell : column}
          resizableProps={isDataViewThObject(column) ? column.resizableProps : undefined}
          data-ouia-component-id={`${ouiaId}-th-${index}`}
          props={isDataViewThObject(column) ? (column?.props ?? {}) : {}}
        />
      ))
    ],
    [ columns, ouiaId, onSelect, isSelected, isTreeTable ]
  );

  return (
    <Thead data-ouia-component-id={`${ouiaId}-thead`} {...props}>
      <Tr ouiaId={`${ouiaId}-tr-head`}>{cells}</Tr>
    </Thead>
  );
};

export default DataViewTableHead;
