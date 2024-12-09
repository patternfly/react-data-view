import React from 'react';
import { DataView, DataViewState } from '@patternfly/react-data-view/dist/dynamic/DataView';
import { DataViewTable, DataViewTr, DataViewTh } from '@patternfly/react-data-view/dist/dynamic/DataViewTable';
import { SkeletonTableBody, SkeletonTableHead } from '@patternfly/react-component-groups';

// you can also pass props to Tr by returning { row: DataViewTd[], props: TrProps } }
const rows: DataViewTr[] = [];

const columns: DataViewTh[] = [ 'Repositories', 'Branches', 'Pull requests', 'Workspaces', 'Last commit' ];

const ouiaId = 'TableExample';

const headLoading = <SkeletonTableHead columns={columns} />
const bodyLoading = <SkeletonTableBody rowsCount={5} columnsCount={columns.length} />;

export const BasicExample: React.FunctionComponent = () => (
  <DataView activeState={DataViewState.loading}>
    <DataViewTable
      aria-label='Repositories table' 
      ouiaId={ouiaId}
      columns={columns}
      rows={rows}
      headStates={{ loading: headLoading }}
      bodyStates={{ loading: bodyLoading }}
    />
  </DataView>
);
