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

  it('should read pagination state from URL', () => {
    const mockSearchParams = new URLSearchParams('page=2&perPage=10');
    const { result } = renderHook(() =>
      useDataViewPagination({
        searchParams: mockSearchParams,
        setSearchParams: jest.fn(),
        page: 1,
        perPage: 5,
      })
    );

    expect(result.current).toEqual({
      onPerPageSelect: expect.any(Function),
      onSetPage: expect.any(Function),
      page: 2,
      perPage: 10,
    });
  });

  it('should set pagination state in URL when page changes', () => {
    const mockSetSearchParams = jest.fn();
    const { result } = renderHook(() =>
      useDataViewPagination({
        searchParams: new URLSearchParams(),
        setSearchParams: mockSetSearchParams,
        page: 1,
        perPage: 5,
      })
    );

    expect(mockSetSearchParams).toHaveBeenNthCalledWith(
      1, 
      new URLSearchParams('page=1&perPage=5')
    );

    act(() => {
      result.current.onSetPage(undefined, 4);
    });

    expect(mockSetSearchParams).toHaveBeenNthCalledWith(
      2,
      new URLSearchParams('page=4')
    );
  });

  it('should set pagination state in URL when perPage changes', () => {
    const mockSetSearchParams = jest.fn();
    const { result } = renderHook(() =>
      useDataViewPagination({
        searchParams: new URLSearchParams('page=2'),
        setSearchParams: mockSetSearchParams,
        page: 1,
        perPage: 5,
      })
    );

    act(() => {
      result.current.onPerPageSelect(undefined, 20);
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams('page=1&perPage=20')
    );
  });

  it('should initialize URL with default values if not present', () => {
    const mockSetSearchParams = jest.fn();
    renderHook(() =>
      useDataViewPagination({
        searchParams: new URLSearchParams(),
        setSearchParams: mockSetSearchParams,
        page: 1,
        perPage: 5,
      })
    );

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams('page=1&perPage=5')
    );
  });
});
