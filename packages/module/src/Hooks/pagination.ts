import { useState, useEffect } from "react";

export interface UseDataViewPaginationProps {
  /** Initial page */
  page?: number;
  /** Items per page */
  perPage: number;
  /** Current search parameters as a string */
  searchParams?: URLSearchParams;
  /** Function to set search parameters */
  setSearchParams?: (params: URLSearchParams) => void;
}

export interface DataViewPaginationProps extends UseDataViewPaginationProps {
  /** Current page number */
  page: number;
}

export const useDataViewPagination = ({
  page = 1,
  perPage,
  searchParams,
  setSearchParams,
}: UseDataViewPaginationProps) => {
  const [ state, setState ] = useState({
    page: parseInt(searchParams?.get('page') || `${page}`),
    perPage: parseInt(searchParams?.get('perPage') || `${perPage}`),
  });

  const updateSearchParams = (page: number, perPage: number) => {
    if (searchParams && setSearchParams) {
      const params = new URLSearchParams(searchParams);
      params.set('page', `${page}`);
      params.set('perPage', `${perPage}`);
      setSearchParams(params);
    }
  };

  useEffect(() => {
    // make sure search params are loaded or set if not present on mount
    updateSearchParams(state.page, state.perPage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // listen on URL params changes
    const currentPage = parseInt(searchParams?.get('page') || `${state.page}`);
    const currentPerPage = parseInt(searchParams?.get('perPage') || `${state.perPage}`);
    if (currentPage !== state.page || currentPerPage !== state.perPage) {
      setState({ page: currentPage, perPage: currentPerPage });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchParams ]);

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent | undefined,
    newPerPage: number
  ) => {
    updateSearchParams(1, newPerPage);
    setState({ perPage: newPerPage, page: 1 });
  };

  const onSetPage = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent | undefined,
    newPage: number
  ) => {
    updateSearchParams(newPage, state.perPage);
    setState(prev => ({ ...prev, page: newPage }));
  };

  return {
    ...state,
    onPerPageSelect,
    onSetPage,
  };
};
