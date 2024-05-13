import React from 'react';
import { Stack, StackItem } from '@patternfly/react-core';
export interface DataViewProps {
  /** Content rendered inside the data view */
  children: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string;
}

export const DataView: React.FC<DataViewProps> = ({
  children, ouiaId = 'DataView', ...props
}: DataViewProps) => (
  <Stack data-ouia-component-id={`${ouiaId}-stack}`} {...props}>
    {React.Children.map(children, (child, index) => (
      <StackItem data-ouia-component-id={`${ouiaId}-stack-item-${index}`}>
        {child}
      </StackItem>
    ))} 
  </Stack>
)

export default DataView;
