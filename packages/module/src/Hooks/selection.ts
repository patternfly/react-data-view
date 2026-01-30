/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export interface UseDataViewSelectionProps<T = any> {
  /** Function to compare items when checking if item is selected */
  matchOption: (item: T, another: T) => boolean;
  /** Array of initially selected entries */
  initialSelected?: (T)[];
}

export const useDataViewSelection = <T = any>(props?: UseDataViewSelectionProps<T>) => {
  const [ selected, setSelected ] = useState<T[]>(props?.initialSelected ?? []);
  const matchOption = props?.matchOption ? props.matchOption : (option, another) => (option === another);

  const onSelect = (isSelecting: boolean, items?: T[] | T) => {
    isSelecting && items ?
      setSelected(prev => {
        const newSelectedItems = [ ...prev ];
        (Array.isArray(items) ? items : [ items ]).forEach(newItem => !prev.some(prevItem => matchOption(prevItem, newItem)) && newSelectedItems.push(newItem));
        return newSelectedItems;
      })
      : setSelected(items ? prev => prev.filter(prevSelected => !(Array.isArray(items) ? items : [ items ]).some(item => matchOption(item, prevSelected))) : []);
  };
  
  const isSelected = (item: T): boolean => Boolean(selected.find(selected => matchOption(selected, item)));

  const setSelectedItems = (items: T[]) => {
    setSelected(items);
  };

  return {
    selected,
    onSelect,
    isSelected,
    setSelected: setSelectedItems
  };
};
