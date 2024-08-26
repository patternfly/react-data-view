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
    page: searchParams?.get('page') !== null
      ? parseInt(searchParams?.get('page') || `${page}`)
      : page,
    perPage: searchParams?.get('perPage') !== null
      ? parseInt(searchParams?.get('perPage') || `${perPage}`)
      : perPage,
  });

  useEffect(() => {
    if (searchParams && setSearchParams) {
      const params = new URLSearchParams(searchParams);
      let updated = false;

      if (!params.has('page')) {
        params.set('page', `${page}`);
        updated = true;
      }

      if (!params.has('perPage')) {
        params.set('perPage', `${perPage}`);
        updated = true;
      }

      updated && setSearchParams(params);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent | undefined,
    newPerPage: number
  ) => {
    if (searchParams && setSearchParams) {
      const params = new URLSearchParams(searchParams);
      params.set('perPage', newPerPage.toString());
      params.set('page', '1');
      setSearchParams(params);
    }
    setState({ perPage: newPerPage, page: 1 });
  };

  const onSetPage = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent | undefined,
    newPage: number
  ) => {
    if (searchParams && setSearchParams) {
      const params = new URLSearchParams(searchParams);
      params.set('page', newPage.toString());
      setSearchParams(params);
    }
    setState(prev => ({ ...prev, page: newPage }));
  };

  return {
    ...state,
    onPerPageSelect,
    onSetPage
  };
};
