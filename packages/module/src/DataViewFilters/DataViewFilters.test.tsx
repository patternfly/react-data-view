import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DataViewFilters from './DataViewFilters';
import DataViewToolbar from '../DataViewToolbar';
import DataViewTextFilter from '../DataViewTextFilter';

describe('DataViewFilters component', () => {
  const mockOnChange = jest.fn();

  it('should render correctly', () => {
    const { container } = render(<DataViewToolbar
      filters={
        <DataViewFilters onChange={mockOnChange} values={{}}>
          <DataViewTextFilter filterId="one" title="One" />
          <DataViewTextFilter filterId="two" title="Two" />
        </DataViewFilters>
      }
    />);
    expect(container).toMatchSnapshot();
  });

  it('should call onChange with correct key and value when filter changes', () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(
      <DataViewToolbar
        filters={
          <DataViewFilters onChange={mockOnChange} values={{}}>
            <DataViewTextFilter filterId="one" title="One" />
            <DataViewTextFilter filterId="two" title="Two" />
          </DataViewFilters>
        }
      />
    );
    const input = getByLabelText('One filter');
    // Simulate user typing 'abc' in the input
    input.focus();
    // fireEvent.change triggers the onChange handler of the input
    // The SearchInput component expects the value as the second argument
    // so we use fireEvent.change with { target: { value: 'abc' } }
    // but since SearchInput is a custom component, we use fireEvent.input
    // to trigger the native input event
    fireEvent.input(input, { target: { value: 'abc' } });
    expect(mockOnChange).toHaveBeenCalledWith('one', { one: 'abc' });
  });
});
