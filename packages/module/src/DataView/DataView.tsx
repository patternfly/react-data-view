import React from 'react';
import { Text } from '@patternfly/react-core';

export interface DataViewProps {
  /** Example prop */
  text?: string;
}

export const DataView: React.FunctionComponent<DataViewProps> = ({
  text = 'This is Data view'
}: DataViewProps) => (
  <Text>{text}</Text>
);

export default DataView;
