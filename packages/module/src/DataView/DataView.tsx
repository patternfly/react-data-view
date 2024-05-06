import React from 'react';
import { Stack, StackItem } from '@patternfly/react-core';
import { DataViewPaginationProps } from '../Hooks';

export interface DataViewProps extends DataViewPaginationProps {
  /** Content rendered inside the data view */
  children?: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string;
}

export const DataView: React.FC<DataViewProps> = ({
  children, ouiaId = 'DataView'
}: DataViewProps) => (
  <Stack data-ouia-component-id={`${ouiaId}-stack}`}>
    {React.Children.map(children, (child, index) => (
      React.isValidElement(child) ? (
        <StackItem data-ouia-component-id={`${ouiaId}-stack-item-${index}`}>
          {child}
        </StackItem>
      ) : null
    ))} 
  </Stack>
)

export default DataView;
