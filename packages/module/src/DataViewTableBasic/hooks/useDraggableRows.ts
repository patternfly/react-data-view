import { useState, useRef, useMemo } from 'react';
import { TbodyProps, TrProps } from '@patternfly/react-table';
import styles from '@patternfly/react-styles/css/components/Table/table';
import { DataViewTr } from '../../DataViewTable';

export interface UseDraggableRowsProps {
  rows: DataViewTr[];
  tableRef: React.RefObject<HTMLTableElement>;
  isDraggable?: boolean;
}

export interface UseDraggableRowsReturn {
  rowIds: string[];
  draggedItemId: string | null;
  draggingToItemIndex: number | null;
  isDragging: boolean;
  itemOrder: string[];
  onDragStart: TrProps['onDragStart'];
  onDragEnd: TrProps['onDragEnd'];
  onDrop: TrProps['onDrop'];
  onDropTbody: TbodyProps['onDrop'];
  onDragOver: TbodyProps['onDragOver'];
  onDragLeave: TbodyProps['onDragLeave'];
}

export const useDraggableRows = ({
  rows,
  tableRef
}: UseDraggableRowsProps): UseDraggableRowsReturn => {
  const rowIds = useMemo(() => rows.map((_, index) => `row-${index}`), [rows]);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [draggingToItemIndex, setDraggingToItemIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [itemOrder, setItemOrder] = useState(rowIds);

  const draggedItemIdRef = useRef<string | null>(null);

  const moveItem = (arr: string[], itemId: string, toIndex: number): string[] => {
    const fromIndex = arr.indexOf(itemId);
    if (fromIndex === toIndex) {
      return arr;
    }
    const temp = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, temp[0]);

    return arr;
  };

  const move = (order: string[]) => {
    const tableNode = tableRef.current;
    if (!tableNode) {
      return;
    }

    // Get all tbody elements (each tbody wraps one row)
    const tbodyNodes = Array.from(tableNode.querySelectorAll('tbody'));
    // Find the Tr inside each tbody to get its id
    const currentOrder = tbodyNodes
      .map(tbody => tbody.querySelector('tr[id]'))
      .filter((tr): tr is HTMLTableRowElement => tr !== null)
      .map(tr => tr.id);

    if (currentOrder.every((id, i) => id === order[i])) {
      return;
    }

    // Reorder tbody elements based on the new order
    order.forEach((id) => {
      const tbody = tbodyNodes.find(tbody => {
        const tr = tbody.querySelector('tr[id]');
        return tr?.id === id;
      });
      if (tbody && tbody.parentNode) {
        tbody.parentNode.appendChild(tbody);
      }
    });
  };

  const isValidDrop = (evt: React.DragEvent<HTMLTableSectionElement | HTMLTableRowElement>): boolean => {
    if (!tableRef.current) {
      return false;
    }
    const tableRect = tableRef.current.getBoundingClientRect();
    return (
      evt.clientX > tableRect.x &&
      evt.clientX < tableRect.x + tableRect.width &&
      evt.clientY > tableRect.y &&
      evt.clientY < tableRect.y + tableRect.height
    );
  };

  const onDragCancel = () => {
    if (tableRef.current) {
      const allRows = tableRef.current.querySelectorAll('tr[id]');
      allRows.forEach((el) => {
        el.classList.remove(styles.modifiers.ghostRow);
        el.setAttribute('aria-pressed', 'false');
      });
    }
    draggedItemIdRef.current = null;
    setDraggedItemId(null);
    setDraggingToItemIndex(null);
    setIsDragging(false);
  };

  const onDragStart: TrProps['onDragStart'] = (evt) => {
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text/plain', evt.currentTarget.id);
    const itemId = evt.currentTarget.id;

    evt.currentTarget.classList.add(styles.modifiers.ghostRow);
    evt.currentTarget.setAttribute('aria-pressed', 'true');

    draggedItemIdRef.current = itemId;
    setDraggedItemId(itemId);
    setIsDragging(true);
  };

  const onDragLeave: TbodyProps['onDragLeave'] = (evt) => {
    if (!isValidDrop(evt)) {
      move(itemOrder);
      setDraggingToItemIndex(null);
    }
  };

  const onDragOver: TbodyProps['onDragOver'] = (evt) => {
    evt.preventDefault();

    const currentDraggedId = draggedItemIdRef.current;
    if (!tableRef.current || !currentDraggedId) {
      return;
    }

    const curListItem = (evt.target as HTMLTableSectionElement).closest('tr[id]');
    if (!curListItem || !tableRef.current.contains(curListItem) || curListItem.id === currentDraggedId) {
      return;
    }

    const dragId = curListItem.id;
    // Get the current DOM order by finding all tbody > tr[id] pairs
    const tbodyNodes = Array.from(tableRef.current.querySelectorAll('tbody'));
    const currentDomOrder = tbodyNodes
      .map(tbody => tbody.querySelector('tr[id]'))
      .filter((tr): tr is HTMLTableRowElement => tr !== null)
      .map(tr => tr.id);

    const newDraggingToItemIndex = currentDomOrder.indexOf(dragId);

    if (newDraggingToItemIndex !== draggingToItemIndex) {
      // Use currentDomOrder as the base since DOM has already been reordered during drag
      const newOrder = moveItem([...currentDomOrder], currentDraggedId, newDraggingToItemIndex);
      move(newOrder);
      setDraggingToItemIndex(newDraggingToItemIndex);
    }
  };

  const onDrop: TrProps['onDrop'] = (evt) => {
    if (isValidDrop(evt) && tableRef.current) {
      // Read the current DOM order and commit it - this is the simplest approach
      const tbodyNodes = Array.from(tableRef.current.querySelectorAll('tbody'));
      const finalOrder = tbodyNodes
        .map(tbody => tbody.querySelector('tr[id]'))
        .filter((tr): tr is HTMLTableRowElement => tr !== null)
        .map(tr => tr.id);
      setItemOrder(finalOrder);
    } else {
      onDragCancel();
    }
  };

  const onDropTbody: TbodyProps['onDrop'] = (evt) => {
    onDrop(evt as unknown as React.DragEvent<HTMLTableRowElement>);
  };

  const onDragEnd: TrProps['onDragEnd'] = (evt) => {
    const target = evt.target as HTMLTableRowElement;
    target.classList.remove(styles.modifiers.ghostRow);
    target.setAttribute('aria-pressed', 'false');
    draggedItemIdRef.current = null;
    setDraggedItemId(null);
    setDraggingToItemIndex(null);
    setIsDragging(false);
  };

  return {
    rowIds,
    draggedItemId,
    draggingToItemIndex,
    isDragging,
    itemOrder,
    onDragStart,
    onDragEnd,
    onDrop,
    onDropTbody,
    onDragOver,
    onDragLeave
  };
};
