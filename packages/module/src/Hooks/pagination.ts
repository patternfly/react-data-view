import { useState } from "react";

export interface UseDataViewPaginationProps {
  /** Initial page */
  page?: number;
  /** Items per page */
  perPage: number;
}

export interface DataViewPaginationProps extends UseDataViewPaginationProps {
  /** Current page number */
    page: number;
}

export const useDataViewPagination = ({ page = 1, perPage }: UseDataViewPaginationProps) => { 
  const [ state, setState ] = useState({ page, perPage });
  
  const onPerPageSelect = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent | undefined, newPerPage: number) => {
    setState(prev => ({ ...prev, perPage: newPerPage }));
  }
  
  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent | undefined, newPage: number) => {
    setState(prev => ({ ...prev, page: newPage }));
  }
  
  return {
    ...state,
    onPerPageSelect,
    onSetPage
  }
}
