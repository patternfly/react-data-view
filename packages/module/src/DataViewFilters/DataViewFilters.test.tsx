import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataViewFilters from './DataViewFilters';
import DataViewToolbar from '../DataViewToolbar';
import DataViewTextFilter from '../DataViewTextFilter';

describe('DataViewFilters component', () => {
  const mockOnChange = jest.fn();

  it('should render correctly', () => {
    const { container } = render(
      <DataViewToolbar
        filters={
          <DataViewFilters onChange={mockOnChange} values={{}}>
            <DataViewTextFilter filterId="one" title="One" />
            <DataViewTextFilter filterId="two" title="Two" />
          </DataViewFilters>
        }
      />
    );
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
    input.focus();
    fireEvent.input(input, { target: { value: 'abc' } });
    expect(mockOnChange).toHaveBeenCalledWith('one', { one: 'abc' });
  });

  it('renders an accessible name on the filter category toggle (#680)', () => {
    const { container } = render(
      <DataViewToolbar
        filters={
          <DataViewFilters onChange={mockOnChange} values={{}}>
            <DataViewTextFilter filterId="name" title="Name" />
            <DataViewTextFilter filterId="label" title="Label" />
          </DataViewFilters>
        }
      />
    );
    const categoryToggle = container.querySelector('.pf-v6-c-menu-toggle');
    expect(categoryToggle).toHaveAccessibleName('Filter by');
  });
});
