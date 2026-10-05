import { Children, isValidElement, cloneElement, useMemo, useCallback, useState, useRef, useEffect, ReactElement, ReactNode } from 'react';
import {
  Menu, MenuContent, MenuItem, MenuList, MenuToggle, Popper, ToolbarGroup, ToolbarToggleGroup, ToolbarToggleGroupProps,
} from '@patternfly/react-core';
import { FilterIcon } from '@patternfly/react-icons';

export interface DataViewFilterOption {
  /** Filter option label */
  label: ReactNode;
  /** Filter option value */
  value: string;
}

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
  /** Optional filterId to use as the default active filter. Falls back to the first filter when not specified. The active filter resets to this value when all filter values are cleared. */
  defaultActiveFilter?: string;
};


export const DataViewFilters = <T extends object>({
  children,
  ouiaId = 'DataViewFilters',
  toggleIcon = <FilterIcon />,
  breakpoint = 'xl',
  onChange,
  values,
  defaultActiveFilter,
  ...props
}: DataViewFiltersProps<T>) => {
  const [ activeAttributeMenu, setActiveAttributeMenu ] = useState<string>('');
  const [ isAttributeMenuOpen, setIsAttributeMenuOpen ] = useState(false);
  const attributeToggleRef = useRef<HTMLButtonElement>(null);
  const attributeMenuRef = useRef<HTMLDivElement>(null);
  const attributeContainerRef = useRef<HTMLDivElement>(null);

  const childrenHash = useMemo(() => JSON.stringify(
    Children.map(children, (child) =>
      isValidElement(child) ? { type: child.type, key: child.key, props: child.props } : child
    )
  ), [ children ]);

  const filterItems: DataViewFilterIdentifiers[] = useMemo(() => Children.toArray(children)
    .map(child =>
      isValidElement(child) ? { filterId: String((child.props as any).filterId), title: String((child.props as any).title) } : undefined
    ).filter((item): item is DataViewFilterIdentifiers => !!item), [ childrenHash ]);  // eslint-disable-line react-hooks/exhaustive-deps

  const getDefaultTitle = useCallback(() => {
    if (defaultActiveFilter) {
      const match = filterItems.find(item => item.filterId === defaultActiveFilter);
      if (match) {
        return match.title;
      }
    }
    return filterItems.length > 0 ? filterItems[0].title : '';
  }, [ defaultActiveFilter, filterItems ]);

  useEffect(() => {
    if (!activeAttributeMenu || !filterItems.some(item => item.title === activeAttributeMenu)) {
      setActiveAttributeMenu(getDefaultTitle());
    }
  }, [ filterItems, getDefaultTitle ]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (values && Object.values(values).every(v => v === '' || v === undefined || (Array.isArray(v) && v.length === 0))) {
      setActiveAttributeMenu(getDefaultTitle());
    }
  }, [ values, getDefaultTitle ]);

  const handleClickOutside = (event: MouseEvent) => 
    isAttributeMenuOpen &&
    !attributeMenuRef.current?.contains(event.target as Node) &&
    !attributeToggleRef.current?.contains(event.target as Node)
    && setIsAttributeMenuOpen(false);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [ isAttributeMenuOpen ]); // eslint-disable-line react-hooks/exhaustive-deps

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
        {Children.map(children, (child) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<{
              showToolbarItem: boolean;
              onChange: (_e: unknown, values: unknown) => void;
              value: unknown;
            }>, {
              showToolbarItem: activeAttributeMenu === (child.props as any).title,
              onChange: (event, value) => onChange?.((child.props as any).filterId, { [(child.props as any).filterId]: value } as Partial<T>),
              value: values?.[(child.props as any).filterId],
              ...(child.props as any)
            })
            : child
        )}
      </ToolbarGroup>
    </ToolbarToggleGroup>
  );
};

export default DataViewFilters;
