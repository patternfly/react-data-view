/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export interface UseDataViewSelectionProps {
  /** Function to compare items when checking if item is selected */
  matchOption: (item: any, another: any) => boolean;
  /** Array of initially selected entries */
  initialSelected?: (any)[];
}

export const useDataViewSelection = (props?: UseDataViewSelectionProps) => {
  const [ selected, setSelected ] = useState<any[]>(props?.initialSelected ?? []);
  const matchOption = props?.matchOption ? props.matchOption : (option, another) => (option === another);

  const onSelect = (isSelecting: boolean, items?: any[] | any) => {
    isSelecting && items ?
      setSelected(prev => {
        const newSelectedItems = [ ...prev ];
        (Array.isArray(items) ? items : [ items ]).forEach(newItem => !prev.some(prevItem => matchOption(prevItem, newItem)) && newSelectedItems.push(newItem));
        return newSelectedItems;
      })
      : setSelected(items ? prev => prev.filter(prevSelected => !(Array.isArray(items) ? items : [ items ]).some(item => matchOption(item, prevSelected))) : []);
  };
  
  const isSelected = (item: any): boolean => Boolean(selected.find(selected => matchOption(selected, item)));

  const setSelectedItems = (items: any[]) => {
    setSelected(items);
  };

  return {
    selected,
    onSelect,
    isSelected,
    setSelected: setSelectedItems
  };
};
