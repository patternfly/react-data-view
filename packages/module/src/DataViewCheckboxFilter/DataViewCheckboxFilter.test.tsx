import { render, screen } from '@testing-library/react';
import DataViewCheckboxFilter, { DataViewCheckboxFilterProps } from './DataViewCheckboxFilter';
import DataViewToolbar from '../DataViewToolbar';
import '@testing-library/jest-dom';

describe('DataViewCheckboxFilter component', () => {
  const defaultProps: DataViewCheckboxFilterProps = {
    filterId: 'test-checkbox-filter',
    title: 'Test Checkbox Filter',
    value: ['workspace-one'],
    options: [
      { label: 'Workspace one', value: 'workspace-one' },
      { label: 'Workspace two', value: 'workspace-two' },
      { label: 'Workspace three', value: 'workspace-three' }
    ]
  };

  it('should render correctly', () => {
    const { container } = render(<DataViewToolbar filters={<DataViewCheckboxFilter {...defaultProps} />} />);
    expect(container).toMatchSnapshot();
  });

  it('should use chipTitle for the filter chip category when provided', () => {
    render(
      <DataViewToolbar
        filters={<DataViewCheckboxFilter {...defaultProps} chipTitle="Short name" />}
      />
    );
    expect(screen.getByText('Short name')).toBeInTheDocument();
    expect(screen.getByText('Test Checkbox Filter')).toBeInTheDocument();
  });
});
