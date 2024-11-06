import React, { useMemo, useState, useRef, useEffect, ReactElement } from 'react';
import {
  Menu, MenuContent, MenuItem, MenuList, MenuToggle, Popper, ToolbarGroup, ToolbarToggleGroup, ToolbarToggleGroupProps,
} from '@patternfly/react-core';
import { FilterIcon } from '@patternfly/react-icons';

// helper interface to generate attribute menu
interface DataViewFilterIdentifiers {
  filterId: string;
  title: string;
}

/** extends ToolbarToggleGroupProps */
export interface DataViewFiltersProps<T extends object> extends Omit<ToolbarToggleGroupProps, 'toggleIcon' | 'breakpoint' | 'onChange'> {
  /** Content rendered inside the data view */
  children: React.ReactNode;
  /** Optional onChange callback shared across filters */
  onChange?: (key: string, newValues: Partial<T>) => void;
  /** Optional values shared across filters */
  values?: T;
  /** Icon for the toolbar toggle group */
  toggleIcon?: ToolbarToggleGroupProps['toggleIcon'];
  /** Breakpoint for the toolbar toggle group */
  breakpoint?: ToolbarToggleGroupProps['breakpoint'];
  /** Custom OUIA ID */
  ouiaId?: string;
};


export const DataViewFilters = <T extends object>({
  children,
  ouiaId = 'DataViewFilters',
  toggleIcon = <FilterIcon />,
  breakpoint = 'xl',
  onChange,
  values,
  ...props
}: DataViewFiltersProps<T>) => {
  const [ activeAttributeMenu, setActiveAttributeMenu ] = useState<string>('');
  const [ isAttributeMenuOpen, setIsAttributeMenuOpen ] = useState(false);
  const attributeToggleRef = useRef<HTMLButtonElement>(null);
  const attributeMenuRef = useRef<HTMLDivElement>(null);
  const attributeContainerRef = useRef<HTMLDivElement>(null);

  const childrenHash = useMemo(() => JSON.stringify(
    React.Children.map(children, (child) =>
      React.isValidElement(child) ? { type: child.type, key: child.key, props: child.props } : child
    )
  ), [ children ]);

  const filterItems: DataViewFilterIdentifiers[] = useMemo(() => React.Children.toArray(children)
    .map(child =>
      React.isValidElement(child) ? { filterId: String(child.props.filterId), title: String(child.props.title) } : undefined
    ).filter((item): item is DataViewFilterIdentifiers => !!item), [ childrenHash ]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    filterItems.length > 0 && setActiveAttributeMenu(filterItems[0].title);
  }, [ filterItems ]);

  const attributeToggle = (
    <MenuToggle
      ref={attributeToggleRef}
      onClick={() => setIsAttributeMenuOpen(!isAttributeMenuOpen)}
      isExpanded={isAttributeMenuOpen}
      icon={toggleIcon}
    >
      {activeAttributeMenu}
    </MenuToggle>
  );

  const attributeMenu = (
    <Menu
      ref={attributeMenuRef}
      onSelect={(_ev, itemId) => {
        const selectedItem = filterItems.find(item => item.filterId === itemId);
        selectedItem && setActiveAttributeMenu(selectedItem.title);
        setIsAttributeMenuOpen(false);
      }}
    >
      <MenuContent>
        <MenuList>
          {filterItems.map(item => (
            <MenuItem key={item.filterId} itemId={item.filterId}>
              {item.title}
            </MenuItem>
          ))}
        </MenuList>
      </MenuContent>
    </Menu>
  );

  return (
    <ToolbarToggleGroup data-ouia-component-id={ouiaId} toggleIcon={toggleIcon} breakpoint={breakpoint} {...props}>
      <ToolbarGroup variant="filter-group">
        <div ref={attributeContainerRef}>
          <Popper
            trigger={attributeToggle}
            triggerRef={attributeToggleRef}
            popper={attributeMenu}
            popperRef={attributeMenuRef}
            appendTo={attributeContainerRef.current || undefined}
            isVisible={isAttributeMenuOpen}
          />
        </div>
        {React.Children.map(children, (child) => (
          React.isValidElement(child) ? (
            React.cloneElement(child as ReactElement<{
              showToolbarItem: boolean;
              onChange: (_e: unknown, values: unknown) => void;
              value: unknown;
            }>, {
              showToolbarItem: activeAttributeMenu === child.props.title,
              onChange: (event, value) => onChange?.(event, { [child.props.filterId]: value } as Partial<T>),
              value: values?.[child.props.filterId],
              ...child.props
            })
          ) : child
        ))}

      </ToolbarGroup>
    </ToolbarToggleGroup>
  );
};

export default DataViewFilters;
