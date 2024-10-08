import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { DataViewState } from '../DataView';

export interface DataViewSelection {
  /** Called when the selection of items changes */
  onSelect: (isSelecting: boolean, items?: any[] | any) => void;  // eslint-disable-line @typescript-eslint/no-explicit-any
  /** Checks if a specific item is currently selected */
  isSelected: (item: any) => boolean;  // eslint-disable-line @typescript-eslint/no-explicit-any
  /** Determines if selection is disabled for a given item */
  isSelectDisabled?: (item: any) => boolean;  // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface InternalContextProps {
  /** Data selection props */
  selection?: DataViewSelection;
  /** Currently active state */
  activeState?: DataViewState;
}

export interface InternalContextValue extends InternalContextProps {
  /** Flag indicating if data view is selectable (auto-calculated) */
  isSelectable: boolean; 
}

export const InternalContext = createContext<InternalContextValue>({
  selection: undefined,
  activeState: undefined,
  isSelectable: false,
});

export type InternalProviderProps = PropsWithChildren<InternalContextProps>

export const InternalContextProvider: React.FC<InternalProviderProps> = ({
  children,
  selection,
  activeState
}) => {
  const isSelectable = useMemo(() => Boolean(selection?.onSelect && selection?.isSelected), [ selection?.onSelect, selection?.isSelected ]);
  
  return (
    <InternalContext.Provider
      value={{ selection, activeState, isSelectable }}
    >
      {children}
    </InternalContext.Provider>
  );
}

export const useInternalContext = () => useContext(InternalContext);

export default InternalContext;
