import { FunctionComponent, useState } from 'react';
import { DataViewTable, DataViewTr, DataViewTh, ExpandableContent } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { Button, Toolbar, ToolbarContent, ToolbarItem, Switch } from '@patternfly/react-core';

interface Repository {
  id: number;
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
  contributors: string;
  stars: string;
  forks: string;
}

const expandableContents: ExpandableContent[] = [
  // Row 1 - Repository one
  { row_id: 1, column_id: 2, content: <div><strong>Branch Details:</strong> 5 active branches, main, develop, feature/new-ui, hotfix/bug-123, release/v2.0</div> },
  { row_id: 1, column_id: 3, content: <div><strong>PR Details:</strong> 3 open PRs, 45 merged this month, avg review time: 2 days</div> },
  { row_id: 1, column_id: 5, content: <div><strong>Commit Info:</strong> Author: John Doe, Message: "Fix critical authentication bug", SHA: a1b2c3d</div> },

  // Row 2 - Repository two
  { row_id: 2, column_id: 2, content: <div><strong>Branch Details:</strong> 8 active branches, main, staging, feature/api-v2, feature/dashboard</div> },
  { row_id: 2, column_id: 3, content: <div><strong>PR Details:</strong> 5 open PRs, 120 merged this month, avg review time: 1.5 days</div> },
  { row_id: 2, column_id: 4, content: <div><strong>Workspace Info:</strong> Development env, 3 active deployments, last updated 30 mins ago</div> },
  { row_id: 2, column_id: 5, content: <div><strong>Commit Info:</strong> Author: Jane Smith, Message: "Add new API endpoints", SHA: x9y8z7w</div> },

  // Row 3 - Repository three
  { row_id: 3, column_id: 2, content: <div><strong>Branch Details:</strong> 12 active branches including main, develop, multiple feature branches</div> },
  { row_id: 3, column_id: 3, content: <div><strong>PR Details:</strong> 8 open PRs, 200 merged this month, avg review time: 3 days</div> },
  { row_id: 3, column_id: 4, content: <div><strong>Workspace Info:</strong> Staging env, 10 active deployments, last updated 1 day ago</div> },
  { row_id: 3, column_id: 5, content: <div><strong>Commit Info:</strong> Author: Bob Johnson, Message: "Refactor core modules", SHA: p0o9i8u</div> },

  // Row 4 - Repository four
  { row_id: 4, column_id: 2, content: <div><strong>Branch Details:</strong> 6 active branches, focusing on microservices architecture</div> },
  { row_id: 4, column_id: 3, content: <div><strong>PR Details:</strong> 2 open PRs, 90 merged this month, avg review time: 2.5 days</div> },
  { row_id: 4, column_id: 4, content: <div><strong>Workspace Info:</strong> QA env, 7 active deployments, automated testing enabled</div> },
  { row_id: 4, column_id: 5, content: <div><strong>Commit Info:</strong> Author: Alice Williams, Message: "Update dependencies", SHA: m5n4b3v</div> },

  // Row 5 - Repository five
  { row_id: 5, column_id: 2, content: <div><strong>Branch Details:</strong> 4 active branches, clean branch strategy</div> },
  { row_id: 5, column_id: 3, content: <div><strong>PR Details:</strong> 6 open PRs, 75 merged this month, avg review time: 1 day</div> },
  { row_id: 5, column_id: 4, content: <div><strong>Workspace Info:</strong> Pre-production env, CI/CD pipeline configured</div> },
  { row_id: 5, column_id: 5, content: <div><strong>Commit Info:</strong> Author: Charlie Brown, Message: "Implement dark mode", SHA: q2w3e4r</div> },

  // Row 6 - Repository six
  { row_id: 6, column_id: 2, content: <div><strong>Branch Details:</strong> 15 active branches, complex branching model</div> },
  { row_id: 6, column_id: 3, content: <div><strong>PR Details:</strong> 10 open PRs, 250 merged this month, avg review time: 4 days</div> },
  { row_id: 6, column_id: 4, content: <div><strong>Workspace Info:</strong> Multi-region deployment, high availability setup</div> },
  { row_id: 6, column_id: 5, content: <div><strong>Commit Info:</strong> Author: David Lee, Message: "Security patches applied", SHA: t6y7u8i</div> },
];

const repositories: Repository[] = [
  { id: 1, name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one', contributors: '25 contributors', stars: '1.2k stars', forks: '340 forks'},
  { id: 2, name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two', contributors: '45 contributors', stars: '3.5k stars', forks: '890 forks'},
  { id: 3, name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three', contributors: '200 contributors', stars: '15k stars', forks: '2.1k forks'},
  { id: 4, name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four', contributors: '80 contributors', stars: '5.7k stars', forks: '1.2k forks'},
  { id: 5, name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five', contributors: '60 contributors', stars: '4.3k stars', forks: '780 forks'},
  { id: 6, name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six', contributors: '300 contributors', stars: '22k stars', forks: '4.5k forks'},
  { id: 7, name: 'Repository seven', branches: 'Branch seven', prs: 'Pull request seven', workspaces: 'Workspace seven', lastCommit: 'Timestamp seven', contributors: '12 contributors', stars: '567 stars', forks: '120 forks'},
  { id: 8, name: 'Repository eight', branches: 'Branch eight', prs: 'Pull request eight', workspaces: 'Workspace eight', lastCommit: 'Timestamp eight', contributors: '98 contributors', stars: '7.8k stars', forks: '1.5k forks'},
  { id: 9, name: 'Repository nine', branches: 'Branch nine', prs: 'Pull request nine', workspaces: 'Workspace nine', lastCommit: 'Timestamp nine', contributors: '33 contributors', stars: '2.1k stars', forks: '456 forks'},
  { id: 10, name: 'Repository ten', branches: 'Branch ten', prs: 'Pull request ten', workspaces: 'Workspace ten', lastCommit: 'Timestamp ten', contributors: '150 contributors', stars: '11k stars', forks: '2.8k forks'},
  { id: 11, name: 'Repository eleven', branches: 'Branch eleven', prs: 'Pull request eleven', workspaces: 'Workspace eleven', lastCommit: 'Timestamp eleven', contributors: '67 contributors', stars: '5.2k stars', forks: '980 forks'},
  { id: 12, name: 'Repository twelve', branches: 'Branch twelve', prs: 'Pull request twelve', workspaces: 'Workspace twelve', lastCommit: 'Timestamp twelve', contributors: '41 contributors', stars: '3.1k stars', forks: '670 forks'},
  { id: 13, name: 'Repository thirteen', branches: 'Branch thirteen', prs: 'Pull request thirteen', workspaces: 'Workspace thirteen', lastCommit: 'Timestamp thirteen', contributors: '89 contributors', stars: '6.4k stars', forks: '1.3k forks'},
  { id: 14, name: 'Repository fourteen', branches: 'Branch fourteen', prs: 'Pull request fourteen', workspaces: 'Workspace fourteen', lastCommit: 'Timestamp fourteen', contributors: '120 contributors', stars: '9.2k stars', forks: '1.9k forks'},
  { id: 15, name: 'Repository fifteen', branches: 'Branch fifteen', prs: 'Pull request fifteen', workspaces: 'Workspace fifteen', lastCommit: 'Timestamp fifteen', contributors: '78 contributors', stars: '5.9k stars', forks: '1.1k forks'}
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

const ouiaId = 'TableInteractiveExample';

export const InteractiveExample: FunctionComponent = () => {
  const [isExpandable, setIsExpandable] = useState(true);
  const [isSticky, setIsSticky] = useState(true);
  const [isDraggable, setIsDraggable] = useState(true);

  // Generate rows based on current settings
  const rows: DataViewTr[] = repositories.map(({ id, name, branches, prs, workspaces, lastCommit, contributors, stars, forks }) => [
    {
      id,
      cell: workspaces,
      props: {
        favorites: { isFavorited: true }
      }
    },
    { cell: <Button href='#' variant='link' isInline>{name}</Button>, props: { isStickyColumn: isSticky, hasRightBorder: true, hasLeftBorder: true, modifier: "nowrap" } },
    { cell: branches, props: { modifier: "nowrap" } },
    { cell: prs, props: { modifier: "nowrap" } },
    { cell: workspaces, props: { modifier: "nowrap" } },
    { cell: lastCommit, props: { modifier: "nowrap" } },
    { cell: contributors, props: { modifier: "nowrap" } },
    { cell: stars, props: { modifier: "nowrap" } },
    { cell: forks, props: { modifier: "nowrap" } }
  ]);

  const columns: DataViewTh[] = [
    null,
    { cell: 'Repositories', props: { isStickyColumn: isSticky, modifier: 'fitContent', hasRightBorder:true, hasLeftBorder: true } },
    { cell: <>Branches<ExclamationCircleIcon className='pf-v6-u-ml-sm' color="var(--pf-t--global--color--status--danger--default)"/></>, props: { width: 20 } },
    { cell: 'Pull requests', props: { width: 20 } },
    { cell: 'Workspaces', props: { info: { tooltip: 'More information' }, width: 20 } },
    { cell: 'Last commit', props: { sort: { sortBy: {}, columnIndex: 4 }, width: 20 } },
    { cell: 'Contributors', props: { width: 20 } },
    { cell: 'Stars', props: { width: 20 } },
    { cell: 'Forks', props: { width: 20 } },
  ];

  return (
    <>
      <Toolbar>
        <ToolbarContent>
          <ToolbarItem>
            <Switch
              id="expandable-switch"
              label="Expandable"
              isChecked={isExpandable}
              onChange={(_event, checked) => setIsExpandable(checked)}
              aria-label="Toggle expandable rows"
            />
          </ToolbarItem>
          <ToolbarItem>
            <Switch
              id="sticky-switch"
              label="Sticky header & column"
              isChecked={isSticky}
              onChange={(_event, checked) => setIsSticky(checked)}
              aria-label="Toggle sticky header and columns"
            />
          </ToolbarItem>
          <ToolbarItem>
            <Switch
              id="draggable-switch"
              label="Draggable rows"
              isChecked={isDraggable}
              onChange={(_event, checked) => setIsDraggable(checked)}
              aria-label="Toggle draggable rows"
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      <div style={{ height: '400px', overflow: 'auto' }}>
        <DataViewTable
          aria-label='Interactive repositories table'
          ouiaId={ouiaId}
          columns={columns}
          rows={rows}
          expandedRows={isExpandable ? expandableContents : undefined}
          isExpandable={isExpandable}
          isSticky={isSticky}
          isDraggable={isDraggable}
        />
      </div>
    </>
  );
};
