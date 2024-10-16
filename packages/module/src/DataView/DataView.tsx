import React from 'react';
import { Stack, StackItem } from '@patternfly/react-core';
import { DataViewSelection, InternalContextProvider } from '../InternalContext';

export const DataViewState = {
  empty: 'empty',
  loading: 'loading',
  error: 'error'
} as const;

export type DataViewState = typeof DataViewState[keyof typeof DataViewState];

export interface DataViewProps {
  /** Content rendered inside the data view */
  children: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string;
  /** Selection context configuration */
  selection?: DataViewSelection;
  /** Currently active state */
  activeState?: DataViewState | string;
}

export type DataViewImpementationProps = Omit<DataViewProps, 'onSelect' | 'isItemSelected' | 'isItemSelectDisabled'>;

const DataViewImplementation: React.FC<DataViewImpementationProps> = ({
  children, ouiaId = 'DataView', ...props
}: DataViewImpementationProps) => (
  <Stack data-ouia-component-id={`${ouiaId}-stack`} {...props}>
    {React.Children.map(children, (child, index) => (
      <StackItem data-ouia-component-id={`${ouiaId}-stack-item-${index}`}>
        {child}
      </StackItem>
    ))} 
  </Stack>
)

export const DataView: React.FC<DataViewProps> = ({ children, selection, activeState, ...props }: DataViewProps) => (
  <InternalContextProvider selection={selection} activeState={activeState} >
    <DataViewImplementation {...props}>{children}</DataViewImplementation>
  </InternalContextProvider>
);

export default DataView;
