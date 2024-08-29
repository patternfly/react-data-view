import React from 'react';
import { DataViewTable, DataViewTh, DataViewTr } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { Button } from '@patternfly/react-core';

interface Repository {
  id: number;
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
}

const repositories: Repository[] = [
  { id: 1, name: 'one', branches: 'two', prs: 'three', workspaces: 'four', lastCommit: 'five' },
  { id: 2, name: 'one - 2', branches: null, prs: null, workspaces: 'four - 2', lastCommit: 'five - 2' },
  { id: 3, name: 'one - 3', branches: 'two - 3', prs: 'three - 3', workspaces: 'four - 3', lastCommit: 'five - 3' },
  { id: 4, name: 'one - 4', branches: 'two - 4', prs: 'null', workspaces: 'four - 4', lastCommit: 'five - 4' },
  { id: 5, name: 'one - 5', branches: 'two - 5', prs: 'three - 5', workspaces: 'four - 5', lastCommit: 'five - 5' },
  { id: 6, name: 'one - 6', branches: 'two - 6', prs: 'three - 6', workspaces: 'four - 6', lastCommit: 'five - 6' }
];

// you can also pass props to Tr by returning { row: DataViewTd[], props: TrProps } }
const rows: DataViewTr[] = repositories.map(({ id, name, branches, prs, workspaces, lastCommit }) => [
  { id, cell: workspaces, props: { favorites: { isFavorited: true } } },
  { cell: <Button href='#' variant='link' isInline>{name}</Button> },
  branches,
  prs,
  workspaces,
  lastCommit 
]);

const columns: DataViewTh[] = [
  null,
  'Repositories', 
  { cell: <>Branches<ExclamationCircleIcon className='pf-v5-u-ml-sm' color='var(--pf-v5-global--danger-color--100)'/></> }, 
  'Pull requests', 
  { cell: 'Workspaces', props: { info: { tooltip: 'More information' } } }, 
  { cell: 'Last commit', props: { sort: { sortBy: {}, columnIndex: 4 } } }
];

const ouiaId = 'TableExample';

export const BasicExample: React.FunctionComponent = () => (
  <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} />
);
