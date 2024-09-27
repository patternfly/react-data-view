import React, { useMemo } from 'react';
import {
  Table,
  TableProps,
  Tbody,
  Td,
  Tr,
} from '@patternfly/react-table';
import { useInternalContext } from '../InternalContext';
import { DataViewTableHeader } from '../DataViewTableHeader';
import { DataViewTh, DataViewTr, isDataViewTdObject, isDataViewTrObject } from '../DataViewTable';
import { DataViewState } from '../DataView/DataView';

export interface DataViewTableBasicProps extends Omit<TableProps, 'onSelect' | 'rows'> {
  /** Columns definition */
  columns: DataViewTh[];
  /** Current page rows */
  rows: DataViewTr[];
  /** States to be displayed when active */
  states?: Partial<Record<DataViewState, React.ReactNode>>
  /** Custom OUIA ID */
  ouiaId?: string;
}

export const DataViewTableBasic: React.FC<DataViewTableBasicProps> = ({
  columns,
  rows,
  ouiaId = 'DataViewTableBasic',
  states = {},
  ...props
}: DataViewTableBasicProps) => {
  const { selection, activeState } = useInternalContext();
  const { onSelect, isSelected, isSelectDisabled } = selection ?? {};
  const isSelectable = useMemo(() => Boolean(onSelect && isSelected), [ onSelect, isSelected ]);

  return (
    <Table aria-label="Data table" ouiaId={ouiaId} {...props}>
      <DataViewTableHeader columns={columns} ouiaId={ouiaId} />
      <Tbody>
        {activeState && Object.keys(states).includes(activeState) ? (
          <Tr key={activeState} ouiaId={`${ouiaId}-tr-${activeState}`}>
            <Td colSpan={columns.length + Number(isSelectable)}>
              {states[activeState]}
            </Td>
          </Tr>
        ) : (
          rows.map((row, rowIndex) => {
            const rowIsObject = isDataViewTrObject(row);
            return (
              <Tr key={rowIndex} ouiaId={`${ouiaId}-tr-${rowIndex}`} {...(rowIsObject && row?.props)}>
                {isSelectable && (
                  <Td
                    key={`select-${rowIndex}`}
                    select={{
                      rowIndex,
                      onSelect: (_event, isSelecting) => {
                        onSelect?.(isSelecting, rowIsObject ? row : [ row ]);
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
                  );
                })}
              </Tr>
            );
          }))}
      </Tbody>
    </Table>
  );
};

export default DataViewTableBasic;
