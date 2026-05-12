import { TdProps, ThProps } from '@patternfly/react-table';

/**
 * Min width / left offset for the row-selection column when it is grouped with a sticky first data column.
 * Matches PatternFly’s typical checkbox column width so the Name column’s sticky inset aligns.
 */
export const STICKY_SELECTION_COLUMN_WIDTH = '4rem';

/** Props applied to the injected checkbox Th/Td when they participate in a sticky first-column group */
export const stickySelectionCellProps: Pick<
  ThProps,
  'isStickyColumn' | 'hasRightBorder' | 'stickyMinWidth'
> = {
  isStickyColumn: true,
  hasRightBorder: false,
  stickyMinWidth: STICKY_SELECTION_COLUMN_WIDTH,
};

/** `columns[0]` object shape from {@link DataViewTh} (avoids importing DataViewTable and a circular dependency). */
function isStickyFirstColumnDefinition(column: unknown): boolean {
  return (
    column != null &&
    typeof column === 'object' &&
    'props' in column &&
    (column as { props?: { isStickyColumn?: boolean } }).props?.isStickyColumn === true
  );
}

export function shouldIncludeStickySelectionColumn(
  columns: unknown[],
  isSelectable: boolean,
  isStickyTable: boolean
): boolean {
  if (!isStickyTable || !isSelectable || columns.length === 0) {
    return false;
  }
  const first = columns[0];
  if (first == null) {
    return false;
  }
  return isStickyFirstColumnDefinition(first);
}

/** Adds horizontal inset so the first sticky data column sits after the sticky selection column */
export function mergeFirstStickyDataColumnProps<P extends ThProps | TdProps>(
  columnProps: P | undefined,
  includeStickySelection: boolean
): P | undefined {
  if (!columnProps || !includeStickySelection || !columnProps.isStickyColumn) {
    return columnProps;
  }
  return {
    ...columnProps,
    stickyLeftOffset: columnProps.stickyLeftOffset ?? STICKY_SELECTION_COLUMN_WIDTH,
  };
}
