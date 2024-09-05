import React, { ReactNode } from 'react';
import {
  TdProps,
  ThProps,
  TrProps
} from '@patternfly/react-table';
import { DataViewTableTree, DataViewTableTreeProps } from '../DataViewTableTree';
import { DataViewTableBasic, DataViewTableBasicProps } from '../DataViewTableBasic';

// Table header typings
export type DataViewTh = ReactNode | { cell: ReactNode; props?: ThProps };
export const isDataViewThObject = (value: DataViewTh): value is { cell: ReactNode; props?: ThProps } => value != null && typeof value === 'object' && 'cell' in value;

// Basic table typings
export interface DataViewTrObject { row: DataViewTd[], id?: string, props?: TrProps }
export type DataViewTd = ReactNode | { cell: ReactNode; props?: TdProps };
export type DataViewTr = DataViewTd[] | DataViewTrObject;

export const isDataViewTdObject = (value: DataViewTd): value is { cell: ReactNode; props?: TdProps } => value != null && typeof value === 'object' && 'cell' in value;
export const isDataViewTrObject = (value: DataViewTr): value is { row: DataViewTd[], id?: string } => value != null && typeof value === 'object' && 'row' in value;

// Tree table typings
export interface DataViewTrTree extends DataViewTrObject { id: string, children?: DataViewTrTree[] }

export type DataViewTableProps = DataViewTableBasicProps | DataViewTableTreeProps;

export const DataViewTable: React.FC<DataViewTableProps> = ({ isTreeTable, ...props }: DataViewTableProps) => (
  isTreeTable ? (<DataViewTableTree {...(props as DataViewTableTreeProps)} />) : (<DataViewTableBasic {...(props as DataViewTableBasicProps)}/>)
);

export default DataViewTable;
