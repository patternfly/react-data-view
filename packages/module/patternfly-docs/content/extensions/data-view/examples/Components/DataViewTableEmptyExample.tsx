import React from 'react';
import { DataView, DataViewState } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { CubesIcon } from '@patternfly/react-icons';
import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateFooter,  } from '@patternfly/react-core';
import { Tbody, Td, Tr } from '@patternfly/react-table';

interface Repository {
  id: number;
  name: string;
  branches: string | null;
  prs: string | null;
  workspaces: string;
  lastCommit: string;
}

const repositories: Repository[] = [];

// you can also pass props to Tr by returning { row: DataViewTd[], props: TrProps } }
const rows: DataViewTr[] = repositories.map((repository) => Object.values(repository));

const columns: DataViewTh[] = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

const ouiaId = 'TableExample';

const empty = (
  <Tbody>
    <Tr key="loading" ouiaId={`${ouiaId}-tr-loading`}>
      <Td colSpan={columns.length}>
        <EmptyState  headingLevel="h4" icon={CubesIcon} titleText="No data found">
          <EmptyStateBody>There are no matching data to be displayed.</EmptyStateBody>
          <EmptyStateFooter>
            <EmptyStateActions>
              <Button variant="primary">Primary action</Button>
            </EmptyStateActions>
            <EmptyStateActions>
              <Button variant="link">Multiple</Button>
              <Button variant="link">Action Buttons</Button>
            </EmptyStateActions>
          </EmptyStateFooter>
        </EmptyState>
      </Td>
    </Tr>
  </Tbody>
);

export const BasicExample: React.FunctionComponent = () => (
  <DataView activeState={DataViewState.empty}>
    <DataViewTable 
      aria-label='Repositories table' 
      ouiaId={ouiaId}
      columns={columns}
      rows={rows}
      bodyStates={{ empty }}
    />
  </DataView>
);
