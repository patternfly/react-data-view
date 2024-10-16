import React from 'react';
import { DataView, DataViewState } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { ErrorState } from '@patternfly/react-component-groups';
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

const ouiaId = 'TableErrorExample';

const error = (
  <Tbody>
    <Tr key="loading" ouiaId={`${ouiaId}-tr-loading`}>
      <Td colSpan={columns.length}>
        <ErrorState titleText='Unable to load data' bodyText='There was an error retrieving data. Check your connection and reload the page.' />
      </Td>
    </Tr>
  </Tbody>
);

export const BasicExample: React.FunctionComponent = () => (
  <DataView activeState={DataViewState.error}>
    <DataViewTable 
      aria-label='Repositories table' 
      ouiaId={ouiaId}
      columns={columns}
      rows={rows}
      bodyStates={{ error }}
    />
  </DataView>
);
