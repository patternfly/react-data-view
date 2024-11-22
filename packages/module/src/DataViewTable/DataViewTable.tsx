import React, { ReactNode } from 'react';
import {
  TdProps,
  ThProps,
  TrProps
} from '@patternfly/react-table';
import { DataViewTableTree, DataViewTableTreeProps } from '../DataViewTableTree';
import { DataViewTableBasic, DataViewTableBasicProps } from '../DataViewTableBasic';

// Table head typings
export type DataViewTh = ReactNode | {
  /** Table head cell node */
  cell: ReactNode;
  /** Props passed to Th */
  props?: ThProps
};
export const isDataViewThObject = (value: DataViewTh): value is { cell: ReactNode; props?: ThProps } => value != null && typeof value === 'object' && 'cell' in value;

// Basic table typings
export interface DataViewTrObject {
  /** Array of rows */
  row: DataViewTd[],
  /** Unique identifier of a row */
  id?: string,
  /** Props passed to Tr */
  props?: TrProps
}

export type DataViewTd = ReactNode | {
  /** Table body cell node */
  cell: ReactNode;
  /** Props passed to Td */
  props?: TdProps
};

export type DataViewTr = DataViewTd[] | DataViewTrObject;

export const isDataViewTdObject = (value: DataViewTd): value is { cell: ReactNode; props?: TdProps } => value != null && typeof value === 'object' && 'cell' in value;
export const isDataViewTrObject = (value: DataViewTr): value is { row: DataViewTd[], id?: string } => value != null && typeof value === 'object' && 'row' in value;

// Tree table typings
/** extends DataViewTrObject */
export interface DataViewTrTree extends DataViewTrObject { id: string, children?: DataViewTrTree[] }

export type DataViewTableProps =
  | ({
      isTreeTable: true;
    } & DataViewTableTreeProps)
  | ({
      isTreeTable?: false;
    } & DataViewTableBasicProps);

export const DataViewTable: React.FC<DataViewTableProps> = (props) => (
  props.isTreeTable ? <DataViewTableTree {...props} /> : <DataViewTableBasic {...props} />
);

export default DataViewTable;
