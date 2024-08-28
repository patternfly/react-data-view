import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { InternalContextProvider, useInternalContext, DataViewSelection } from './InternalContext';

describe('InternalContext', () => {
  const mockSelection: DataViewSelection = {
    onSelect: jest.fn(),
    isSelected: jest.fn(),
    isSelectDisabled: jest.fn(),
  };

  test('should provide context value and allow consuming it', () => {
    const TestComponent = () => {
      const { selection } = useInternalContext();
      
      return (
        <div>
          <button onClick={() => selection?.onSelect(true, [ 'item1' ])}>Select item</button>
          <span>{selection?.isSelected('item1') ? 'Selected' : 'Not selected'}</span>
        </div>
      );
    };

    const { getByText } = render(
      <InternalContextProvider selection={mockSelection}>
        <TestComponent />
      </InternalContextProvider>
    );

    fireEvent.click(getByText('Select item'));
    expect(mockSelection.onSelect).toHaveBeenCalledWith(true, [ 'item1' ]);
  });

  test('should handle selection state correctly', () => {
    const mockSelectionState = {
      ...mockSelection,
      isSelected: jest.fn((item) => item === 'item1'),
    };

    const TestComponent = () => {
      const { selection } = useInternalContext();

      return (
        <div>
          <span>{selection?.isSelected('item1') ? 'Item 1 is selected' : 'Item 1 is not selected'}</span>
          <span>{selection?.isSelected('item2') ? 'Item 2 is selected' : 'Item 2 is not selected'}</span>
        </div>
      );
    };

    const { getByText } = render(
      <InternalContextProvider selection={mockSelectionState}>
        <TestComponent />
      </InternalContextProvider>
    );

    expect(getByText('Item 1 is selected')).toBeInTheDocument();
    expect(getByText('Item 2 is not selected')).toBeInTheDocument();
  });

  test('should handle selection disabled correctly', () => {
    const mockSelectionWithDisabled = {
      ...mockSelection,
      isSelectDisabled: jest.fn((item) => item === 'item3'),
    };

    const TestComponent = () => {
      const { selection } = useInternalContext();

      return (
        <div>
          <span>{selection?.isSelectDisabled?.('item3') ? 'Item 3 is disabled' : 'Item 3 is enabled'}</span>
          <span>{selection?.isSelectDisabled?.('item1') ? 'Item 1 is disabled' : 'Item 1 is enabled'}</span>
        </div>
      );
    };

    const { getByText } = render(
      <InternalContextProvider selection={mockSelectionWithDisabled}>
        <TestComponent />
      </InternalContextProvider>
    );

    expect(getByText('Item 3 is disabled')).toBeInTheDocument();
    expect(getByText('Item 1 is enabled')).toBeInTheDocument();
  });
});
