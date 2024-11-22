import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useDataViewFilters, UseDataViewFiltersProps } from './filters';

describe('useDataViewFilters', () => {
  const initialFilters = { search: 'test', tags: [ 'tag1', 'tag2' ] };

  it('should initialize with provided initial filters', () => {
    const { result } = renderHook(() => useDataViewFilters({ initialFilters }));
    expect(result.current.filters).toEqual(initialFilters);
  });

  it('should initialize with empty filters if no initialFilters provided', () => {
    const { result } = renderHook(() => useDataViewFilters({}));
    expect(result.current.filters).toEqual({});
  });

  it('should set filters correctly', () => {
    const { result } = renderHook(() => useDataViewFilters({ initialFilters }));
    const newFilters = { search: 'new search' };
    act(() => result.current.onSetFilters(newFilters));

    expect(result.current.filters).toEqual({ ...initialFilters, ...newFilters });
  });

  it('should delete specific filters without removing keys', () => {
    const { result } = renderHook(() => useDataViewFilters({ initialFilters }));
    const filtersToDelete = { search: 'test' };
    act(() => result.current.onDeleteFilters(filtersToDelete));

    expect(result.current.filters).toEqual({ search: '', tags: [ 'tag1', 'tag2' ] });
  });

  it('should clear all filters', () => {
    const { result } = renderHook(() => useDataViewFilters({ initialFilters }));
    act(() => result.current.clearAllFilters());

    expect(result.current.filters).toEqual({ search: '', tags: [] });
  });

  it('should sync with URL search params if isUrlSyncEnabled', () => {
    const searchParams = new URLSearchParams();
    const setSearchParams = jest.fn();
    const props: UseDataViewFiltersProps<typeof initialFilters> = {
      initialFilters,
      searchParams,
      setSearchParams,
    };

    const { result } = renderHook(() => useDataViewFilters(props));
    act(() => result.current.onSetFilters({ search: 'new search' }));

    expect(setSearchParams).toHaveBeenCalled();
  });

  it('should reset filters to default values when clearAllFilters is called', () => {
    const { result } = renderHook(() => useDataViewFilters({ initialFilters }));
    act(() => result.current.clearAllFilters());

    expect(result.current.filters).toEqual({ search: '', tags: [] });
  });
});
