import { render, screen } from '@testing-library/react';
import { Table } from '@patternfly/react-table';
import { DataViewTableHead } from './DataViewTableHead';
import { DataViewSelection } from '../InternalContext';
import { DataView } from '../DataView';
import { DataViewTh } from '../DataViewTable';

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

const stickyFirstColumn: DataViewTh[] = [
  { cell: 'Repositories', props: { isStickyColumn: true, hasRightBorder: true } },
  'Branches',
  'Pull requests',
  'Workspaces',
  'Last commit',
];

const ouiaId = 'HeaderExample';

describe('DataViewTableHead component', () => {
  const mockSelection: DataViewSelection = {
    onSelect: jest.fn(),
    isSelected: jest.fn(),
    isSelectDisabled: jest.fn(),
  };

  test('should render correctly', () => {
    const { container } = render(
      <Table>
        <DataViewTableHead columns={columns} ouiaId={ouiaId} />
      </Table>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render the tree table correctly when isTreeTable is true', () => {
    const { container } = render(
      <DataView selection={mockSelection}>
        <Table>
          <DataViewTableHead isTreeTable columns={columns} ouiaId={ouiaId} />
        </Table>
      </DataView>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render selection column when selection is provided', () => {
    const { container } = render(
      <DataView selection={mockSelection}>
        <Table>
          <DataViewTableHead columns={columns} ouiaId={ouiaId} />
        </Table>
      </DataView>
    );
    expect(container).toMatchSnapshot();
  });

  test('applies sticky classes to selection and first column when isSticky and first column is sticky', () => {
    render(
      <DataView selection={mockSelection}>
        <Table>
          <DataViewTableHead columns={stickyFirstColumn} ouiaId={ouiaId} isSticky />
        </Table>
      </DataView>
    );

    const selectionTh = screen.getByText('Data selection table head cell').closest('th');
    expect(selectionTh?.classList.contains('pf-v6-c-table__sticky-cell')).toBe(true);

    const repositoriesTh = screen.getByRole('columnheader', { name: 'Repositories' });
    expect(repositoriesTh.classList.contains('pf-v6-c-table__sticky-cell')).toBe(true);
  });
});

