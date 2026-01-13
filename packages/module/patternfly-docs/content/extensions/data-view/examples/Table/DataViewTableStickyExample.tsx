import { FunctionComponent } from 'react';
import { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
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
  contributors: string;
  stars: string;
  forks: string;
}

const repositories: Repository[] = [
  { id: 1, name: 'Repository one', branches: 'Branch one', prs: 'Pull request one', workspaces: 'Workspace one', lastCommit: 'Timestamp one', contributors: '25 contributors', stars: '1.2k stars', forks: '340 forks' },
  { id: 2, name: 'Repository two', branches: 'Branch two', prs: 'Pull request two', workspaces: 'Workspace two', lastCommit: 'Timestamp two', contributors: '45 contributors', stars: '3.5k stars', forks: '890 forks' },
  { id: 3, name: 'Repository three', branches: 'Branch three', prs: 'Pull request three', workspaces: 'Workspace three', lastCommit: 'Timestamp three', contributors: '200 contributors', stars: '15k stars', forks: '2.1k forks' },
  { id: 4, name: 'Repository four', branches: 'Branch four', prs: 'Pull request four', workspaces: 'Workspace four', lastCommit: 'Timestamp four', contributors: '80 contributors', stars: '5.7k stars', forks: '1.2k forks' },
  { id: 5, name: 'Repository five', branches: 'Branch five', prs: 'Pull request five', workspaces: 'Workspace five', lastCommit: 'Timestamp five', contributors: '60 contributors', stars: '4.3k stars', forks: '780 forks' },
  { id: 6, name: 'Repository six', branches: 'Branch six', prs: 'Pull request six', workspaces: 'Workspace six', lastCommit: 'Timestamp six', contributors: '300 contributors', stars: '22k stars', forks: '4.5k forks' },
  { id: 7, name: 'Repository seven', branches: 'Branch seven', prs: 'Pull request seven', workspaces: 'Workspace seven', lastCommit: 'Timestamp seven', contributors: '12 contributors', stars: '567 stars', forks: '120 forks' },
  { id: 8, name: 'Repository eight', branches: 'Branch eight', prs: 'Pull request eight', workspaces: 'Workspace eight', lastCommit: 'Timestamp eight', contributors: '98 contributors', stars: '7.8k stars', forks: '1.5k forks' },
  { id: 9, name: 'Repository nine', branches: 'Branch nine', prs: 'Pull request nine', workspaces: 'Workspace nine', lastCommit: 'Timestamp nine', contributors: '33 contributors', stars: '2.1k stars', forks: '456 forks' },
  { id: 10, name: 'Repository ten', branches: 'Branch ten', prs: 'Pull request ten', workspaces: 'Workspace ten', lastCommit: 'Timestamp ten', contributors: '150 contributors', stars: '11k stars', forks: '2.8k forks' },
  { id: 11, name: 'Repository eleven', branches: 'Branch eleven', prs: 'Pull request eleven', workspaces: 'Workspace eleven', lastCommit: 'Timestamp eleven', contributors: '67 contributors', stars: '5.2k stars', forks: '980 forks' },
  { id: 12, name: 'Repository twelve', branches: 'Branch twelve', prs: 'Pull request twelve', workspaces: 'Workspace twelve', lastCommit: 'Timestamp twelve', contributors: '41 contributors', stars: '3.1k stars', forks: '670 forks' }
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

const rows: DataViewTr[] = repositories.map(({ id, name, branches, prs, workspaces, lastCommit, contributors, stars, forks }) => [
  { id, cell: workspaces, props: { favorites: { isFavorited: true } } },
  { cell: <Button href='#' variant='link' isInline>{name}</Button>, props: { isStickyColumn: true, hasRightBorder: true, hasLeftBorder: true, modifier: "nowrap" } },
  { cell: branches, props: { modifier: "nowrap" } },
  { cell: prs, props: { modifier: "nowrap" } },
  { cell: workspaces, props: { modifier: "nowrap" } },
  { cell: lastCommit, props: { modifier: "nowrap" } },
  { cell: contributors, props: { modifier: "nowrap" } },
  { cell: stars, props: { modifier: "nowrap" } },
  { cell: forks, props: { modifier: "nowrap" } },
  { cell: <ActionsColumn items={rowActions}/>, props: { isActionCell: true } },
]);

const columns: DataViewTh[] = [
  null,
  { cell: 'Repositories', props: { isStickyColumn: true, modifier: 'fitContent', hasRightBorder: true, hasLeftBorder: true } },
  { cell: <>Branches<ExclamationCircleIcon className='pf-v6-u-ml-sm' color="var(--pf-t--global--color--status--danger--default)"/></>, props: { width: 20 } },
  { cell: 'Pull requests', props: { width: 20 } },
  { cell: 'Workspaces', props: { info: { tooltip: 'More information' }, width: 20 } },
  { cell: 'Last commit', props: { sort: { sortBy: {}, columnIndex: 4 }, width: 20 } },
  { cell: 'Contributors', props: { width: 20 } },
  { cell: 'Stars', props: { width: 20 } },
  { cell: 'Forks', props: { width: 20 } },
  null, // Actions column header
];

const ouiaId = 'TableStickyExample';

export const StickyExample: FunctionComponent = () => (
  <div style={{ height: '400px', width: '800px', overflow: 'auto' }}>
    <DataViewTable
      aria-label='Sticky repositories table'
      ouiaId={ouiaId}
      columns={columns}
      rows={rows}
      isSticky
    />
  </div>
);
