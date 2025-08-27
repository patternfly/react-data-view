import { render } from '@testing-library/react';
import { FolderIcon, FolderOpenIcon, LeafIcon } from '@patternfly/react-icons';
import { DataView } from '../DataView';
import { DataViewTable } from '../DataViewTable';
import { DataViewSelection } from '../InternalContext';

const repositories = [
  {
    name: 'Repository one',
    branches: 'Branch one',
    prs: 'Pull request one',
    workspaces: 'Workspace one',
    lastCommit: 'Timestamp one',
    children: [
      {
        name: 'Repository two',
        branches: 'Branch two',
        prs: 'Pull request two',
        workspaces: 'Workspace two',
        lastCommit: 'Timestamp two',
      },
      {
        name: 'Repository three',
        branches: 'Branch three',
        prs: 'Pull request three',
        workspaces: 'Workspace three',
        lastCommit: 'Timestamp three',
      },
    ],
  },
  {
    name: 'Repository four',
    branches: 'Branch four',
    prs: 'Pull request four',
    workspaces: 'Workspace four',
    lastCommit: 'Timestamp four',
    children: [
      {
        name: 'Repository five',
        branches: 'Branch five',
        prs: 'Pull request five',
        workspaces: 'Workspace five',
        lastCommit: 'Timestamp five',
      },
    ],
  },
  {
    name: 'Repository six',
    branches: 'Branch six',
    prs: 'Pull request six',
    workspaces: 'Workspace six',
    lastCommit: 'Timestamp six',
  },
];

// Build rows for DataViewTable
const buildRows = (repositories) => repositories.map((repo) => ({
  row: [ repo.name, repo.branches, repo.prs, repo.workspaces, repo.lastCommit ],
  id: repo.name,
  ...(repo.children ? { children: buildRows(repo.children) } : {}),
}));

const rows = buildRows(repositories);

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

const ouiaId = 'TreeTableExample';

describe('DataViewTableTree component', () => {
  const mockSelection: DataViewSelection = {
    onSelect: jest.fn(),
    isSelected: jest.fn(),
    isSelectDisabled: jest.fn(),
  };

  test('should render the tree table correctly', () => {
    const { container } = render(
      <DataView selection={mockSelection}>
        <DataViewTable isTreeTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} leafIcon={<LeafIcon/>} expandedIcon={<FolderOpenIcon aria-hidden />} collapsedIcon={<FolderIcon aria-hidden />} />
      </DataView>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render tree table with an empty state', () => {
    const { container } = render(
      <DataView activeState="empty">
        <DataViewTable isTreeTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} bodyStates={{ empty: "No data found" }} rows={[]} />

      </DataView> 
    );
    expect(container).toMatchSnapshot();
  });

  test('should render tree table with an error state', () => {
    const { container } = render(
      <DataView activeState="error">
        <DataViewTable isTreeTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} bodyStates={{ error: "Some error" }} rows={[]} />
      </DataView>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render tree table with all expandable nodes expanded', () => {
    const { container } = render(
      <DataView selection={mockSelection}>
        <DataViewTable isTreeTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} expandAll rows={rows} leafIcon={<LeafIcon/>} expandedIcon={<FolderOpenIcon aria-hidden />} collapsedIcon={<FolderIcon aria-hidden />} />
      </DataView>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render tree table with a loading state', () => {
    const { container } = render(
      <DataView activeState="loading">
        <DataViewTable isTreeTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} bodyStates={{ loading: "Data is loading" }} rows={[]} />
      </DataView> 
    );
    expect(container).toMatchSnapshot();
  });
});
