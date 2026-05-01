import {
  mergeFirstStickyDataColumnProps,
  shouldIncludeStickySelectionColumn,
  STICKY_SELECTION_COLUMN_WIDTH,
  stickySelectionCellProps,
} from './stickySelectionColumn';

describe('stickySelectionColumn', () => {
  describe('stickySelectionCellProps', () => {
    it('matches row-selection sticky grouping props', () => {
      expect(stickySelectionCellProps).toEqual({
        isStickyColumn: true,
        hasRightBorder: false,
        stickyMinWidth: STICKY_SELECTION_COLUMN_WIDTH,
      });
    });
  });

  describe('shouldIncludeStickySelectionColumn', () => {
    it('is true when table is sticky, selectable, and first column is sticky', () => {
      expect(
        shouldIncludeStickySelectionColumn(
          [ { cell: 'Name', props: { isStickyColumn: true } } ],
          true,
          true
        )
      ).toBe(true);
    });

    it('is false when table is not sticky', () => {
      expect(
        shouldIncludeStickySelectionColumn(
          [ { cell: 'Name', props: { isStickyColumn: true } } ],
          true,
          false
        )
      ).toBe(false);
    });

    it('is false when not selectable', () => {
      expect(
        shouldIncludeStickySelectionColumn(
          [ { cell: 'Name', props: { isStickyColumn: true } } ],
          false,
          true
        )
      ).toBe(false);
    });

    it('is false when first column is not sticky', () => {
      expect(
        shouldIncludeStickySelectionColumn(
          [ { cell: 'Name', props: { isStickyColumn: false } } ],
          true,
          true
        )
      ).toBe(false);
    });

    it('is false when columns is empty', () => {
      expect(shouldIncludeStickySelectionColumn([], true, true)).toBe(false);
    });

    it('is false when first column entry is null', () => {
      expect(
        shouldIncludeStickySelectionColumn([ null, { cell: 'Name', props: { isStickyColumn: true } } ], true, true)
      ).toBe(false);
    });
  });

  describe('mergeFirstStickyDataColumnProps', () => {
    it('adds stickyLeftOffset when including selection sticky', () => {
      expect(
        mergeFirstStickyDataColumnProps(
          { isStickyColumn: true, hasRightBorder: true },
          true
        )
      ).toEqual({
        isStickyColumn: true,
        hasRightBorder: true,
        stickyLeftOffset: STICKY_SELECTION_COLUMN_WIDTH,
      });
    });

    it('preserves existing stickyLeftOffset', () => {
      expect(
        mergeFirstStickyDataColumnProps(
          { isStickyColumn: true, stickyLeftOffset: '80px' },
          true
        )
      ).toEqual({
        isStickyColumn: true,
        stickyLeftOffset: '80px',
      });
    });

    it('does not merge when first column is not sticky', () => {
      expect(
        mergeFirstStickyDataColumnProps({ isStickyColumn: false }, true)
      ).toEqual({ isStickyColumn: false });
    });

    it('returns column props unchanged when not including sticky selection', () => {
      const props = { isStickyColumn: true, hasRightBorder: true };
      expect(mergeFirstStickyDataColumnProps(props, false)).toBe(props);
    });

    it('returns undefined when column props are undefined', () => {
      expect(mergeFirstStickyDataColumnProps(undefined, true)).toBeUndefined();
    });
  });
});
