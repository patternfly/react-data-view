import React from 'react';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable, DataViewTh, DataViewTrTree } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { FolderIcon, FolderOpenIcon, LeafIcon } from '@patternfly/react-icons';

interface Repository {
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
  children?: Repository[];
}

const repositories: Repository[] = [
  { 
    name: 'Repository one',
    branches: 'Branch one',
    prs: 'Pull request one',
    workspaces: 'Workspace one',
    lastCommit: 'Timestamp one',
    children: [
      { name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },
      { name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },
    ]
  },
  { 
    name: 'Repository four',
    branches: 'Branch four',
    prs: 'Pull request four',
    workspaces: 'Workspace four',
    lastCommit: 'Timestamp four',
    children: [ { name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' } ]
  },
  { name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }
];

const buildRows = (repositories: Repository[]): DataViewTrTree[] => repositories.map((repo) => ({
  row: [ repo.name, repo.branches, repo.prs, repo.workspaces, repo.lastCommit ],
  id: repo.name, // unique ID for each row
  ...(repo.children
    ? { 
      children: buildRows(repo.children) // build rows for children
    } 
    : {})
}));

const rows: DataViewTrTree[] = buildRows(repositories);

const columns: DataViewTh[] = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

const ouiaId = 'TreeTableExample';

export const BasicExample: React.FunctionComponent = () => {
  const selection = useDataViewSelection({ matchOption: (a, b) => a.id === b.id });

  return (
    <DataView selection={selection}>
      <DataViewTable 
        isTreeTable 
        ouiaId={ouiaId}
        columns={columns} 
        rows={rows}
        leafIcon={<LeafIcon/>}
        expandedIcon={<FolderOpenIcon aria-hidden />}
        collapsedIcon={<FolderIcon aria-hidden />} 
      />
    </DataView>
  );
}
