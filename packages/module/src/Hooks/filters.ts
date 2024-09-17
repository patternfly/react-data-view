import { useState, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UseDataViewFiltersProps<T extends Record<string, any>> {
  /** Initial filters object */
  initialFilters?: T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDataViewFilters = <T extends Record<string, any>>(props: UseDataViewFiltersProps<T>) => {
  const { initialFilters } = props;
  const [ filters, setFilters ] = useState<T>(initialFilters ?? {} as T);

  const onSetFilters = useCallback((newFilters: Partial<T>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const onDeleteFilters = useCallback((filtersToDelete: Partial<T>) => {
    setFilters(prev => {
      const newFilters = { ...prev };
  
      Object.entries(filtersToDelete).forEach(([ key, valueToRemove ]) => {
        const currentValue = newFilters[key as keyof T];
  
        if (Array.isArray(currentValue)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          newFilters[key as keyof T] = (currentValue as any[]).filter(
            item => Array.isArray(valueToRemove) ? !valueToRemove.includes(item) : item !== valueToRemove
          ) as T[keyof T];
        } else {
          delete newFilters[key as keyof T];
        }
      });
  
      return newFilters;
    });
  }, []);

  const onClearFilters = useCallback(() => {
    setFilters({} as T);
  }, []);

  return {
    filters,
    onSetFilters,
    onDeleteFilters,
    onClearFilters,
  };
};
