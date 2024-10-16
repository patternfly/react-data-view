import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useDataViewPagination } from './pagination';

describe('useDataViewPagination', () => {

  it('should get initial state correctly - no page', () => {
    const { result } = renderHook(() => useDataViewPagination({ perPage: 7 }))
    expect(result.current).toEqual({ 
      onPerPageSelect: expect.any(Function),
      onSetPage: expect.any(Function),
      page: 1,
      perPage: 7
    })
  });

  it('should get initial state correctly - page set', () => {
    const { result } = renderHook(() => useDataViewPagination({ page: 3, perPage: 5 }))
    expect(result.current).toEqual({ 
      onPerPageSelect: expect.any(Function),
      onSetPage: expect.any(Function),
      page: 3,
      perPage: 5
    })
  });

  it('should set page correctly', () => {
    const { result } = renderHook(() => useDataViewPagination({ page: 3, perPage: 5 }))
    
    act(() => {
      result.current.onSetPage(undefined, 8);
    });
    
    expect(result.current).toEqual({ 
      onPerPageSelect: expect.any(Function),
      onSetPage: expect.any(Function),
      page: 8,
      perPage: 5
    })
  });

  it('should set perPage correctly', () => {
    const { result } = renderHook(() => useDataViewPagination({ page: 3, perPage: 5 }))
    
    act(() => {
      result.current.onPerPageSelect(undefined, 50);
    });
    
    expect(result.current).toEqual({ 
      onPerPageSelect: expect.any(Function),
      onSetPage: expect.any(Function),
      page: 1,
      perPage: 50
    })
  });

});
