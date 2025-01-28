import React from 'react';
import {
  MenuProps,
  ToolbarLabel,
  ToolbarFilter,
  TreeViewDataItem,
  MenuContainer,
  MenuToggle,
  Panel,
  PanelMain,
  PanelMainBody,
  Title,
  TreeView,
} from '@patternfly/react-core';

const isToolbarLabel = (label: string | ToolbarLabel): label is ToolbarLabel =>
  typeof label === 'object' && 'key' in label;

/** extends MenuProps */
export interface DataViewTreeFilterProps extends Omit<MenuProps, 'onSelect' | 'onChange'> {
  /** Unique key for the filter attribute */
  filterId: string;
  /** Array of current filter values */
  value?: string[];
  /** Filter title displayed in the toolbar */
  title: string;
  /** Placeholder text of the menu */
  placeholder?: string;
  /** Filter options displayed */
  options: TreeViewDataItem[];
  /** Callback for updating when item selection changes. */
  onChange?: (event?: React.MouseEvent, values?: string[]) => void;
  /** Controls visibility of the filter in the toolbar */
  showToolbarItem?: boolean;
  /** Controls visibility of the filter icon */
  showIcon?: boolean;
  /** Controls visibility of the selected items badge */
  showBadge?: boolean;
  /** Custom OUIA ID */
  ouiaId?: string;
}

export const DataViewTreeFilter: React.FC<DataViewTreeFilterProps> = ({
  filterId,
  title,
  value = [],
  onChange,
  placeholder,
  options = [],
  showToolbarItem,
  ouiaId = 'DataViewTreeFilter',
  ...props
}: DataViewTreeFilterProps) => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [ checkedItems, setCheckedItems ] = React.useState<TreeViewDataItem[]>([]);


  // const containerRef = React.useRef<HTMLDivElement>(null);

  // const handleToggleClick = (event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   setTimeout(() => {
  //     const firstElement = menuRef.current?.querySelector('li > button:not(:disabled)') as HTMLElement;
  //     firstElement?.focus();
  //   }, 0);
  //   setIsOpen(prev => !prev);
  // };

  // const handleSelect = (event?: React.MouseEvent, itemId?: string | number) => {
  //   const activeItem = String(itemId);
  //   const isSelected = value.includes(activeItem);

  //   onChange?.(
  //     event,
  //     isSelected ? value.filter(item => item !== activeItem) : [ activeItem, ...value ]
  //   );
  // };

  // const handleClickOutside = (event: MouseEvent) => 
  //   isOpen &&
  //   menuRef.current && toggleRef.current &&
  //   !menuRef.current.contains(event.target as Node) && !toggleRef.current.contains(event.target as Node)
  //   && setIsOpen(false);


  // React.useEffect(() => {
  //   window.addEventListener('click', handleClickOutside);
  //   return () => {
  //     window.removeEventListener('click', handleClickOutside);
  //   };
  // }, [ isOpen ]);  // eslint-disable-line react-hooks/exhaustive-deps

  const isChecked = (dataItem: TreeViewDataItem) => checkedItems.some((item) => item.id === dataItem.id);
  const areAllDescendantsChecked = (dataItem: TreeViewDataItem) =>
    dataItem.children ? dataItem.children.every((child) => areAllDescendantsChecked(child)) : isChecked(dataItem);
  const areSomeDescendantsChecked = (dataItem: TreeViewDataItem) =>
    dataItem.children ? dataItem.children.some((child) => areSomeDescendantsChecked(child)) : isChecked(dataItem);
  const flattenTree = (tree: TreeViewDataItem[]) => {
    let result: TreeViewDataItem[] = [];
    tree.forEach((item) => {
      result.push(item);
      if (item.children) {
        result = result.concat(flattenTree(item.children));
      }
    });
    return result;
  };

  const mapTree = (item: TreeViewDataItem) => {
    const hasCheck = areAllDescendantsChecked(item);
    item.checkProps = item.checkProps || {};
    // Reset checked properties to be updated
    item.checkProps.checked = false;

    if (hasCheck) {
      item.checkProps.checked = true;
    } else {
      const hasPartialCheck = areSomeDescendantsChecked(item);
      if (hasPartialCheck) {
        item.checkProps.checked = null;
      }
    }

    if (item.children) {
      return {
        ...item,
        children: item.children.map(mapTree)
      };
    }
    return item;
  };

  const filterItems = (item: TreeViewDataItem, checkedItem: TreeViewDataItem) => {
    if (item.id === checkedItem.id) {
      return true;
    }

    if (item.children) {
      return (
        (item.children = item.children
          .map((opt) => Object.assign({}, opt))
          .filter((child) => filterItems(child, checkedItem))).length > 0
      );
    }
  };

  const onCheck = (evt: React.ChangeEvent, treeViewItem: TreeViewDataItem, treeType: string) => {
    const checked = (evt.target as HTMLInputElement).checked;


    const checkedItemTree = options
      .map((opt) => Object.assign({}, opt))
      .filter((item) => filterItems(item, treeViewItem));
    const flatCheckedItems = flattenTree(checkedItemTree);
    setCheckedItems((prevCheckedItems) =>
      checked
        ? prevCheckedItems.concat(flatCheckedItems.filter((item) => !prevCheckedItems.some((i) => i.id === item.id)))
        : prevCheckedItems.filter((item) => !flatCheckedItems.some((i) => i.id === item.id))
    );
  };

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const toggle = (
    <MenuToggle ref={toggleRef} onClick={onToggleClick} isExpanded={isOpen}>
      {isOpen ? 'Expanded' : 'Collapsed'}
    </MenuToggle>
  );
  const optionsMapped = options.map(mapTree);

  const menu = (
    <Panel
      ref={menuRef}
      variant="raised"
      style={{
        width: '300px'
      }}
    >
      <PanelMain>
        <section>
          <PanelMainBody style={{ paddingBottom: 0 }}>
            <Title headingLevel="h1" size={'md'}>
              {title}
            </Title>
          </PanelMainBody>
          <PanelMainBody style={{ padding: 0 }}>
            <TreeView
              data={optionsMapped}
              hasBadges
              hasCheckboxes
              onCheck={(event, item) => onCheck(event, item, 'status')}
            />
          </PanelMainBody>
        </section>
      </PanelMain>
    </Panel>
  );


  return (
    <ToolbarFilter
      key={ouiaId}
      data-ouia-component-id={ouiaId}
      labels={value.map(item => {
        const activeOption = options.find(option => option.id === item);
        return ({ key: activeOption?.id as string, node: activeOption?.id })
      })}
      deleteLabel={(_, label) =>
        onChange?.(undefined, value.filter(item => item !== (isToolbarLabel(label) ? label.key : label)))
      }
      categoryName={title}
      showToolbarItem={showToolbarItem}
    >
      {/* <Popper
        trigger={
          <MenuToggle
            ouiaId={`${ouiaId}-toggle`}
            ref={toggleRef}
            onClick={handleToggleClick}
            isExpanded={isOpen}
            icon={showIcon ? <FilterIcon /> : undefined}
            badge={value.length > 0 && showBadge ? <Badge data-ouia-component-id={`${ouiaId}-badge`} isRead>{value.length}</Badge> : undefined}
            style={{ width: '200px' }}
          >
            {placeholder ?? title}
          </MenuToggle>
        }
        triggerRef={toggleRef}
        popper={
          <Menu
            ref={menuRef}
            ouiaId={`${ouiaId}-menu`}
            onSelect={handleSelect}
            selected={value}
            {...props}
          >
            <MenuContent>
              <MenuList>
                {options.map(option => (
                  <MenuItem
                    data-ouia-component-id={`${ouiaId}-filter-item-${option.id}`}
                    key={option.id}
                    itemId={option.value}
                    isSelected={value.includes(option.value)}
                    hasCheckbox
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </MenuContent>
          </Menu>
        }
        popperRef={menuRef}
        appendTo={containerRef.current || undefined}
        aria-label={`${title ?? filterId} filter`}
        isVisible={isOpen}
      /> */}
      <MenuContainer
        isOpen={isOpen}
        onOpenChange={(isOpen) => setIsOpen(isOpen)}
        onOpenChangeKeys={[ 'Escape' ]}
        menu={menu}
        menuRef={menuRef}
        toggle={toggle}
        toggleRef={toggleRef}
      />
    </ToolbarFilter>
  );
};

export default DataViewTreeFilter;
