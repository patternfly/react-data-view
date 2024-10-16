import React from 'react';
import { render } from '@testing-library/react';
import { DataView } from '../DataView';
import { DataViewTableBasic } from './DataViewTableBasic';

interface Repository {
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
}

const repositories: Repository[] = [
  { name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },
  { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },
  { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },
  { name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },
  { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },
  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }
];

const rows = repositories.map(repo => ({
  row: Object.values(repo),
}));

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

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
});
