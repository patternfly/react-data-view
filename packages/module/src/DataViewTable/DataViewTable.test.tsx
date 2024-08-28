import React from 'react';
import { render } from '@testing-library/react';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';

interface Repository {
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
}

const repositories: Repository[] = [
  { name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
  { name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
  { name: 'one - 3', branches: 'two - 3', prs: 'three - 3', workspaces: 'four - 3', lastCommit: 'five - 3' },
  { name: 'one - 4', branches: 'two - 4', prs: 'null', workspaces: 'four - 4', lastCommit: 'five - 4' },
  { name: 'one - 5', branches: 'two - 5', prs: 'three - 5', workspaces: 'four - 5', lastCommit: 'five - 5' },
  { name: 'one - 6', branches: 'two - 6', prs: 'three - 6', workspaces: 'four - 6', lastCommit: 'five - 6' }
];

const rows = repositories.map(repo => ({
  row: Object.values(repo),
}));

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

const ouiaId = 'TableExample';

describe('DataViewTable component', () => {
  test('should render correctly', () => {
    const { container } = render(
      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} />
    );
    expect(container).toMatchSnapshot();
  });
});
