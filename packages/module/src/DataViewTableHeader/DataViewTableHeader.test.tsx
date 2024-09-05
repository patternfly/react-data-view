import React from 'react';
import { render } from '@testing-library/react';
import { Table } from '@patternfly/react-table';
import { DataViewTableHeader } from './DataViewTableHeader';
import { DataViewSelection } from '../InternalContext';
import { DataView } from '../DataView';

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

const ouiaId = 'HeaderExample';

describe('DataViewTableHeader component', () => {
  const mockSelection: DataViewSelection = {
    onSelect: jest.fn(),
    isSelected: jest.fn(),
    isSelectDisabled: jest.fn(),
  };

  test('should render correctly', () => {
    const { container } = render(
      <Table>
        <DataViewTableHeader columns={columns} ouiaId={ouiaId} />
      </Table>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render the tree table correctly when isTreeTable is true', () => {
    const { container } = render(
      <DataView selection={mockSelection}>
        <Table>
          <DataViewTableHeader isTreeTable columns={columns} ouiaId={ouiaId} />
        </Table>
      </DataView>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render selection column when selection is provided', () => {
    const { container } = render(
      <DataView selection={mockSelection}>
        <Table>
          <DataViewTableHeader columns={columns} ouiaId={ouiaId} />
        </Table>
      </DataView>
    );
    expect(container).toMatchSnapshot();
  });
});



