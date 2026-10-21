import { render, fireEvent } from '@testing-library/react';
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

  it('should use defaultActiveFilter as initial active filter', () => {
    const { container } = render(
      <DataViewToolbar
        filters={
          <DataViewFilters onChange={mockOnChange} values={{ one: '', two: '' }} defaultActiveFilter="two">
            <DataViewTextFilter filterId="one" title="One" />
            <DataViewTextFilter filterId="two" title="Two" />
          </DataViewFilters>
        }
      />
    );

    const toggle = container.querySelector('[data-ouia-component-id="DataViewFilters"] .pf-v6-c-menu-toggle') as HTMLButtonElement;
    expect(toggle.textContent).toContain('Two');
  });

  it('should reset active filter to defaultActiveFilter when all values are cleared', () => {
    const { container, rerender } = render(
      <DataViewToolbar
        filters={
          <DataViewFilters onChange={mockOnChange} values={{ one: 'test', two: '' }} defaultActiveFilter="two">
            <DataViewTextFilter filterId="one" title="One" />
            <DataViewTextFilter filterId="two" title="Two" />
          </DataViewFilters>
        }
      />
    );

    const toggle = container.querySelector('[data-ouia-component-id="DataViewFilters"] .pf-v6-c-menu-toggle') as HTMLButtonElement;
    expect(toggle.textContent).toContain('Two');

    rerender(
      <DataViewToolbar
        filters={
          <DataViewFilters onChange={mockOnChange} values={{ one: '', two: '' }} defaultActiveFilter="two">
            <DataViewTextFilter filterId="one" title="One" />
            <DataViewTextFilter filterId="two" title="Two" />
          </DataViewFilters>
        }
      />
    );

    expect(toggle.textContent).toContain('Two');
  });

  it('should reset active filter to first item when all values are cleared without defaultActiveFilter', () => {
    const { container, rerender } = render(
      <DataViewToolbar
        filters={
          <DataViewFilters onChange={mockOnChange} values={{ one: 'test', two: '' }}>
            <DataViewTextFilter filterId="one" title="One" />
            <DataViewTextFilter filterId="two" title="Two" />
          </DataViewFilters>
        }
      />
    );

    const toggle = container.querySelector('[data-ouia-component-id="DataViewFilters"] .pf-v6-c-menu-toggle') as HTMLButtonElement;
    expect(toggle.textContent).toContain('One');

    rerender(
      <DataViewToolbar
        filters={
          <DataViewFilters onChange={mockOnChange} values={{ one: '', two: '' }}>
            <DataViewTextFilter filterId="one" title="One" />
            <DataViewTextFilter filterId="two" title="Two" />
          </DataViewFilters>
        }
      />
    );

    expect(toggle.textContent).toContain('One');
  });
});
