import { FunctionComponent } from 'react';
import { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
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

const repositories: Repository[] = [
  {
    id: 1,
    name: 'Repository one',
    branches: 'Branch one',
    prs: 'Pull request one',
    workspaces: 'Workspace one',
    lastCommit: 'Timestamp one'
  },
  {
    id: 2,
    name: 'Repository two',
    branches: 'Branch two',
    prs: 'Pull request two',
    workspaces: 'Workspace two',
    lastCommit: 'Timestamp two'
  },
  {
    id: 3,
    name: 'Repository three',
    branches: 'Branch three',
    prs: 'Pull request three',
    workspaces: 'Workspace three',
    lastCommit: 'Timestamp three'
  },
  {
    id: 4,
    name: 'Repository four',
    branches: 'Branch four',
    prs: 'Pull request four',
    workspaces: 'Workspace four',
    lastCommit: 'Timestamp four'
  },
  {
    id: 5,
    name: 'Repository five',
    branches: 'Branch five',
    prs: 'Pull request five',
    workspaces: 'Workspace five',
    lastCommit: 'Timestamp five'
  },
  {
    id: 6,
    name: 'Repository six',
    branches: 'Branch six',
    prs: 'Pull request six',
    workspaces: 'Workspace six',
    lastCommit: 'Timestamp six'
  }
];

const rowActions = [
  {
    title: 'Some action',
    onClick: () => console.log('clicked on Some action') // eslint-disable-line no-console
  },
  {
    title: <div>Another action</div>,
    onClick: () => console.log('clicked on Another action') // eslint-disable-line no-console
  },
  {
    isSeparator: true
  },
  {
    title: 'Third action',
    onClick: () => console.log('clicked on Third action') // eslint-disable-line no-console
  }
];

// you can also pass props to Tr by returning { row: DataViewTd[], props: TrProps } }
const rows: DataViewTr[] = repositories.map(({ id, name, branches, prs, workspaces, lastCommit }) => [
  { id, cell: workspaces, props: { favorites: { isFavorited: true } } },
  {
    cell: (
      <Button href="#" variant="link" isInline>
        {name}
      </Button>
    )
  },
  branches,
  prs,
  workspaces,
  lastCommit,
  { cell: <ActionsColumn items={rowActions} />, props: { isActionCell: true } }
]);

const ouiaId = 'TableExample';

export const ResizableColumnsExample: FunctionComponent = () => {
  const onResize = (
    _e: React.MouseEvent | MouseEvent | React.KeyboardEvent | KeyboardEvent | TouchEvent,
    id: string | number | undefined,
    width: number
  ) => {
    // eslint-disable-next-line no-console
    console.log(`resized column id: ${id} width to: ${width.toFixed(0)}px`);
  };

  const columns: DataViewTh[] = [
    null,
    'Repositories',
    {
      cell: 'Branches',
      resizableProps: {
        isResizable: true,
        onResize,
        resizeButtonAriaLabel: 'Resize repositories column'
      },
      props: { id: 'repositories' }
    },
    {
      cell: 'Pull requests',
      resizableProps: {
        isResizable: true,
        onResize,
        resizeButtonAriaLabel: 'Resize pull requests column'
      },
      props: { info: { tooltip: 'More information' }, id: 'pull-requests' }
    },
    {
      cell: 'This is a really long title',
      resizableProps: {
        isResizable: true,
        onResize,
        resizeButtonAriaLabel: 'Resize this is a really long title column'
      },
      props: { info: { tooltip: 'More information' }, id: 'this-is-a-really-long-title' }
    },
    {
      cell: 'Last commit',
      resizableProps: {
        isResizable: true,
        onResize,
        resizeButtonAriaLabel: 'Resize last commit column'
      },
      props: { sort: { sortBy: {}, columnIndex: 4 }, id: 'last-commit' }
    }
  ];

  return <DataViewTable isResizable aria-label="Repositories table" ouiaId={ouiaId} columns={columns} rows={rows} />;
};
