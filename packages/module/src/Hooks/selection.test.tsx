import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useDataViewSelection } from './selection';

describe('useDataViewSelection', () => {
  it('should get initial state correctly - no initialSelected', () => {
    const { result } = renderHook(() => useDataViewSelection())
    expect(result.current).toEqual({ 
      selected: [],
      onSelect: expect.any(Function),
      isSelected: expect.any(Function),
    })
  });

  it('should get initial state correctly - with initialSelected', () => {
    const initialSelected = [ { id: 1, name: 'test1' } ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected }))
    expect(result.current).toEqual({ 
      selected: initialSelected,
      onSelect: expect.any(Function),
      isSelected: expect.any(Function),
    })
  });

  it('should select items correctly - objects', async () => {
    const initialSelected = [ { id: 1, name: 'test1' } ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected }))
    
    await act(async () => {
      result.current.onSelect(true, { id: 2, name: 'test2' });
    });
    expect(result.current.selected).toEqual([ ...initialSelected, { id: 2, name: 'test2' } ]);
  });

  it('should deselect items correctly - strings', async () => {
    const initialSelected = [ 'test1', 'test2' ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected }))
    
    await act(async () => {
      result.current.onSelect(false, 'test2');
    });
    expect(result.current.selected).toEqual([ 'test1' ])
  });

  it('should check if item is selected correctly - objects', () => {
    const initialSelected = [ { id: 1, name: 'test1' }, { id: 2, name: 'test2' } ];
    const { result } = renderHook(() => useDataViewSelection({ initialSelected, matchOption: (a,b) => a.id === b.id }))
    
    expect(result.current.isSelected({ id: 1, name: 'test1' })).toBe(true);
    expect(result.current.isSelected({ id: 3, name: 'test2' })).toBe(false);
  });
});