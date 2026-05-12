import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataView } from '../DataView';
import { DataViewSelection } from '../InternalContext';
import { DataViewTableBasic, ExpandableContent } from './DataViewTableBasic';
import { DataViewTh } from '../DataViewTable';

interface Repository {
  id: number;
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
}

const repositories: Repository[] = [
  { id: 1, name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },
  { id: 2, name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },
  { id: 3, name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },
  { id: 4, name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },
  { id: 5, name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },
  { id: 6, name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }
];

const rows = repositories.map(({ id, name, branches, prs, workspaces, lastCommit }) => [
  { id, cell: name },
  branches,
  prs,
  workspaces,
  lastCommit
]);

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

const stickyColumns: DataViewTh[] = [
  { cell: 'Repositories', props: { isStickyColumn: true, hasRightBorder: true } },
  'Branches',
  'Pull requests',
  'Workspaces',
  'Last commit',
];

const mockSelection: DataViewSelection = {
  onSelect: jest.fn(),
  isSelected: jest.fn(() => false),
  isSelectDisabled: jest.fn(() => false),
};

const expandableContents: ExpandableContent[] = [
  { rowId: 1, columnId: 1, content: <div>Branch details for Repository one</div> },
];

const ouiaId = 'TableExample';

describe('DataViewTable component', () => {
  test('should render correctly', () => {
    const { container } = render(
      <DataViewTableBasic aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render with an empty state', () => {
    const { container } = render(
      <DataView activeState="empty">
        <DataViewTableBasic aria-label='Repositories table' ouiaId={ouiaId} columns={columns} bodyStates={{ empty: "No data found" }} rows={[]} />
      </DataView>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render with an error state', () => {
    const { container } = render(
      <DataView activeState="error">
        <DataViewTableBasic aria-label='Repositories table' ouiaId={ouiaId} columns={columns} bodyStates={{ error: "Some error" }} rows={[]} />
      </DataView>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render with a loading state', () => {
    const { container } = render(
      <DataView activeState="loading">
        <DataViewTableBasic aria-label='Repositories table' ouiaId={ouiaId} columns={columns} bodyStates={{ loading: "Data is loading" }} rows={[]} />
      </DataView>
    );
    expect(container).toMatchSnapshot();
  });

  test('applies sticky classes to selection and first data cells when isSticky and first column is sticky', () => {
    const stickyRows = repositories.map(({ id, name, branches, prs, workspaces, lastCommit }) => [
      { id, cell: name, props: { isStickyColumn: true, hasRightBorder: true } },
      branches,
      prs,
      workspaces,
      lastCommit,
    ]);

    const { container } = render(
      <DataView selection={mockSelection}>
        <DataViewTableBasic
          aria-label='Repositories table'
          ouiaId={ouiaId}
          columns={stickyColumns}
          rows={stickyRows}
          isSticky
        />
      </DataView>
    );

    const firstBodyRow = container.querySelector('tbody tr');
    const bodyCells = firstBodyRow?.querySelectorAll('td');
    expect(bodyCells?.[0]?.classList.contains('pf-v6-c-table__sticky-cell')).toBe(true);
    expect(bodyCells?.[1]?.classList.contains('pf-v6-c-table__sticky-cell')).toBe(true);
  });

  test('when isExpandable cell should be clickable and expandable', async () => {
    const user = userEvent.setup();

    render(
      <DataViewTableBasic
        aria-label='Repositories table'
        ouiaId={ouiaId}
        columns={columns}
        rows={rows}
        isExpandable={true}
        expandedRows={expandableContents}
      />
    );

    // Initially, expandable content is rendered but should be hidden (not visible)
    const initialBranchContent = screen.getByText('Branch details for Repository one');
    expect(initialBranchContent.closest('tr')?.classList.contains('pf-m-expanded')).toBeFalsy();

    // Find the first expandable button by ID
    const branchExpandButton = document.getElementById('expandable-0-0-1');
    expect(branchExpandButton).toBeTruthy();
    // Verify the button is in the cell with "Branch one" text
    expect(branchExpandButton?.closest('td')?.textContent).toContain('Branch one');

    // Click the expand button for Branches column
    await user.click(branchExpandButton!);

    // After clicking, the expandable content should be visible
    const branchContent = screen.getByText('Branch details for Repository one');
    expect(branchContent.closest('tr')?.classList.contains('pf-m-expanded')).toBeTruthy();
  });
});
