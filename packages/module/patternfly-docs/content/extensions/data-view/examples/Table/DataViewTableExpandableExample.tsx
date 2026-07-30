import { FunctionComponent } from 'react';
import { DataViewTable, DataViewTr, DataViewTh, ExpandableContent } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';

interface Repository {
  id: number;
  name: string;
  branches: string;
  prs: string;
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

const expandableContents: ExpandableContent[] = [
  { rowId: 1, content: <div>Detailed information for Repository one</div> },
  { rowId: 2, content: <div>Detailed information for Repository two</div> },
  { rowId: 3, content: <div>Detailed information for Repository three</div> },
  { rowId: 4, content: <div>Detailed information for Repository four</div> },
  { rowId: 5, content: <div>Detailed information for Repository five</div> },
  { rowId: 6, content: <div>Detailed information for Repository six</div> },
];

const rows: DataViewTr[] = repositories.map(({ id, name, branches, prs, workspaces, lastCommit }) => [
  { id, cell: name },
  branches,
  prs,
  workspaces,
  lastCommit
]);

const columns: DataViewTh[] = [ null, 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

const ouiaId = 'ExpandableTableExample';

export const ExpandableExample: FunctionComponent = () => (
  <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} expandedRows={expandableContents} isExpandable={true}/>
);
