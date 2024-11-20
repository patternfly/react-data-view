import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useDataViewSort, UseDataViewSortProps, DataViewSortConfig, DataViewSortParams } from './sort';

describe('useDataViewSort', () => {
  const initialSort: DataViewSortConfig = { sortBy: 'name', direction: 'asc' };

  it('should initialize with provided initial sort config', () => {
    const { result } = renderHook(() => useDataViewSort({ initialSort }));
    expect(result.current).toEqual(expect.objectContaining(initialSort));
  });

  it('should initialize with empty sort config if no initialSort is provided', () => {
    const { result } = renderHook(() => useDataViewSort());
    expect(result.current).toEqual(expect.objectContaining({ sortBy: undefined, direction: 'asc' }));
  });

  it('should update sort state when onSort is called', () => {
    const { result } = renderHook(() => useDataViewSort({ initialSort }));
    act(() => {
      result.current.onSort(undefined, 'age', 'desc');
    });
    expect(result.current).toEqual(expect.objectContaining({ sortBy: 'age', direction: 'desc' }));
  });

  it('should sync with URL search params if isUrlSyncEnabled', () => {
    const searchParams = new URLSearchParams();
    const setSearchParams = jest.fn();
    const props: UseDataViewSortProps = {
      initialSort,
      searchParams,
      setSearchParams,
    };

    const { result } = renderHook(() => useDataViewSort(props));

    expect(setSearchParams).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual(expect.objectContaining(initialSort));
  });

  it('should validate direction and fallback to default direction if invalid direction is provided', () => {
    const searchParams = new URLSearchParams();
    searchParams.set(DataViewSortParams.SORT_BY, 'name');
    searchParams.set(DataViewSortParams.DIRECTION, 'invalid-direction');
    const { result } = renderHook(() => useDataViewSort({ searchParams, defaultDirection: 'desc' }));

    expect(result.current).toEqual(expect.objectContaining({ sortBy: 'name', direction: 'desc' }));
  });

  it('should update search params when URL sync is enabled and sort changes', () => {
    const searchParams = new URLSearchParams();
    const setSearchParams = jest.fn();
    const props: UseDataViewSortProps = {
      initialSort,
      searchParams,
      setSearchParams,
    };

    const { result } = renderHook(() => useDataViewSort(props));
    act(() => {
      expect(setSearchParams).toHaveBeenCalledTimes(1);
      result.current.onSort(undefined, 'priority', 'desc');
    });

    expect(setSearchParams).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual(expect.objectContaining({ sortBy: 'priority', direction: 'desc' }));
  });

  it('should prioritize searchParams values', () => {
    const searchParams = new URLSearchParams();
    searchParams.set(DataViewSortParams.SORT_BY, 'category');
    searchParams.set(DataViewSortParams.DIRECTION, 'desc');

    const { result } = renderHook(
      (props: UseDataViewSortProps) => useDataViewSort(props),
      { initialProps: { initialSort, searchParams } }
    );

    expect(result.current).toEqual(expect.objectContaining({
      sortBy: 'category',
      direction: 'desc',
    }));
  });
});
