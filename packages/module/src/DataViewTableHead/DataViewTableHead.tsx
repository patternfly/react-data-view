import React, { useMemo } from 'react';
import {
  Th,
  Thead,
  TheadProps,
  Tr
} from '@patternfly/react-table';
import { useInternalContext } from '../InternalContext';
import { DataViewTh, isDataViewThObject } from '../DataViewTable';

export interface DataViewTableHeadProps extends TheadProps {
  /** Indicates whether table is a tree */
  isTreeTable?: boolean;
  /** Columns definition */
  columns: DataViewTh[];
  /** Custom OUIA ID */
  ouiaId?: string;
}

export const DataViewTableHead: React.FC<DataViewTableHeadProps> = ({
  isTreeTable = false,
  columns,
  ouiaId = 'DataViewTableHead',
  ...props
}: DataViewTableHeadProps) => {
  const { selection } = useInternalContext();
  const { onSelect, isSelected } = selection ?? {};

  const cells = useMemo(() => [
    onSelect && isSelected && !isTreeTable ? (
      <Th key="row-select" screenReaderText='Data selection table head cell' />
    ) : null,
    ...columns.map((column, index) => (
      <Th
        key={index}
        {...(isDataViewThObject(column) && (column?.props ?? {}))}
        data-ouia-component-id={`${ouiaId}-th-${index}`}
      >
        {isDataViewThObject(column) ? column.cell : column}
      </Th>
    )
    ) ], [ columns, ouiaId, onSelect, isSelected, isTreeTable ]);

  return (
    <Thead data-ouia-component-id={`${ouiaId}-thead`} {...props}>
      <Tr ouiaId={`${ouiaId}-tr-head`}>
        {cells}
      </Tr>
    </Thead>
  );
};

export default DataViewTableHead;
