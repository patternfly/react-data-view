import React, { ReactNode } from 'react';
import {
  Table,
  TableProps,
  Tbody,
  Td,
  TdProps,
  Th,
  Thead,
  ThProps,
  Tr,
  TrProps
} from '@patternfly/react-table';
import { useInternalContext } from '../InternalContext';

export type DataViewTh = ReactNode | { cell: ReactNode; props?: ThProps };
export type DataViewTd = ReactNode | { cell: ReactNode; props?: TdProps };
export type DataViewTr = DataViewTd[] | { row: DataViewTd[], id?: string, props?: TrProps };

export const isDataViewThObject = (value: DataViewTh): value is { cell: ReactNode; props?: ThProps } => value != null && typeof value === 'object' && 'cell' in value;
export const isDataViewTdObject = (value: DataViewTd): value is { cell: ReactNode; props?: TdProps } => value != null && typeof value === 'object' && 'cell' in value;
export const isDataViewTrObject = (value: DataViewTr): value is { row: DataViewTd[], id?: string } => value != null && typeof value === 'object' && 'row' in value;


export interface DataViewTableProps extends Omit<TableProps, 'onSelect' | 'rows'> {
  /** Columns definition */
  columns: DataViewTh[];
  /** Current page rows */
  rows: DataViewTr[];
  /** Custom OUIA ID */
  ouiaId?: string;
}

export const DataViewTable: React.FC<DataViewTableProps> = ({
  columns,
  rows,
  ouiaId = 'DataViewTable',
  ...props
}: DataViewTableProps) => {
  const { selection } = useInternalContext();
  const { onSelect, isSelected, isSelectDisabled } = selection ?? {};

  return (
    <Table aria-label="Data table" ouiaId={ouiaId} {...props}>
      <Thead data-ouia-component-id={`${ouiaId}-thead`}>
        <Tr ouiaId={`${ouiaId}-tr-head`}>
          {onSelect && isSelected && <Th key="row-select" />}
          {columns.map((column, index) => (
            <Th
              key={index}
              {...(isDataViewThObject(column) && (column?.props ?? {}))}
              data-ouia-component-id={`${ouiaId}-th-${index}`}
            >
              {isDataViewThObject(column) ? column.cell : column}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row, rowIndex) => { 
          const rowIsObject = isDataViewTrObject(row);
          return (
            <Tr key={rowIndex} ouiaId={`${ouiaId}-tr-${rowIndex}`} {...(rowIsObject && (row?.props ?? {}))}>
              {onSelect && isSelected && (
                <Td
                  key={`select-${rowIndex}`}
                  select={{
                    rowIndex,
                    onSelect: (_event, isSelecting) => {
                      onSelect?.(isSelecting, rowIsObject ? row : [ row ])
                    },
                    isSelected: isSelected?.(row) || false,
                    isDisabled: isSelectDisabled?.(row) || false,
                  }}
                />
              )}
              {(rowIsObject ? row.row : row).map((cell, colIndex) => {
                const cellIsObject = isDataViewTdObject(cell);
                return (
                  <Td
                    key={colIndex}
                    {...(cellIsObject && (cell?.props ?? {}))}
                    data-ouia-component-id={`${ouiaId}-td-${rowIndex}-${colIndex}`}
                  >
                    {cellIsObject ? cell.cell : cell}
                  </Td>
                )
              })}
            </Tr>
          )})}
      </Tbody>
    </Table>
  );
};

export default DataViewTable;
