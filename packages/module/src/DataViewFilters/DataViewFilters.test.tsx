import { render, fireEvent } from '@testing-library/react';
import DataViewFilters from './DataViewFilters';
import DataViewToolbar from '../DataViewToolbar';
import DataViewTextFilter from '../DataViewTextFilter';
import { DataViewCheckboxFilter } from '../DataViewCheckboxFilter';

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

  it('should not crash when a checkbox filter option label is a React element', () => {
    // Regression test for #12536: using a React element (e.g. an icon) as a
    // DataViewCheckboxFilter option label made childrenHash's JSON.stringify throw on the
    // element's circular references. The tree is created inside a wrapper component so the
    // label element has an owner (as in real usage), which is what triggers the cycle.
    const FilterWithElementLabel = () => (
      <DataViewToolbar
        filters={
          <DataViewFilters onChange={mockOnChange} values={{}}>
            <DataViewCheckboxFilter
              filterId="status"
              title="Status"
              options={[ { label: <span>Active</span>, value: 'active' } ]}
            />
          </DataViewFilters>
        }
      />
    );
    expect(() => render(<FilterWithElementLabel />)).not.toThrow();
  });
});
