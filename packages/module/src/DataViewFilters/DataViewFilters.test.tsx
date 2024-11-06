import React from 'react';
import { render } from '@testing-library/react';
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
});
