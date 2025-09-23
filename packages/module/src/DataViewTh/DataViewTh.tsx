import {
  FC,
  useState,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  useCallback,
  useRef,
  useEffect
} from 'react';
import { Th, ThProps } from '@patternfly/react-table';
import { Button, getLanguageDirection } from '@patternfly/react-core';
export interface DataViewThResizableProps {
  /** Whether the column is resizable */
  isResizable?: boolean;
  /** Callback after the column is resized */
  onResize?: (
    event: ReactMouseEvent | MouseEvent | ReactKeyboardEvent | KeyboardEvent | TouchEvent,
    width: number
  ) => void;
  /** Width of the column */
  width?: number;
  /** Minimum width of the column */
  minWidth?: number;
  /** Increment for keyboard navigation */
  increment?: number;
  /** Increment for keyboard navigation while shift is held */
  shiftIncrement?: number;
  /** Aria label for the resize button */
  resizeButtonAriaLabel?: string;
  /** Screenreader text for the column */
  screenReaderText?: string;
}
export interface DataViewThProps {
  /** Cell content */
  content: ReactNode;
  /** Resizable props */
  resizableProps?: DataViewThResizableProps;
  /** @hide Indicates whether the table has resizable columns */
  hasResizableColumns?: boolean;
  /** Props passed to Th */
  props?: ThProps;
}

export const DataViewTh: FC<DataViewThProps> = ({
  content,
  resizableProps = {},
  hasResizableColumns = false,
  props: thProps,
  ...restProps
}: DataViewThProps) => {
  const thRef = useRef<HTMLTableCellElement>(null);

  const [ width, setWidth ] = useState(resizableProps?.width ? resizableProps.width : 0);

  const isResizable = resizableProps?.isResizable || false;
  const increment = resizableProps?.increment || 5;
  const shiftIncrement = resizableProps?.shiftIncrement || 25;
  const resizeButtonAriaLabel = resizableProps?.resizeButtonAriaLabel || `Resize ${content}`;
  const onResize = resizableProps?.onResize || undefined;
  const screenReaderText = resizableProps?.screenReaderText || `Column ${width.toFixed(0)} pixels`;

  const resizeButtonRef = useRef<HTMLButtonElement>(null);
  const setInitialVals = useRef(true);
  const dragOffset = useRef(0);
  const isResizing = useRef(false);
  const isInView = useRef(true);

  useEffect(() => {
    if (!isResizable) {
      return;
    }

    const observed = resizeButtonRef.current;
    const observer = new IntersectionObserver(
      ([ entry ]) => {
        isInView.current = entry.isIntersecting;
      },
      { threshold: 0.3 }
    );

    if (observed) {
      observer.observe(observed);
    }

    return () => {
      if (observed) {
        observer.unobserve(observed);
      }
    };
  }, []);

  useEffect(() => {
    if ((isResizable || hasResizableColumns) && setInitialVals.current && width === 0) {
      setWidth(thRef.current?.getBoundingClientRect().width || 0);
      setInitialVals.current = false;
    }
  }, [ isResizable, hasResizableColumns, setInitialVals ]);

  const setDragOffset = (e: ReactMouseEvent | ReactTouchEvent) => {
    const isRTL = getLanguageDirection(thRef.current as HTMLElement) === 'rtl';
    const startingMousePos = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    const startingColumnPos =
      (isRTL ? thRef.current?.getBoundingClientRect().left : thRef.current?.getBoundingClientRect().right) || 0;

    dragOffset.current = startingColumnPos - startingMousePos;
  };

  const handleMousedown = (e: ReactMouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    document.addEventListener('mousemove', callbackMouseMove);
    document.addEventListener('mouseup', callbackMouseUp);

    // When a user begins resizing a column, set the drag offset so the drag motion aligns with the column edge
    if (dragOffset.current === 0) {
      setDragOffset(e);
    }

    isResizing.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    const mousePos = e.clientX;

    handleControlMove(e, dragOffset.current + mousePos);
  };

  const handleTouchStart = (e: ReactTouchEvent) => {
    e.stopPropagation();
    document.addEventListener('touchmove', callbackTouchMove, { passive: false });
    document.addEventListener('touchend', callbackTouchEnd);

    // When a user begins resizing a column, set the drag offset so the drag motion aligns with the column edge
    if (dragOffset.current === 0) {
      setDragOffset(e);
    }

    isResizing.current = true;
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const touchPos = e.touches[0].clientX;

    handleControlMove(e, touchPos);
  };

  const handleControlMove = (e: MouseEvent | TouchEvent, controlPosition: number) => {
    e.stopPropagation();

    if (!isResizing.current) {
      return;
    }

    const columnRect = thRef.current?.getBoundingClientRect();
    if (columnRect === undefined) {
      return;
    }

    const mousePos = controlPosition;
    const isRTL = getLanguageDirection(thRef.current as HTMLElement) === 'rtl';
    let newSize = isRTL ? columnRect?.right - mousePos : mousePos - columnRect?.left;

    // Prevent the column from shrinking below a specified minimum width
    if (resizableProps.minWidth && newSize < resizableProps.minWidth) {
      newSize = resizableProps.minWidth;
    }

    thRef.current?.style.setProperty('min-width', newSize + 'px');
    setWidth(newSize);
  };

  const handleMouseup = (e: MouseEvent) => {
    if (!isResizing.current) {
      return;
    }
    // Reset the isResizing and dragOffset values to their initial states
    isResizing.current = false;
    dragOffset.current = 0;

    // Call the onResize callback with the new width
    onResize && onResize(e, width);

    // Handle scroll into view when column drag button is moved off screen
    if (resizeButtonRef.current && !isInView.current) {
      resizeButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    document.removeEventListener('mousemove', callbackMouseMove);
    document.removeEventListener('mouseup', callbackMouseUp);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.stopPropagation();
    if (!isResizing) {
      return;
    }
    // Reset the isResizing and dragOffset values to their initial states
    isResizing.current = false;
    dragOffset.current = 0;

    // Call the onResize callback with the new width
    onResize && onResize(e, width);

    document.removeEventListener('touchmove', callbackTouchMove);
    document.removeEventListener('touchend', callbackTouchEnd);
  };

  const callbackMouseMove = useCallback(handleMouseMove, []);
  const callbackTouchEnd = useCallback(handleTouchEnd, []);
  const callbackTouchMove = useCallback(handleTouchMove, []);
  const callbackMouseUp = useCallback(handleMouseup, []);

  const handleKeys = (e: ReactKeyboardEvent) => {
    const key = e.key;

    if (key === 'Tab') {
      isResizing.current = false;
    }

    if (key !== 'ArrowLeft' && key !== 'ArrowRight') {
      return;
    }
    e.preventDefault();

    isResizing.current = true;
    const isRTL = getLanguageDirection(thRef.current as HTMLElement) === 'rtl';
    const columnRect = thRef.current?.getBoundingClientRect();

    let newSize = columnRect?.width || 0;
    let delta = 0;
    const _increment = e.shiftKey ? shiftIncrement : increment;

    if (key === 'ArrowRight') {
      if (isRTL) {
        delta = -_increment;
      } else {
        delta = _increment;
      }
    } else if (key === 'ArrowLeft') {
      if (isRTL) {
        delta = _increment;
      } else {
        delta = -_increment;
      }
    }
    newSize = newSize + delta;

    thRef.current?.style.setProperty('min-width', newSize + 'px');
    setWidth(newSize);
    onResize && onResize(e, newSize);
  };

  return (
    <Th {...thProps} {...restProps} style={width > 0 ? { minWidth: width } : undefined} ref={thRef}>
      {content}
      {isResizable && (
        <Button
          ref={resizeButtonRef}
          variant="plain"
          onMouseDown={handleMousedown}
          onKeyDown={handleKeys}
          onTouchStart={handleTouchStart}
          style={{ float: 'inline-end' }}
          aria-label={resizeButtonAriaLabel}
        >
          test
        </Button>
      )}
      {isResizable && (
        <div aria-live="polite" className="pf-v6-screen-reader">
          {screenReaderText}
        </div>
      )}
    </Th>
  );
};

export default DataViewTh;
