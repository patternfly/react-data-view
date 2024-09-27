import React, { createContext, PropsWithChildren, useContext } from 'react';
import { DataViewState } from '../DataView';

export interface DataViewSelection {
  /** Called when the selection of items changes */
  onSelect: (isSelecting: boolean, items?: any[] | any) => void;  // eslint-disable-line @typescript-eslint/no-explicit-any
  /** Checks if a specific item is currently selected */
  isSelected: (item: any) => boolean;  // eslint-disable-line @typescript-eslint/no-explicit-any
  /** Determines if selection is disabled for a given item */
  isSelectDisabled?: (item: any) => boolean;  // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface InternalContextValue {
  selection?: DataViewSelection;
  activeState?: DataViewState; 
}

export const InternalContext = createContext<InternalContextValue>({
  selection: undefined,
  activeState: undefined
});

export type InternalProviderProps = PropsWithChildren<InternalContextValue>

export const InternalContextProvider: React.FC<InternalProviderProps> = ({
  children,
  selection,
  activeState
}) => (
  <InternalContext.Provider
    value={{ selection, activeState }}
  >
    {children}
  </InternalContext.Provider>
);

export const useInternalContext = () => useContext(InternalContext);

export default InternalContext;
