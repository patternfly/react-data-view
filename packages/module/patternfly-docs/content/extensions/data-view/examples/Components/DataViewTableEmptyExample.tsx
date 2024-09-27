import React from 'react';
import { DataView, DataViewState } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { CubesIcon } from '@patternfly/react-icons';
import { Button, EmptyState, EmptyStateActions, EmptyStateBody, EmptyStateFooter, EmptyStateHeader, EmptyStateIcon } from '@patternfly/react-core';

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
  <EmptyState>
    <EmptyStateHeader titleText="No data found" headingLevel="h4" icon={<EmptyStateIcon icon={CubesIcon} />} />
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
);

export const BasicExample: React.FunctionComponent = () => (
  <DataView activeState={DataViewState.empty}>
    <DataViewTable 
      aria-label='Repositories table' 
      ouiaId={ouiaId}
      columns={columns}
      rows={rows}
      states={{ empty }}
    />
  </DataView>
);
