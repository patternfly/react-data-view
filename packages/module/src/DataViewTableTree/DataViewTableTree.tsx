import { FC, useState, useMemo, useEffect, ReactNode } from 'react';
import {
  Table,
  TableProps,
  Tbody,
  Td,
  TdProps,
  TreeRowWrapper,
} from '@patternfly/react-table';
import { useInternalContext } from '../InternalContext';
import { DataViewTableHead } from '../DataViewTableHead';
import { DataViewTh, DataViewTrTree, isDataViewTdObject } from '../DataViewTable';
import { DataViewState } from '../DataView/DataView';

const getNodesAffectedBySelection = (
  allRows: DataViewTrTree[],
  node: DataViewTrTree,
  isChecking: boolean,
  isSelected?: (item: DataViewTrTree) => boolean
): DataViewTrTree[] => {

  const getDescendants = (node: DataViewTrTree): DataViewTrTree[] =>
    node.children ? node.children.flatMap(getDescendants).concat(node) : [ node ];

  const findParent = (child: DataViewTrTree, rows: DataViewTrTree[]): DataViewTrTree | undefined =>
    rows.find(row => row.children?.some(c => c === child)) ?? 
    rows.flatMap(row => row.children ?? []).map(c => findParent(child, [ c ])).find(p => p);

  const getAncestors = (node: DataViewTrTree): DataViewTrTree[] => {
    const ancestors: DataViewTrTree[] = [];
    let parent = findParent(node, allRows);
    while (parent) {
      ancestors.push(parent);
      parent = findParent(parent, allRows);
    }
    return ancestors;
  };

  const affectedNodes = new Set([ node, ...getDescendants(node) ]);

  getAncestors(node).forEach(ancestor => {
    const allChildrenSelected = ancestor.children?.every(child => isSelected?.(child) || affectedNodes.has(child));
    const anyChildAffected = ancestor.children?.some(child => affectedNodes.has(child) || child.id === node.id);

    if (isChecking ? !isSelected?.(ancestor) && allChildrenSelected : isSelected?.(ancestor) && anyChildAffected) {
      affectedNodes.add(ancestor);
    }
  });

  return Array.from(affectedNodes);
};


/** extends TableProps */
export interface DataViewTableTreeProps extends Omit<TableProps, 'onSelect' | 'rows'> {
  /** Columns definition */
  columns: DataViewTh[];
  /** Current page rows */
  rows: DataViewTrTree[];
  /** Table head states to be displayed when active */
  headStates?: Partial<Record<DataViewState | string, React.ReactNode>>
  /** Table body states to be displayed when active */
  bodyStates?: Partial<Record<DataViewState | string, React.ReactNode>>
  /** Optional icon for the leaf rows */
  leafIcon?: React.ReactNode;
  /** Optional icon for the expanded parent rows */
  expandedIcon?: React.ReactNode;
  /** Optional icon for the collapsed parent rows */
  collapsedIcon?: React.ReactNode;
  /** Expand all expandable nodes on initial load */
  expandAll?: boolean;
  /** Custom OUIA ID */
  ouiaId?: string;
  /** Property name used as unique node identifier for expansion tracking. When provided, this property is used instead of `id` to key the expanded state. */
  indexBy?: string;
}

export const DataViewTableTree: FC<DataViewTableTreeProps> = ({
  columns,
  rows,
  headStates,
  bodyStates,
  leafIcon = null,
  expandedIcon = null,
  collapsedIcon = null,
  expandAll = false,
  ouiaId = 'DataViewTableTree',
  indexBy,
  ...props
}: DataViewTableTreeProps) => {
  const { selection, activeState } = useInternalContext();
  const { onSelect, isSelected, isSelectDisabled } = selection ?? {};
  const [ expandedNodeIds, setExpandedNodeIds ] = useState<string[]>([]);
  const [ expandedDetailsNodeNames, setExpandedDetailsNodeIds ] = useState<string[]>([]);

  /** Resolves the unique identifier for a tree node based on the `indexBy` prop or the default `id` field. */
  const getNodeId = (node: DataViewTrTree): string =>
    indexBy && indexBy in node ? String((node as unknown as Record<string, unknown>)[indexBy]) : node.id;

  // Helper function to collect all node IDs that have children (are expandable)
  const getExpandableNodeIds = (nodes: DataViewTrTree[]): string[] => {
    const expandableIds: string[] = [];

    const traverse = (nodeList: DataViewTrTree[]) => {
      nodeList.forEach(node => {
        if (node.children && node.children.length > 0) {
          expandableIds.push(getNodeId(node));
          traverse(node.children);
        }
      });
    };

    traverse(nodes);
    return expandableIds;
  };

  // Effect to handle expandAll behavior
  // Memoize the expandable IDs to avoid recalculating when rows object reference changes but structure is the same
  const expandableIds = useMemo(() => getExpandableNodeIds(rows), [ rows, indexBy ]); // eslint-disable-line react-hooks/exhaustive-deps

  // Effect to handle expandAll behavior - only runs when IDs actually change
  useEffect(() => {
    if (expandAll) {
      setExpandedNodeIds(expandableIds);
    } else {
      setExpandedNodeIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ expandAll, expandableIds.join(',') ]);

  const activeHeadState = useMemo(() => activeState ? headStates?.[activeState] : undefined, [ activeState, headStates ]);
  const activeBodyState = useMemo(() => activeState ? bodyStates?.[activeState] : undefined, [ activeState, bodyStates ]);

  const nodes = useMemo(() => {

    const renderRows = (
      [ node, ...remainingNodes ]: DataViewTrTree[],
      level = 1,
      posinset = 1,
      rowIndex = 0,
      isHidden = false
    ): ReactNode[] => {
      if (!node) {
        return [];
      }
      const nodeId = getNodeId(node);
      const isExpanded = expandedNodeIds.includes(nodeId);
      const isDetailsExpanded = expandedDetailsNodeNames.includes(nodeId);
      const isChecked = isSelected?.(node);
      let icon = leafIcon;
      if (node.children) {
        icon = isExpanded ? expandedIcon : collapsedIcon;
      }

      const treeRow: TdProps['treeRow'] = {
        onCollapse: () =>
          setExpandedNodeIds(prevExpanded => {
            const otherExpandedNodeIds = prevExpanded.filter(id => id !== nodeId);
            return isExpanded ? otherExpandedNodeIds : [ ...otherExpandedNodeIds, nodeId ];
          }),
        onToggleRowDetails: () =>
          setExpandedDetailsNodeIds(prevDetailsExpanded => {
            const otherDetailsExpandedNodeIds = prevDetailsExpanded.filter(id => id !== nodeId);
            return isDetailsExpanded ? otherDetailsExpandedNodeIds : [ ...otherDetailsExpandedNodeIds, nodeId ];
          }),
        onCheckChange: (isSelectDisabled?.(node) || !onSelect) ? undefined : (_event, isChecking) => onSelect?.(isChecking, getNodesAffectedBySelection(rows, node, isChecking, isSelected)),
        rowIndex,
        props: {
          isExpanded,
          isDetailsExpanded,
          isHidden,
          'aria-level': level,
          'aria-posinset': posinset,
          'aria-setsize': node.children?.length ?? 0,
          isChecked,
          checkboxId: `checkbox_id_${nodeId?.toLowerCase().replace(/\s+/g, '_')}`,
          icon,
        },
      };

      const childRows = node.children?.length
        ? renderRows(node.children, level + 1, 1, rowIndex + 1, !isExpanded || isHidden)
        : [];

      return [
        <TreeRowWrapper key={nodeId} row={{ props: treeRow.props }} ouiaId={`${ouiaId}-tr-${rowIndex}`}>
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
            );
          })}
        </TreeRowWrapper>,
        ...childRows,
        ...renderRows(remainingNodes, level, posinset + 1, rowIndex + 1 + childRows.length, isHidden),
      ];
    };

    return renderRows(rows);
  }, [
    rows,
    expandedNodeIds,
    expandedDetailsNodeNames,
    leafIcon,
    expandedIcon,
    collapsedIcon,
    isSelected,
    onSelect,
    isSelectDisabled,
    ouiaId,
    indexBy
  ]);

  return (
    <Table isTreeTable aria-label="Data table" ouiaId={ouiaId} {...props}>
      {activeHeadState || <DataViewTableHead isTreeTable columns={columns} ouiaId={ouiaId} />}
      {activeBodyState || <Tbody>{nodes}</Tbody>}
    </Table>
  );
};

export default DataViewTableTree;
