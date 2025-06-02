import { FC, Children } from 'react';
import { Stack, StackItem, StackProps } from '@patternfly/react-core';
import { DataViewSelection, InternalContextProvider } from '../InternalContext';

export const DataViewState = {
  empty: 'empty',
  loading: 'loading',
  error: 'error'
} as const;

export type DataViewState = typeof DataViewState[keyof typeof DataViewState];

/** extends StackProps */
export interface DataViewProps extends StackProps {
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

const DataViewImplementation: FC<DataViewImpementationProps> = ({
  children, ouiaId = 'DataView', ...props
}: DataViewImpementationProps) => (
  <Stack data-ouia-component-id={`${ouiaId}-stack`} {...props}>
    {Children.map(children, (child, index) => (
      <StackItem data-ouia-component-id={`${ouiaId}-stack-item-${index}`}>
        {child}
      </StackItem>
    ))} 
  </Stack>
)

export const DataView: FC<DataViewProps> = ({ children, selection, activeState, ...props }: DataViewProps) => (
  <InternalContextProvider selection={selection} activeState={activeState} >
    <DataViewImplementation {...props}>{children}</DataViewImplementation>
  </InternalContextProvider>
);

export default DataView;
