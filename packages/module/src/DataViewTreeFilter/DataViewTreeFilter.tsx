import { Dropdown, MenuToggle, MenuToggleElement, ToolbarFilter, ToolbarFilterProps, TreeView, TreeViewDataItem } from '@patternfly/react-core'
import React, { FC, useState, useRef, useEffect } from 'react'
import { createUseStyles } from 'react-jss'

/** This style is needed so the tree filter dropdown looks like the basic filter dropdow */
const useStyles = createUseStyles({
  dataViewTreeFilterTreeView: {
    '& .pf-v6-c-tree-view__node::after': {
      borderRadius: 0,
      borderRightStyle: 'none',
      borderLeftStyle: 'none'
    },
    '& .pf-v6-c-tree-view__content': {
      borderRadius: 0
    }
  }
})

// Generic helper to collect items from tree based on predicate
const collectTreeItems = (
  items: TreeViewDataItem[],
  predicate: (item: TreeViewDataItem) => boolean,
  leafOnly = false
): TreeViewDataItem[] => {
  const collected: TreeViewDataItem[] = [];

  const collect = (item: TreeViewDataItem) => {
    const isLeaf = !item.children || item.children.length === 0;

    if (predicate(item) && (!leafOnly || isLeaf)) {
      collected.push(item);
    }

    item.children?.forEach(child => collect(child));
  };

  items.forEach(item => collect(item));
  return collected;
};

// Helper function to get all checked items (not just leaf nodes)
const getAllCheckedItems = (items: TreeViewDataItem[]): TreeViewDataItem[] =>
  collectTreeItems(items, item => item.checkProps?.checked === true, false);

// Get all checked leaf items (returns array of names)
const getAllCheckedLeafItems = (items: TreeViewDataItem[]): string[] =>
  collectTreeItems(
    items,
    item => item.checkProps?.checked === true,
    true
  ).map(item => String(item.name));

// Helper function to expand all nodes in the tree
const expandAllNodes = (items: TreeViewDataItem[]): TreeViewDataItem[] =>
  items.map(item => ({
    ...item,
    defaultExpanded: true,
    children: item.children ? expandAllNodes(item.children) : undefined
  }));

// Helper function to set pre-selected items
const setPreSelectedItems = (items: TreeViewDataItem[], selectedIds: string[]): TreeViewDataItem[] =>
  items.map(item => {
    const isSelected = selectedIds.includes(String(item.id));
    const hasSelectedChildren = item.children?.some(child => selectedIds.includes(String(child.id))) ?? false;

    return {
      ...item,
      checkProps: item.checkProps ? {
        ...item.checkProps,
        checked: isSelected || hasSelectedChildren
      } : undefined,
      children: item.children ? setPreSelectedItems(item.children, selectedIds) : undefined
    };
  });

// Helper function to uncheck all items recursively
const uncheckRecursive = (items: TreeViewDataItem[]): TreeViewDataItem[] =>
  items.map(item => ({
    ...item,
    checkProps: item.checkProps ? { ...item.checkProps, checked: false } : undefined,
    children: item.children ? uncheckRecursive(item.children) : undefined
  }));

export interface DataViewTreeFilterProps {
  /** Unique key for the filter attribute */
  filterId: string;
  /** Array of current filter values */
  value?: string[];
  /** Filter title displayed in the toolbar */
  title: string;
  /** Callback for when the selection changes */
  onChange?: (event?: React.MouseEvent, values?: string[]) => void;
  /** Controls visibility of the filter in the toolbar */
  showToolbarItem?: ToolbarFilterProps['showToolbarItem'];
  /** Custom OUIA ID */
  ouiaId?: string;
  /** Hierarchical data items for the tree structure */
  items?: TreeViewDataItem[];
  /** When true, expands all tree nodes by default */
  defaultExpanded?: boolean;
  /** Callback for when tree items are selected/deselected, provides all currently selected nodes */
  onSelect?: (selectedItems: TreeViewDataItem[]) => void;
  /** Array of pre-selected item id's to be checked on initial render */
  defaultSelected?: string[];
}

export const DataViewTreeFilter: FC<DataViewTreeFilterProps> = ({
  filterId,
  title,
  value = [],
  onChange,
  showToolbarItem,
  ouiaId = 'DataViewTreeFilter',
  items,
  defaultExpanded = false,
  onSelect,
  defaultSelected = []
}: DataViewTreeFilterProps) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [treeData, setTreeData] = useState<TreeViewDataItem[]>(items || []);
  const menuRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const hasCalledInitialOnChange = useRef(false);

  // Initialize tree data with defaultExpanded and defaultSelected (only on first mount)
  useEffect(() => {
    if (!items) {
      return;
    }

    let initializedData = [...items];

    // Apply default expansion
    if (defaultExpanded) {
      initializedData = expandAllNodes(initializedData);
    }

    // Apply pre-selected items only on initial mount
    if (isInitialMount.current && defaultSelected.length > 0) {
      initializedData = setPreSelectedItems(initializedData, defaultSelected);
    }

    setTreeData(initializedData);

    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  }, [items, defaultExpanded]);

  // Call onChange and onSelect after tree data is initialized with default selections
  useEffect(() => {
    if (!hasCalledInitialOnChange.current && defaultSelected.length > 0 && treeData.length > 0) {
      const selectedValues = getAllCheckedLeafItems(treeData);

      // Only call if there are actually selected values
      if (selectedValues.length > 0) {
        // Defer the callbacks to avoid updating parent during render
        queueMicrotask(() => {
          if (onChange) {
            onChange(undefined, selectedValues);
          }

          if (onSelect) {
            const selectedItems = getAllCheckedItems(treeData);
            onSelect(selectedItems);
          }
        });

        hasCalledInitialOnChange.current = true;
      }
    }
  }, [treeData]);

  // Sync tree checkboxes when value prop changes (when clearAllFilters is called)
  useEffect(() => {
    if (value.length === 0) {
      setTreeData(currentTreeData => {
        if (currentTreeData.length === 0) {
          return currentTreeData;
        }

        const currentCheckedItems = getAllCheckedLeafItems(currentTreeData);

        // Only update if there are checked items that need to be unchecked
        if (currentCheckedItems.length > 0) {
          return uncheckRecursive(currentTreeData);
        }

        return currentTreeData;
      });
    }
  }, [value]);

  // Check if all children are checked (recursive)
  const areAllChildrenChecked = (item: TreeViewDataItem): boolean => {
    if (!item.children?.length) {
      return item.checkProps?.checked === true;
    }
    return item.children.every(child => areAllChildrenChecked(child));
  };

  // Check if some children are checked (recursive)
  const areSomeChildrenChecked = (item: TreeViewDataItem): boolean => {
    if (!item.children?.length) {
      return item.checkProps?.checked === true;
    }
    return item.children.some(child => areSomeChildrenChecked(child));
  };

  // Find tree item by name
  const findItemByName = (items: TreeViewDataItem[], name: string): TreeViewDataItem | null => {
    for (const item of items) {
      if (item.name === name) {
        return item;
      }
      if (item.children) {
        const found = findItemByName(item.children, name);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  // Find parent item by child ID
  const findParentById = (items: TreeViewDataItem[], childId: string): TreeViewDataItem | null => {
    for (const item of items) {
      if (item.children?.some(child => child.id === childId)) {
        return item;
      }
      if (item.children) {
        const found = findParentById(item.children, childId);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  // Update parent checkbox states based on children (recursive)
  const onCheckParentHandle = (childId: string): void => {
    const parent = findParentById(treeData, childId);
    if (!parent) {
      return;
    }

    if (parent.checkProps) {
      const allChildrenChecked = areAllChildrenChecked(parent);
      const someChildrenChecked = areSomeChildrenChecked(parent);

      if (allChildrenChecked) {
        parent.checkProps.checked = true;
      } else if (someChildrenChecked) {
        parent.checkProps.checked = null;
      } else {
        parent.checkProps.checked = false;
      }
    }

    if (parent.id) {
      onCheckParentHandle(parent.id);
    }
  };

  // Check/uncheck item and all its children (recursive)
  const onCheckHandle = (treeViewItem: TreeViewDataItem, checked: boolean): void => {
    if (treeViewItem.checkProps) {
      treeViewItem.checkProps.checked = checked;
    }

    treeViewItem.children?.forEach(child => onCheckHandle(child, checked));
  };

  // Handle checkbox change event
  const onCheck = (event: React.ChangeEvent, treeViewItem: TreeViewDataItem) => {
    const checked = (event.target as HTMLInputElement).checked;

    onCheckHandle(treeViewItem, checked);

    if (treeViewItem.id) {
      onCheckParentHandle(treeViewItem.id);
    }

    setTreeData(prev => [...prev]);

    const selectedValues = getAllCheckedLeafItems(treeData);
    onChange?.(event as any, selectedValues);

    if (onSelect) {
      const selectedItems = getAllCheckedItems(treeData);
      onSelect(selectedItems);
    }
  };

  // Clear a specific filter by name (when label chip is removed)
  const onFilterSelectorClear = (itemName: string) => {
    const treeViewItem = findItemByName(treeData, itemName);
    if (!treeViewItem) {
      return;
    }

    onCheckHandle(treeViewItem, false);
    if (treeViewItem.id) {
      onCheckParentHandle(treeViewItem.id);
    }
  };

  // Uncheck all items in the tree
  const uncheckAllItems = () => {
    const updatedTreeData = uncheckRecursive(treeData);
    setTreeData(updatedTreeData);
    onChange?.(undefined, []);
  };

  const dropdown = (
    <Dropdown
      ref={menuRef}
      isOpen={isOpen}
      onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
      toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
        <MenuToggle ref={toggleRef} onClick={() => setIsOpen(!isOpen)} isExpanded={isOpen}>
          {title}
        </MenuToggle>
      )}
      ouiaId={ouiaId}
      shouldFocusToggleOnSelect
    >
      <TreeView
        hasAnimations
        data={treeData}
        onCheck={onCheck}
        hasCheckboxes
        className={classes.dataViewTreeFilterTreeView}
      />
    </Dropdown>
  );

  return (
    <ToolbarFilter
      key={filterId}
      data-ouia-component-id={ouiaId}
      labels={value.map(item => ({ key: item, node: item }))}
      deleteLabel={(_, label) => {
        const labelKey = typeof label === 'string' ? label : label.key;
        onChange?.(undefined, value.filter(item => item !== labelKey));
        onFilterSelectorClear(labelKey);
      }}
      deleteLabelGroup={uncheckAllItems}
      categoryName={title}
      showToolbarItem={showToolbarItem}>
      {dropdown}
    </ToolbarFilter>
  )
}

export default DataViewTreeFilter;