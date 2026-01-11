import { FC, useMemo, useState, useRef } from 'react';
import {
  ExpandableRowContent,
  InnerScrollContainer,
  OuterScrollContainer,
  Table,
  TableProps,
  Tbody,
  Td,
  Tr,
} from '@patternfly/react-table';
import { GripVerticalIcon } from '@patternfly/react-icons';
import { useInternalContext } from '../InternalContext';
import { DataViewTableHead } from '../DataViewTableHead';
import { DataViewTh, DataViewTr, isDataViewTdObject, isDataViewTrObject } from '../DataViewTable';
import { DataViewState } from '../DataView/DataView';
import { useDraggableRows } from './hooks';

export interface ExpandableContent {
  rowId: number;
  columnId: number;
  content: React.ReactNode;
}

/** extends TableProps */
export interface DataViewTableBasicProps extends Omit<TableProps, 'onSelect' | 'rows'> {
  /** Columns definition */
  columns: DataViewTh[];
  /** Current page rows */
  rows: DataViewTr[];
  /** Expanded rows content */
  expandedRows?: ExpandableContent[];
  /** Table head states to be displayed when active */
  headStates?: Partial<Record<DataViewState | string, React.ReactNode>>
  /** Table body states to be displayed when active */
  bodyStates?: Partial<Record<DataViewState | string, React.ReactNode>>
  /** Custom OUIA ID */
  ouiaId?: string;
  /** @hide Indicates if the table is resizable */
  hasResizableColumns?: boolean;
  /** Toggles expandable */
  isExpandable?: boolean;
  /** Toogles sticky colums and headder */
  isSticky?: boolean;
  /** Toogles draggable rows */
  isDraggable?: boolean;
}

export const DataViewTableBasic: FC<DataViewTableBasicProps> = ({
  columns,
  rows,
  expandedRows,
  ouiaId = 'DataViewTableBasic',
  headStates,
  bodyStates,
  hasResizableColumns,
  isExpandable = false,
  isSticky = false,
  isDraggable = false,
  ...props
}: DataViewTableBasicProps) => {
  const { selection, activeState, isSelectable } = useInternalContext();
  const { onSelect, isSelected, isSelectDisabled } = selection ?? {};

  const activeHeadState = useMemo(() => activeState ? headStates?.[activeState] : undefined, [ activeState, headStates ]);
  const activeBodyState = useMemo(() => activeState ? bodyStates?.[activeState] : undefined, [ activeState, bodyStates ]);

  const [expandedRowsState, setExpandedRowsState] = useState<Record<number, boolean>>({})
  const [expandedColumnIndex, setExpandedColumnIndex] = useState<Record<number, number>>({})

  const tableRef = useRef<HTMLTableElement>(null);

  const {
    rowIds,
    onDragStart,
    onDragEnd,
    onDrop,
    onDropTbody,
    onDragOver,
    onDragLeave
  } = useDraggableRows({ rows, tableRef });

  const renderedRows = useMemo(() => rows.map((row, rowIndex) => {
    const rowIsObject = isDataViewTrObject(row);
    const isRowExpanded = expandedRowsState[rowIndex] || false;
    const expandedColIndex = expandedColumnIndex[rowIndex];

    // Get the first cell to extract the row ID
    const rowData = rowIsObject ? row.row : row;
    const firstCell = rowData[0];
    const rowId = isDataViewTdObject(firstCell) ? (firstCell as { id?: number }).id : undefined;

    // Find all expandable contents for this row
    const rowExpandableContents = isExpandable ? expandedRows?.filter(
      (content) => content.rowId === rowId
    ) : [];

    return (
      <Tbody key={rowIndex} isExpanded={isRowExpanded} onDragOver={onDragOver} onDrop={onDropTbody} onDragLeave={onDragLeave}>
        <Tr id={rowIds[rowIndex]} ouiaId={`${ouiaId}-tr-${rowIndex}`} {...(rowIsObject && row?.props)} isContentExpanded={isRowExpanded} isControlRow draggable={isDraggable} onDrop={onDrop} onDragEnd={onDragEnd} onDragStart={onDragStart}>
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
          {isDraggable && (
            <Td
              key={`drag-${rowIndex}`}
              draggableRow={{
                id: `draggable-row-${rowIds[rowIndex]}`
              }}
            >
              <GripVerticalIcon />
            </Td>
          )}
          {(rowIsObject ? row.row : row).map((cell, colIndex) => {
            const cellIsObject = isDataViewTdObject(cell);
            const cellExpandableContent = isExpandable ? expandedRows?.find(
              (content) => content.rowId === rowId && content.columnId === colIndex
            ) : undefined;
            return (
              <Td
                key={colIndex}
                {...(cellIsObject && (cell?.props ?? {}))}
                {...(cellExpandableContent != null && {
                  compoundExpand: {
                    isExpanded: isRowExpanded && expandedColIndex === colIndex,
                    expandId: `expandable-${rowIndex}`,
                    onToggle: () => {
                      console.log(`toggled compound expand for row ${rowIndex}, column ${colIndex}`); // eslint-disable-line no-console
                      setExpandedRowsState(prev => {
                        const isSameColumn = expandedColIndex === colIndex;
                        const wasExpanded = prev[rowIndex];
                        return { ...prev, [rowIndex]: isSameColumn ? !wasExpanded : true };
                      });
                      setExpandedColumnIndex(prev => ({ ...prev, [rowIndex]: colIndex }));
                    },
                    rowIndex,
                    columnIndex: colIndex
                  }
                })}
                data-ouia-component-id={`${ouiaId}-td-${rowIndex}-${colIndex}`}
              >
                {cellIsObject ? cell.cell : cell}
              </Td>
            );
          })}
        </Tr>
        {rowExpandableContents?.map((expandableContent) => (
          <Tr key={`expand-${rowIndex}-${expandableContent.columnId}`} isExpanded={isRowExpanded && expandedColIndex === expandableContent.columnId}>
            <Td colSpan={rowData.length + (isSelectable ? 1 : 0) + (isDraggable ? 1 : 0)} data-expanded-column-index={expandableContent.columnId}>
              <ExpandableRowContent>
                {expandableContent.content}
              </ExpandableRowContent>
            </Td>
          </Tr>
        ))}
      </Tbody>
    );
  }), [ rows, isSelectable, isSelected, isSelectDisabled, onSelect, ouiaId, expandedRowsState, expandedColumnIndex, expandedRows, rowIds, isDraggable, onDragOver, onDropTbody, onDragLeave, onDragEnd, onDragStart, isExpandable, onDrop ]);

  if (isSticky) {
    return (
      <OuterScrollContainer>
        <InnerScrollContainer>
          <Table ref={tableRef} aria-label="Data table" ouiaId={ouiaId} isExpandable={isExpandable} hasAnimations {...props} isStickyHeader >
            { activeHeadState || <DataViewTableHead columns={columns} ouiaId={ouiaId} hasResizableColumns={hasResizableColumns} isDraggable={isDraggable} /> }
            { activeBodyState || renderedRows }
          </Table>
        </InnerScrollContainer>
      </OuterScrollContainer>
    );
  } else {
    return (
      <Table ref={tableRef} aria-label="Data table" ouiaId={ouiaId} isExpandable={isExpandable} hasAnimations {...props}>
        { activeHeadState || <DataViewTableHead columns={columns} ouiaId={ouiaId} hasResizableColumns={hasResizableColumns} isDraggable={isDraggable} /> }
        { activeBodyState || renderedRows }
      </Table>
    );
  }
};

export default DataViewTableBasic;
