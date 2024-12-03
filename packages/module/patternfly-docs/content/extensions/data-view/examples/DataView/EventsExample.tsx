import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Drawer, DrawerActions, DrawerCloseButton, DrawerContent, DrawerContentBody, DrawerHead, DrawerPanelContent, Title, Content } from '@patternfly/react-core';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { DataViewEventsProvider, EventTypes, useDataViewEventsContext } from '@patternfly/react-data-view/dist/dynamic/DataViewEventsContext';
import { useDataViewSelection } from '@patternfly/react-data-view/dist/dynamic/Hooks';
import { ActionsColumn } from '@patternfly/react-table';

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

const columns = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

const ouiaId = 'ContextExample';

interface RepositoryDetailProps {
  selectedRepo?: Repository;
  setSelectedRepo: React.Dispatch<React.SetStateAction<Repository | undefined>>;
}

const RepositoryDetail: React.FunctionComponent<RepositoryDetailProps> = ({ selectedRepo, setSelectedRepo }) => {
  const context = useDataViewEventsContext();

  useEffect(() => {
    const unsubscribe = context.subscribe(EventTypes.rowClick, (repo: Repository) => {
      setSelectedRepo(repo);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DrawerPanelContent>
      <DrawerHead>
        <Title className="pf-v6-u-mb-md" headingLevel="h2" ouiaId="detail-drawer-title">
          Detail of {selectedRepo?.name}
        </Title>
        <Content component="p">Branches: {selectedRepo?.branches}</Content>
        <Content component="p">Pull requests: {selectedRepo?.prs}</Content>
        <Content component="p">Workspaces: {selectedRepo?.workspaces}</Content>
        <Content component="p">Last commit: {selectedRepo?.lastCommit}</Content>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setSelectedRepo(undefined)} data-ouia-component-id="detail-drawer-close-btn"/>
        </DrawerActions>
      </DrawerHead>
    </DrawerPanelContent>
  );
};

interface RepositoriesTableProps {
  selectedRepo?: Repository;
}

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

const RepositoriesTable: React.FunctionComponent<RepositoriesTableProps> = ({ selectedRepo = undefined }) => {
  const selection = useDataViewSelection({ matchOption: (a, b) => a.row[0] === b.row[0] });
  const { trigger } = useDataViewEventsContext();
  const rows = useMemo(() => {
    const handleRowClick = (event, repo: Repository | undefined) => {
      // prevents drawer toggle on actions or checkbox click
      (event.target.matches('td') || event.target.matches('tr')) && trigger(EventTypes.rowClick, repo);
    };

    return repositories.map(repo => ({
      row: [ ...Object.values(repo), { cell: <ActionsColumn items={rowActions}/>, props: { isActionCell: true } } ],
      props: {
        isClickable: true,
        onRowClick: (event) => handleRowClick(event, selectedRepo?.name === repo.name ? undefined : repo),
        isRowSelected: selectedRepo?.name === repo.name
      }
    }));
  }, [ selectedRepo?.name, trigger ]);

  return (
    <DataView selection={selection}>
      <DataViewTable aria-label='Repositories table' ouiaId={ouiaId} columns={columns} rows={rows} />
    </DataView>
  );
};

export const BasicExample: React.FunctionComponent = () => {
  const [ selectedRepo, setSelectedRepo ] = useState<Repository>();
  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <DataViewEventsProvider>
      <Drawer isExpanded={Boolean(selectedRepo)} onExpand={() => drawerRef.current?.focus()} data-ouia-component-id="detail-drawer" >
        <DrawerContent
          panelContent={<RepositoryDetail selectedRepo={selectedRepo} setSelectedRepo={setSelectedRepo} />}
        >
          <DrawerContentBody>
            <RepositoriesTable selectedRepo={selectedRepo} />
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </DataViewEventsProvider>
  );
};
