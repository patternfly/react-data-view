import { useState, useCallback, useEffect, useMemo } from "react";

export interface UseDataViewFiltersProps<T extends object> {
  /** Initial filters object */
  initialFilters?: T;
  /** Current search parameters as a string */
  searchParams?: URLSearchParams;
  /** Function to set search parameters */
  setSearchParams?: (params: URLSearchParams) => void;
};

export const useDataViewFilters = <T extends object>({
  initialFilters = {} as T,
  searchParams,
  setSearchParams,
}: UseDataViewFiltersProps<T>) => {
  const isUrlSyncEnabled = useMemo(() => searchParams && !!setSearchParams, [ searchParams, setSearchParams ]);

  const getInitialFilters = useCallback((): T => isUrlSyncEnabled
    ? Object.keys(initialFilters).reduce((loadedFilters, key) => {
      const isArrayFilter = Array.isArray(initialFilters[key]);
      const urlValue = isArrayFilter ? searchParams?.getAll(key) : searchParams?.get(key);

      // eslint-disable-next-line no-nested-ternary
      loadedFilters[key] = urlValue
        ? (isArrayFilter && !Array.isArray(urlValue) ? [ urlValue ] : urlValue)
        : initialFilters[key];

      return loadedFilters;
    }, { ...initialFilters })
    : initialFilters, [ isUrlSyncEnabled, initialFilters, searchParams ]);
  const [ filters, setFilters ] = useState<T>(getInitialFilters());

  const updateSearchParams = useCallback(
    (newFilters: T) => {
      if (isUrlSyncEnabled) {
        const params = new URLSearchParams(searchParams);
        Object.entries(newFilters).forEach(([ key, value ]) => {
          params.delete(key);
          (Array.isArray(value) ? value : [ value ]).forEach((val) => value && params.append(key, val));
        });
        setSearchParams?.(params);
      }
    },
    [ isUrlSyncEnabled, searchParams, setSearchParams ]
  );

  useEffect(() => {
    isUrlSyncEnabled && setFilters(getInitialFilters())
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const onSetFilters = useCallback(
    (newFilters: Partial<T>) => {
      setFilters(prevFilters => {
        const updatedFilters = { ...prevFilters, ...newFilters };
        isUrlSyncEnabled && updateSearchParams(updatedFilters);
        return updatedFilters;
      });
    },
    [ isUrlSyncEnabled, updateSearchParams ]
  );

  // helper function to reset filters
  const resetFilterValues = useCallback((filters: Partial<T>): Partial<T> => Object.entries(filters).reduce((acc, [ key, value ]) => {
    if (Array.isArray(value)) {
      acc[key as keyof T] = [] as T[keyof T];
    } else {
      acc[key as keyof T] = '' as T[keyof T];
    }
    return acc;
  }, {} as Partial<T>), []);
  
  const onDeleteFilters = useCallback(
    (filtersToDelete: Partial<T>) => {
      setFilters(prevFilters => {
        const updatedFilters = { ...prevFilters,...resetFilterValues(filtersToDelete) };
        isUrlSyncEnabled && updateSearchParams(updatedFilters);
        return updatedFilters;
      });
    },
    [ isUrlSyncEnabled, updateSearchParams, resetFilterValues ]
  );

  const clearAllFilters = useCallback(() => {
    const clearedFilters = resetFilterValues(filters) as T;
  
    setFilters(clearedFilters);
    isUrlSyncEnabled && updateSearchParams(clearedFilters);
  }, [ filters, isUrlSyncEnabled, updateSearchParams, resetFilterValues ]);

  return {
    filters,
    onSetFilters,
    onDeleteFilters,
    clearAllFilters,
  };
};
