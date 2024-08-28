import React, { createContext, PropsWithChildren, useContext } from 'react';

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
}

export const InternalContext = createContext<InternalContextValue>({
  selection: undefined
});

export type InternalProviderProps = PropsWithChildren<InternalContextValue>

export const InternalContextProvider: React.FC<InternalProviderProps> = ({
  children,
  selection
}) => (
  <InternalContext.Provider
    value={{ selection }}
  >
    {children}
  </InternalContext.Provider>
);

export const useInternalContext = () => useContext(InternalContext);

export default InternalContext;
