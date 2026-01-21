import { FunctionComponent } from 'react';
import { DataViewTable, DataViewTr, DataViewTh, ExpandableContent } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { Button } from '@patternfly/react-core';
import { ActionsColumn } from '@patternfly/react-table';

interface Repository {
  id: number;
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
}

const expandableContents: ExpandableContent[] = [
  // Row 1 - Repository one
  { rowId: 1, columnId: 3, content: <div><strong>PR Details:</strong> 3 open PRs, 45 merged this month, avg review time: 2 days</div> },
  { rowId: 1, columnId: 5, content: <div><strong>Commit Info:</strong> Author: John Doe, Message: "Fix critical authentication bug", SHA: a1b2c3d</div> },

  // Row 2 - Repository two
  { rowId: 2, columnId: 2, content: <div><strong>Branch Details:</strong> 8 active branches, main, staging, feature/api-v2, feature/dashboard</div> },
  { rowId: 2, columnId: 3, content: <div><strong>PR Details:</strong> 5 open PRs, 120 merged this month, avg review time: 1.5 days</div> },
  { rowId: 2, columnId: 4, content: <div><strong>Workspace Info:</strong> Development env, 3 active deployments, last updated 30 mins ago</div> },
  { rowId: 2, columnId: 5, content: <div><strong>Commit Info:</strong> Author: Jane Smith, Message: "Add new API endpoints", SHA: x9y8z7w</div> },

  // Row 3 - Repository three
  { rowId: 3, columnId: 2, content: <div><strong>Branch Details:</strong> 12 active branches including main, develop, multiple feature branches</div> },
  { rowId: 3, columnId: 3, content: <div><strong>PR Details:</strong> 8 open PRs, 200 merged this month, avg review time: 3 days</div> },
  { rowId: 3, columnId: 4, content: <div><strong>Workspace Info:</strong> Staging env, 10 active deployments, last updated 1 day ago</div> },
  { rowId: 3, columnId: 5, content: <div><strong>Commit Info:</strong> Author: Bob Johnson, Message: "Refactor core modules", SHA: p0o9i8u</div> },

  // Row 4 - Repository four
  { rowId: 4, columnId: 2, content: <div><strong>Branch Details:</strong> 6 active branches, focusing on microservices architecture</div> },
  { rowId: 4, columnId: 3, content: <div><strong>PR Details:</strong> 2 open PRs, 90 merged this month, avg review time: 2.5 days</div> },
  { rowId: 4, columnId: 4, content: <div><strong>Workspace Info:</strong> QA env, 7 active deployments, automated testing enabled</div> },
  { rowId: 4, columnId: 5, content: <div><strong>Commit Info:</strong> Author: Alice Williams, Message: "Update dependencies", SHA: m5n4b3v</div> },

  // Row 5 - Repository five
  { rowId: 5, columnId: 2, content: <div><strong>Branch Details:</strong> 4 active branches, clean branch strategy</div> },
  { rowId: 5, columnId: 3, content: <div><strong>PR Details:</strong> 6 open PRs, 75 merged this month, avg review time: 1 day</div> },
  { rowId: 5, columnId: 4, content: <div><strong>Workspace Info:</strong> Pre-production env, CI/CD pipeline configured</div> },
  { rowId: 5, columnId: 5, content: <div><strong>Commit Info:</strong> Author: Charlie Brown, Message: "Implement dark mode", SHA: q2w3e4r</div> },

  // Row 6 - Repository six
  { rowId: 6, columnId: 2, content: <div><strong>Branch Details:</strong> 15 active branches, complex branching model</div> },
  { rowId: 6, columnId: 3, content: <div><strong>PR Details:</strong> 10 open PRs, 250 merged this month, avg review time: 4 days</div> },
  { rowId: 6, columnId: 4, content: <div><strong>Workspace Info:</strong> Multi-region deployment, high availability setup</div> },
  { rowId: 6, columnId: 5, content: <div><strong>Commit Info:</strong> Author: David Lee, Message: "Security patches applied", SHA: t6y7u8i</div> },
];

const repositories: Repository[] = [
  { id: 1, name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one' },
  { id: 2, name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two' },
  { id: 3, name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three' },
  { id: 4, name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four' },
  { id: 5, name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five' },
  { id: 6, name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six' }
];

const rowActions = [
  {
    title: 'Some action',
    onClick: () => console.log('clicked on Some action')  // eslint-disable-line no-console
  },
  {
    title: <div>Another action</div>,
    onClick: () => console.log('clicked on Another action')  // eslint-disable-line no-console
  },
  {
    isSeparator: true
  },
  {
    title: 'Third action',
    onClick: () => console.log('clicked on Third action')  // eslint-disable-line no-console
  }
];

const rows: DataViewTr[] = repositories.map(({ id, name, branches, prs, workspaces, lastCommit }) => [
  {
    id,
    cell: workspaces,
    props: {
      favorites: { isFavorited: true }
    }
  },
  { cell: <Button href='#' variant='link' isInline>{name}</Button> },
  branches,
  prs,
  workspaces,
  lastCommit,
  { cell: <ActionsColumn items={rowActions}/>, props: { isActionCell: true } },
]);

const columns: DataViewTh[] = [
  null,
  'Repositories', 
  { cell: <>Branches<ExclamationCircleIcon className='pf-v6-u-ml-sm' color="var(--pf-t--global--color--status--danger--default)"/></> }, 
  'Pull requests', 
  { cell: 'Workspaces', props: { info: { tooltip: 'More information' }, isStickyColumn: true } }, 
  { cell: 'Last commit', props: { sort: { sortBy: {}, columnIndex: 4 } } },
];

const ouiaId = 'TableExample';

export const ExpandableExample: FunctionComponent = () => (
  <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} expandedRows={expandableContents} isExpandable={true}/>
);
