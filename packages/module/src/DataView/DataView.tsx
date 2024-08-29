import React from 'react';
import { Stack, StackItem } from '@patternfly/react-core';
import { DataViewSelection, InternalContextProvider } from '../InternalContext';

export interface DataViewProps {
  /** Content rendered inside the data view */
  children: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string;
  /** Selection context configuration */
  selection?: DataViewSelection
}

export type DataViewImpementationProps = Omit<DataViewProps, 'onSelect' | 'isItemSelected' | 'isItemSelectDisabled'>;

const DataViewImplementation: React.FC<DataViewImpementationProps> = ({
  children, ouiaId = 'DataView', ...props
}: DataViewImpementationProps) => (
  <Stack data-ouia-component-id={`${ouiaId}-stack}`} {...props}>
    {React.Children.map(children, (child, index) => (
      <StackItem data-ouia-component-id={`${ouiaId}-stack-item-${index}`}>
        {child}
      </StackItem>
    ))} 
  </Stack>
)

export const DataView: React.FC<DataViewProps> = ({ children, selection, ...props }: DataViewProps) => (
  <InternalContextProvider selection={selection}>
    <DataViewImplementation {...props}>{children}</DataViewImplementation>
  </InternalContextProvider>
);

export default DataView;
