import { ISortBy } from "@patternfly/react-table";
import { useState, useEffect, useMemo } from "react";

export enum DataViewSortParams {
  SORT_BY = 'sortBy',
  DIRECTION = 'direction'
};

const validateDirection = (direction: string | null | undefined, defaultDirection: ISortBy['direction']): ISortBy['direction'] => (
  direction === 'asc' || direction === 'desc' ? direction : defaultDirection
);

export interface DataViewSortConfig {
  /** Attribute to sort the entries by */
  sortBy: string | undefined;
  /** Sort direction */
  direction: ISortBy['direction'];
};

export interface UseDataViewSortProps {
  /** Initial sort config */
  initialSort?: DataViewSortConfig;
  /** Current search parameters as a string */
  searchParams?: URLSearchParams;
  /** Function to set search parameters */
  setSearchParams?: (params: URLSearchParams) => void;
  /** Default direction */
  defaultDirection?: ISortBy['direction'];
  /** Sort by URL param name */
  sortByParam?: string;
  /** Direction URL param name */
  directionParam?: string;
};

export const useDataViewSort = (props?: UseDataViewSortProps) => {
  const {
    initialSort,
    searchParams,
    setSearchParams,
    defaultDirection = 'asc',
    sortByParam = DataViewSortParams.SORT_BY,
    directionParam = DataViewSortParams.DIRECTION
  } = props ?? {};

  const isUrlSyncEnabled = useMemo(() => searchParams && !!setSearchParams, [ searchParams, setSearchParams ]);

  const [ state, setState ] = useState<DataViewSortConfig>({
    sortBy: searchParams?.get(sortByParam) ?? initialSort?.sortBy,
    direction: validateDirection(searchParams?.get(directionParam) as ISortBy['direction'], initialSort?.direction),
  });

  const updateSearchParams = (sortBy: string, direction: ISortBy['direction']) => {
    if (isUrlSyncEnabled && sortBy) {
      const params = new URLSearchParams(searchParams);
      params.set(sortByParam, `${sortBy}`);
      params.set(directionParam, `${direction}`);
      setSearchParams?.(params);
    }
  };

  useEffect(() => {
    state.sortBy && state.direction && updateSearchParams(state.sortBy, state.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentSortBy = searchParams?.get(sortByParam) || state.sortBy;
    const currentDirection = searchParams?.get(directionParam) as ISortBy['direction'] || state.direction;
    const validDirection = validateDirection(currentDirection, defaultDirection);
    currentSortBy !== state.sortBy || validDirection !== state.direction && setState({ sortBy: currentSortBy, direction: validDirection });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ searchParams?.toString() ]);

  const onSort = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent | undefined,
    newSortBy: string,
    newSortDirection: ISortBy['direction']
  ) => {
    setState({ sortBy: newSortBy, direction: newSortDirection });
    updateSearchParams(newSortBy, newSortDirection);
  };

  return {
    ...state,
    onSort
  };
};
