import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useDataViewSelection } from './selection';

describe('useDataViewSelection', () => {
  it('should get initial state correctly - no initialSelected', () => {
    const { result } = renderHook(() => useDataViewSelection({ matchOption: (a, b) => a.id === b.id }))
    expect(result.current).toEqual({ 
      selected: [],
      onSelect: expect.any(Function),
      isSelected: expect.any(Function),
      setSelected: expect.any(Function),
    })
  });

  it('should get initial state correctly - with initialSelected', () => {
    const initialSelected = [ { id: 1, name: 'test1' } ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected, matchOption: (a, b) => a.id === b.id }))
    expect(result.current).toEqual({ 
      selected: initialSelected,
      onSelect: expect.any(Function),
      isSelected: expect.any(Function),
      setSelected: expect.any(Function),
    })
  });

  it('should select items correctly - objects', async () => {
    const initialSelected = [ { id: 1, name: 'test1' } ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected, matchOption: (a, b) => a.id === b.id }))
    
    await act(async () => {
      result.current.onSelect(true, { id: 2, name: 'test2' });
    });
    expect(result.current.selected).toEqual([ ...initialSelected, { id: 2, name: 'test2' } ]);
  });

  it('should deselect items correctly - strings', async () => {
    const initialSelected = [ 'test1', 'test2' ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected, matchOption: (a, b) => a === b }))
    
    await act(async () => {
      result.current.onSelect(false, 'test2');
    });
    expect(result.current.selected).toEqual([ 'test1' ])
  });

  it('should check if item is selected correctly - objects', () => {
    const initialSelected = [ { id: 1, name: 'test1' }, { id: 2, name: 'test2' } ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected, matchOption: (a, b) => a.id === b.id }))
    
    expect(result.current.isSelected({ id: 1, name: 'test1' })).toBe(true);
    expect(result.current.isSelected({ id: 3, name: 'test2' })).toBe(false);
  });

  it('should have setSelected function in return object', () => {
    const { result } = renderHook(() => useDataViewSelection({ matchOption: (a, b) => a.id === b.id }))
    expect(result.current).toEqual({ 
      selected: [],
      onSelect: expect.any(Function),
      isSelected: expect.any(Function),
      setSelected: expect.any(Function),
    })
  });

  it('should set selected items directly using setSelected - objects', async () => {
    const initialSelected = [ { id: 1, name: 'test1' } ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected, matchOption: (a, b) => a.id === b.id }))
    
    const newSelected = [ { id: 2, name: 'test2' }, { id: 3, name: 'test3' } ];
    
    await act(async () => {
      result.current.setSelected(newSelected);
    });
    
    expect(result.current.selected).toEqual(newSelected);
  });

  it('should set selected items directly using setSelected - strings', async () => {
    const initialSelected = [ 'test1', 'test2' ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected, matchOption: (a, b) => a === b }))
    
    const newSelected = [ 'test3', 'test4', 'test5' ];
    
    await act(async () => {
      result.current.setSelected(newSelected);
    });
    
    expect(result.current.selected).toEqual(newSelected);
  });

  it('should clear all selections using setSelected with empty array', async () => {
    const initialSelected = [ { id: 1, name: 'test1' }, { id: 2, name: 'test2' } ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected, matchOption: (a, b) => a.id === b.id }))
    
    await act(async () => {
      result.current.setSelected([]);
    });
    
    expect(result.current.selected).toEqual([]);
  });

  it('should update isSelected correctly after using setSelected', async () => {
    const initialSelected = [ { id: 1, name: 'test1' } ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected, matchOption: (a, b) => a.id === b.id }))
    
    const newSelected = [ { id: 2, name: 'test2' }, { id: 3, name: 'test3' } ];
    
    await act(async () => {
      result.current.setSelected(newSelected);
    });
    
    expect(result.current.isSelected({ id: 1, name: 'test1' })).toBe(false);
    expect(result.current.isSelected({ id: 2, name: 'test2' })).toBe(true);
    expect(result.current.isSelected({ id: 3, name: 'test3' })).toBe(true);
  });
});
