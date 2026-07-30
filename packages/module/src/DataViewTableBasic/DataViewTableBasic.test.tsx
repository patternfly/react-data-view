import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataView } from '../DataView';
import { DataViewTableBasic, ExpandableContent } from './DataViewTableBasic';

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

const expandableContents: ExpandableContent[] = [
  { rowId: 1, columnId: 1, content: <div>Branch details for Repository one</div> },
];

// Rows using DataViewTrObject format with `id` for indexBy tests
const objectRows = repositories.map(({ id, name, branches, prs, workspaces, lastCommit }) => ({
  row: [ name, branches, prs, workspaces, lastCommit ],
  id: String(id),
}));

const objectExpandableContents: ExpandableContent[] = [
  { rowId: '1', columnId: 1, content: <div>Branch details for Repository one</div> },
];

const standardExpandableContents: ExpandableContent[] = [
  { rowId: 1, content: <div>Details for Repository one</div> },
];

const objectStandardExpandableContents: ExpandableContent[] = [
  { rowId: '1', content: <div>Details for Repository one</div> },
];

// Only row 3 has content, other rows get an empty toggle cell
const partialStandardExpandableContents: ExpandableContent[] = [
  { rowId: 3, content: <div>Details for Repository three</div> },
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

  test('compound expandable rows: cell should be clickable and expandable', async () => {
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

  test('should render correctly with indexBy prop', () => {
    const { container } = render(
      <DataViewTableBasic aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={objectRows} indexBy="id" />
    );
    expect(container.querySelectorAll('tr').length).toBeGreaterThan(0);
  });

  test('compound expandable rows with indexBy: expand button uses row id as key', async () => {
    const user = userEvent.setup();

    render(
      <DataViewTableBasic
        aria-label='Repositories table'
        ouiaId={ouiaId}
        columns={columns}
        rows={objectRows}
        isExpandable={true}
        expandedRows={objectExpandableContents}
        indexBy="id"
      />
    );

    // The expandId should use the row's id value ("1") instead of the array index (0)
    const branchExpandButton = document.getElementById('expandable-1-0-1');
    expect(branchExpandButton).toBeTruthy();

    // Click the expand button
    await user.click(branchExpandButton!);

    // After clicking, the expandable content should be visible
    const branchContent = screen.getByText('Branch details for Repository one');
    expect(branchContent.closest('tr')?.classList.contains('pf-m-expanded')).toBeTruthy();
  });

  test('without indexBy, expansion state uses array index (default behavior)', async () => {
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

    // Without indexBy, expandId should use the array index (0)
    const branchExpandButton = document.getElementById('expandable-0-0-1');
    expect(branchExpandButton).toBeTruthy();

    await user.click(branchExpandButton!);

    const branchContent = screen.getByText('Branch details for Repository one');
    expect(branchContent.closest('tr')?.classList.contains('pf-m-expanded')).toBeTruthy();
  });

  test('traditional expandable rows: dedicated toggle column expands row', async () => {
    const user = userEvent.setup();

    render(
      <DataViewTableBasic
        aria-label='Repositories table'
        ouiaId={ouiaId}
        columns={columns}
        rows={rows}
        isExpandable={true}
        expandedRows={standardExpandableContents}
      />
    );

    // The expand toggle is in a dedicated column before the data cells
    const expandButton = screen.getByRole('button', { name: 'Details' });

    // The toggle cell should be before the first data cell
    const firstDataCell = document.querySelector('[data-ouia-component-id="TableExample-td-0-0"]')!;
    expect(firstDataCell.previousElementSibling).toBe(expandButton.closest('td'));

    // Initially collapsed
    const expandableContent = screen.getByText('Details for Repository one');
    expect(expandableContent.closest('tr')?.classList.contains('pf-m-expanded')).toBeFalsy();

    // Click the expand toggle
    await user.click(expandButton);

    // After clicking, the expandable content should be visible
    expect(expandableContent.closest('tr')?.classList.contains('pf-m-expanded')).toBeTruthy();

    // Click again to collapse
    await user.click(expandButton);
    expect(expandableContent.closest('tr')?.classList.contains('pf-m-expanded')).toBeFalsy();
  });

  test('traditional expandable rows with indexBy: expand uses row id as key', async () => {
    const user = userEvent.setup();

    render(
      <DataViewTableBasic
        aria-label='Repositories table'
        ouiaId={ouiaId}
        columns={columns}
        rows={objectRows}
        isExpandable={true}
        expandedRows={objectStandardExpandableContents}
        indexBy="id"
      />
    );

    // The expandId should use the row's id value ("1") instead of the array index (0)
    const expandButton = document.querySelector('[id^="expandable-1"]');
    expect(expandButton).toBeTruthy();

    // Click the expand button
    await user.click(expandButton!);

    // After clicking, the expandable content should be visible
    const expandableContent = screen.getByText('Details for Repository one');
    expect(expandableContent.closest('tr')?.classList.contains('pf-m-expanded')).toBeTruthy();
  });

  test('traditional expandable rows: rows without expandable content render empty toggle cell', () => {
    render(
      <DataViewTableBasic
        aria-label='Repositories table'
        ouiaId={ouiaId}
        columns={columns}
        rows={rows}
        isExpandable={true}
        expandedRows={partialStandardExpandableContents}
      />
    );

    // Row 1 (rowId=1) has no expandable content — toggle cell should be empty (no button)
    const firstRowToggleCell = document.querySelector('[data-ouia-component-id="TableExample-td-0-0"]')!.previousElementSibling as HTMLElement;
    expect(firstRowToggleCell.tagName).toBe('TD');
    expect(firstRowToggleCell.querySelector('button')).toBeNull();

    // Row 3 (rowId=3) has expandable content — toggle cell should have a button
    const thirdRowToggleCell = document.querySelector('[data-ouia-component-id="TableExample-td-2-0"]')!.previousElementSibling as HTMLElement;
    expect(thirdRowToggleCell.tagName).toBe('TD');
    expect(thirdRowToggleCell.querySelector('button')).toBeTruthy();
  });
});
