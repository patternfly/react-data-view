import React, { useMemo } from 'react';
import {
  Table,
  TableProps,
  Tbody,
  Td,
  Tr,
} from '@patternfly/react-table';
import { useInternalContext } from '../InternalContext';
import { DataViewTableHead } from '../DataViewTableHead';
import { DataViewTh, DataViewTr, isDataViewTdObject, isDataViewTrObject } from '../DataViewTable';
import { DataViewState } from '../DataView/DataView';

export interface DataViewTableBasicProps extends Omit<TableProps, 'onSelect' | 'rows'> {
  /** Columns definition */
  columns: DataViewTh[];
  /** Current page rows */
  rows: DataViewTr[];
  /** Table head states to be displayed when active */
  headStates?: Partial<Record<DataViewState, React.ReactNode>>
  /** Table body states to be displayed when active */
  bodyStates?: Partial<Record<DataViewState, React.ReactNode>>
  /** Custom OUIA ID */
  ouiaId?: string;
}

export const DataViewTableBasic: React.FC<DataViewTableBasicProps> = ({
  columns,
  rows,
  ouiaId = 'DataViewTableBasic',
  headStates = {},
  bodyStates = {},
  ...props
}: DataViewTableBasicProps) => {
  const { selection, activeState, isSelectable } = useInternalContext();
  const { onSelect, isSelected, isSelectDisabled } = selection ?? {};

  const activeHeadState = useMemo(() => activeState ? headStates[activeState] : undefined, [ activeState, headStates ]);
  const activeBodyState = useMemo(() => activeState ? bodyStates[activeState] : undefined, [ activeState, bodyStates ]);

  return (
    <Table aria-label="Data table" ouiaId={ouiaId} {...props}>
      { activeHeadState || <DataViewTableHead columns={columns} ouiaId={ouiaId} /> }
      { activeBodyState || (
        <Tbody>
          {rows.map((row, rowIndex) => {
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
          })}
        </Tbody>
      )}
    </Table>
  );
};

export default DataViewTableBasic;
