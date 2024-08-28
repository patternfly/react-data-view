import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Drawer, DrawerActions, DrawerCloseButton, DrawerContent, DrawerContentBody, DrawerHead, DrawerPanelContent, Title, Text } from '@patternfly/react-core';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { DataViewEventsProvider, EventTypes, useDataViewEventsContext } from '@patternfly/react-data-view/dist/dynamic/DataViewEventsContext';

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
        <Title className="pf-v5-u-mb-md" headingLevel="h2" ouiaId="detail-drawer-title">
          Detail of repository {selectedRepo?.name}
        </Title>
        <Text>Branches: {selectedRepo?.branches}</Text>
        <Text>Pull requests: {selectedRepo?.prs}</Text>
        <Text>Workspaces: {selectedRepo?.workspaces}</Text>
        <Text>Last commit: {selectedRepo?.lastCommit}</Text>
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

const RepositoriesTable: React.FunctionComponent<RepositoriesTableProps> = ({ selectedRepo = undefined }) => {
  const { trigger } = useDataViewEventsContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rows = useMemo(() => repositories.map(repo => ({ row: Object.values(repo), props: { isClickable: true, onRowClick: () => handleRowClick(selectedRepo?.name === repo.name ? undefined : repo), isRowSelected: selectedRepo?.name === repo.name } } )), [ selectedRepo?.name ]);

  const handleRowClick = (repo: Repository | undefined) => {
    trigger(EventTypes.rowClick, repo);
  };

  return (
    <DataView>
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
