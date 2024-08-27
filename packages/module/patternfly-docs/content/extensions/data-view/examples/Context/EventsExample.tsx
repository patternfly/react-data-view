import React, { useContext, useEffect, useState, useRef } from 'react';
import { Drawer, DrawerActions, DrawerCloseButton, DrawerContent, DrawerContentBody, DrawerHead, DrawerPanelContent, Title, Text } from '@patternfly/react-core';
import { Table, Tbody, Th, Thead, Tr, Td } from '@patternfly/react-table';
import { DataView } from '@patternfly/react-data-view/dist/dynamic/DataView';
import DataViewContext, { DataViewProvider, EventTypes } from '@patternfly/react-data-view/dist/dynamic/DataViewContext';

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

const cols: Record<keyof Repository, string> = {
  name: 'Repositories',
  branches: 'Branches',
  prs: 'Pull requests',
  workspaces: 'Workspaces',
  lastCommit: 'Last commit'
};

const ouiaId = 'ContextExample';

interface RepositoryDetailProps {
  selectedRepo?: Repository;
  setSelectedRepo: React.Dispatch<React.SetStateAction<Repository | undefined>>;
}

const RepositoryDetail: React.FunctionComponent<RepositoryDetailProps> = ({ selectedRepo, setSelectedRepo }) => {
  const context = useContext(DataViewContext);

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
        <Title className="pf-v5-u-mb-md" headingLevel="h2">
          Detail of repository {selectedRepo?.name}
        </Title>
        <Text>Branches: {selectedRepo?.branches}</Text>
        <Text>Pull requests: {selectedRepo?.prs}</Text>
        <Text>Workspaces: {selectedRepo?.workspaces}</Text>
        <Text>Last commit: {selectedRepo?.lastCommit}</Text>
        <DrawerActions>
          <DrawerCloseButton onClick={() => setSelectedRepo(undefined)} />
        </DrawerActions>
      </DrawerHead>
    </DrawerPanelContent>
  );
};

interface RepositoriesTableProps {
  selectedRepo?: Repository;
}

const RepositoriesTable: React.FunctionComponent<RepositoriesTableProps> = ({ selectedRepo = undefined }) => {
  const { trigger } = useContext(DataViewContext);

  const handleRowClick = (repo: Repository | undefined) => {
    trigger(EventTypes.rowClick, repo);
  };

  return (
    <DataView>
      <Table aria-label="Repositories table" ouiaId={ouiaId}>
        <Thead data-ouia-component-id={`${ouiaId}-thead`}>
          <Tr ouiaId={`${ouiaId}-tr-head`}>
            {Object.values(cols).map((column, index) => (
              <Th key={index} data-ouia-component-id={`${ouiaId}-th-${index}`}>
                {column}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {repositories.map((repo, rowIndex) => (
            <Tr
              isClickable
              key={repo.name}
              ouiaId={`${ouiaId}-tr-${rowIndex}`}
              onRowClick={() => handleRowClick(selectedRepo?.name === repo.name ? undefined : repo)}
              isRowSelected={selectedRepo?.name === repo.name}
            >
              {Object.keys(cols).map((column, colIndex) => (
                <Td key={colIndex} data-ouia-component-id={`${ouiaId}-td-${rowIndex}-${colIndex}`}>
                  {repo[column as keyof Repository]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </DataView>
  );
};

export const BasicExample: React.FunctionComponent = () => {
  const [ selectedRepo, setSelectedRepo ] = useState<Repository>();
  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <DataViewProvider>
      <Drawer isExpanded={Boolean(selectedRepo)} onExpand={() => drawerRef.current?.focus()}>
        <DrawerContent
          panelContent={<RepositoryDetail selectedRepo={selectedRepo} setSelectedRepo={setSelectedRepo} />}
        >
          <DrawerContentBody>
            <RepositoriesTable selectedRepo={selectedRepo} />
          </DrawerContentBody>
        </DrawerContent>
      </Drawer>
    </DataViewProvider>
  );
};
