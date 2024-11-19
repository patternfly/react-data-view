import React from 'react';
import {
  Badge,
  Menu,
  MenuContent,
  MenuItem,
  MenuList,
  MenuProps,
  MenuToggle,
  Popper,
  ToolbarChip,
  ToolbarFilter,
} from '@patternfly/react-core';
import { FilterIcon } from '@patternfly/react-icons';
import { DataViewFilterOption } from '../DataViewFilters';

const isToolbarChip = (chip: string | ToolbarChip): chip is ToolbarChip =>
  typeof chip === 'object' && 'key' in chip;

export const isDataViewFilterOption = (obj: unknown): obj is DataViewFilterOption =>
  !!obj &&
  typeof obj === 'object' &&
  'label' in obj &&
  'value' in obj &&
  typeof (obj as DataViewFilterOption).value === 'string';

/** extends MenuProps */
export interface DataViewCheckboxFilterProps extends Omit<MenuProps, 'onSelect' | 'onChange'> {
  /** Unique key for the filter attribute */
  filterId: string;
  /** Array of current filter values */
  value?: string[];
  /** Filter title displayed in the toolbar */
  title: string;
  /** Placeholder text of the menu */
  placeholder?: string;
  /** Filter options displayed */
  options: (DataViewFilterOption | string)[];
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

export const DataViewCheckboxFilter: React.FC<DataViewCheckboxFilterProps> = ({
  filterId,
  title,
  value = [],
  onChange,
  placeholder,
  options = [],
  showToolbarItem,
  showIcon = !placeholder,
  showBadge = !placeholder,
  ouiaId = 'DataViewCheckboxFilter',
  ...props
}: DataViewCheckboxFilterProps) => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const normalizeOptions = React.useMemo(
    () =>
      options.map(option =>
        typeof option === 'string'
          ? { label: option, value: option }
          : option
      ),
    [ options ]
  );

  const handleToggleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setTimeout(() => {
      const firstElement = menuRef.current?.querySelector('li > button:not(:disabled)') as HTMLElement;
      firstElement?.focus();
    }, 0);
    setIsOpen(prev => !prev);
  };

  const handleSelect = (event?: React.MouseEvent, itemId?: string | number) => {
    const activeItem = String(itemId);
    const isSelected = value.includes(activeItem);

    onChange?.(
      event,
      isSelected ? value.filter(item => item !== activeItem) : [ activeItem, ...value ]
    );
  };

  const handleClickOutside = (event: MouseEvent) => 
    isOpen &&
    menuRef.current && toggleRef.current &&
    !menuRef.current.contains(event.target as Node) && !toggleRef.current.contains(event.target as Node)
    && setIsOpen(false);


  React.useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [ isOpen ]);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ToolbarFilter
      key={ouiaId}
      data-ouia-component-id={ouiaId}
      chips={value.map(item => {
        const activeOption = normalizeOptions.find(option => option.value === item);
        return ({ key: activeOption?.value as string, node: activeOption?.label })
      })}
      deleteChip={(_, chip) =>
        onChange?.(undefined, value.filter(item => item !== (isToolbarChip(chip) ? chip.key : chip)))
      }
      categoryName={title}
      showToolbarItem={showToolbarItem}
    >
      <Popper
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
                {normalizeOptions.map(option => (
                  <MenuItem
                    data-ouia-component-id={`${ouiaId}-filter-item-${option.value}`}
                    key={option.value}
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
      />
    </ToolbarFilter>
  );
};

export default DataViewCheckboxFilter;
