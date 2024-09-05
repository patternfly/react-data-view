import React from 'react';
import {
  Table,
  TableProps,
  Tbody,
  Td,
  TdProps,
  TreeRowWrapper,
} from '@patternfly/react-table';
import { useInternalContext } from '../InternalContext';
import { DataViewTableHeader } from '../DataViewTableHeader';
import { DataViewTh, DataViewTrTree, isDataViewTdObject } from '../DataViewTable';

export interface DataViewTableTreeProps extends Omit<TableProps, 'onSelect' | 'rows'> {
  /** Columns definition */
  columns: DataViewTh[];
  /** Current page rows */
  rows: DataViewTrTree[];
  /** Optinal icon for the leaf rows */
  leafIcon?: React.ReactNode;
  /** Optinal icon for the expanded parent rows */
  expandedIcon?: React.ReactNode;
  /** Optinal icon for the collapsed parent rows */
  collapsedIcon?: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string;
}

export const DataViewTableTree: React.FC<DataViewTableTreeProps> = ({
  columns,
  rows,
  leafIcon = null,
  expandedIcon = null,
  collapsedIcon = null,
  ouiaId = 'DataViewTableTree',
  ...props
}: DataViewTableTreeProps) => {
  const { selection } = useInternalContext();
  const { onSelect, isSelected, isSelectDisabled } = selection ?? {};
  const [ expandedNodeIds, setExpandedNodeIds ] = React.useState<string[]>([]);
  const [ expandedDetailsNodeNames, setExpandedDetailsNodeIds ] = React.useState<string[]>([]);

  const getDescendants = (node: DataViewTrTree): DataViewTrTree[] => {
    if (!node.children || !node.children.length) {
      return [ node ];
    } else {
      let children: DataViewTrTree[] = [];
      node.children.forEach((child) => {
        children = [ ...children, ...getDescendants(child) ];
      });
      return children;
    }
  };

  const areAllDescendantsSelected = (node: DataViewTrTree) => getDescendants(node).every((n) => isSelected?.(n));
  const areSomeDescendantsSelected = (node: DataViewTrTree) => getDescendants(node).some((n) => isSelected?.(n));

  const isNodeChecked = (node: DataViewTrTree) => {
    if (areAllDescendantsSelected(node)) {
      return true;
    }
    if (areSomeDescendantsSelected(node)) {
      return null;
    }
    return false;
  };

  /** 
    Recursive function which flattens the data into an array of flattened TreeRowWrapper components
    params: 
      - nodes - array of a single level of tree nodes
      - level - number representing how deeply nested the current row is
      - posinset - position of the row relative to this row's siblings
      - currentRowIndex - position of the row relative to the entire table
      - isHidden - defaults to false, true if this row's parent is expanded
  */
  const renderRows = (
    [ node, ...remainingNodes ]: DataViewTrTree[],
    level = 1,
    posinset = 1,
    rowIndex = 0,
    isHidden = false
  ): React.ReactNode[] => {
    if (!node) {
      return [];
    }
    const isExpanded = expandedNodeIds.includes(node.id);
    const isDetailsExpanded = expandedDetailsNodeNames.includes(node.id);
    const isChecked = isNodeChecked(node);
    let icon = leafIcon;
    if (node.children) {
      icon = isExpanded ? expandedIcon : collapsedIcon;
    }

    const treeRow: TdProps['treeRow'] = {
      onCollapse: () =>
        setExpandedNodeIds((prevExpanded) => {
          const otherExpandedNodeIds = prevExpanded.filter((id) => id !== node.id);
          return isExpanded ? otherExpandedNodeIds : [ ...otherExpandedNodeIds, node.id ];
        }),
      onToggleRowDetails: () =>
        setExpandedDetailsNodeIds((prevDetailsExpanded) => {
          const otherDetailsExpandedNodeIds = prevDetailsExpanded.filter((id) => id !== node.id);
          return isDetailsExpanded ? otherDetailsExpandedNodeIds : [ ...otherDetailsExpandedNodeIds, node.id ];
        }),
      onCheckChange: (isSelectDisabled?.(node) || !onSelect) ? undefined : (_event, isChecking) => onSelect?.(isChecking, getDescendants(node)),
      rowIndex,
      props: {
        isExpanded,
        isDetailsExpanded,
        isHidden,
        'aria-level': level,
        'aria-posinset': posinset,
        'aria-setsize': node.children?.length ?? 0,
        isChecked,
        ouiaId: `${ouiaId}-tree-toggle-${node.id}`,
        checkboxId: `checkbox_id_${node.id?.toLowerCase().replace(/\s+/g, '_')}`,
        icon,
      }
    };

    const childRows =
      node.children && node.children.length
        ? renderRows(node.children, level + 1, 1, rowIndex + 1, !isExpanded || isHidden)
        : [];

    return [
      <TreeRowWrapper key={node.id} row={{ props: treeRow.props }}>
        {node.row.map((cell, colIndex) => {
          const cellIsObject = isDataViewTdObject(cell);
          return (
            <Td
              key={colIndex}
              treeRow={colIndex === 0 ? treeRow : undefined}
              {...(cellIsObject && (cell?.props ?? {}))}
              data-ouia-component-id={`${ouiaId}-td-${rowIndex}-${colIndex}`}
            >
              {cellIsObject ? cell.cell : cell}
            </Td>
          )
        })}
      </TreeRowWrapper>,
      ...childRows,
      ...renderRows(remainingNodes, level, posinset + 1, rowIndex + 1 + childRows.length, isHidden)
    ];
  };

  return (
    <Table isTreeTable aria-label="Data table" ouiaId={ouiaId} {...props}>
      <DataViewTableHeader isTreeTable columns={columns} ouiaId={ouiaId} />
      <Tbody>
        {renderRows(rows)}
      </Tbody>
    </Table>
  );
};

export default DataViewTableTree;
