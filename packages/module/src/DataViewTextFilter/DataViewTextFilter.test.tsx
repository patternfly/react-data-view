import { render } from '@testing-library/react';
import DataViewTextFilter, { DataViewTextFilterProps } from './DataViewTextFilter';
import DataViewToolbar from '../DataViewToolbar';

describe('DataViewTextFilter component', () => {
  const mockOnChange = jest.fn();

  const defaultProps: DataViewTextFilterProps = {
    filterId: 'test-filter',
    title: 'Test Filter',
    value: 'initial value',
    onChange: mockOnChange,
  };

  it('should render correctly', () => {
    const { container } = render(<DataViewToolbar
      filters={ 
        <DataViewTextFilter {...defaultProps} />
      }
    />);
    expect(container).toMatchSnapshot();
  });
});
