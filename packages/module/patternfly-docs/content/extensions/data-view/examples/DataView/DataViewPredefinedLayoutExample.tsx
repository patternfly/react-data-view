import React from 'react';
import DataView from '@patternfly/react-data-view/dist/dynamic/DataView';
import DataViewToolbar from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';

const layoutItemStyling = {
  width: '100%',
  height: '5rem',
  padding: 'var(--pf-t--global--spacer--md)',
  border: 'var(--pf-t--global--border--width--box--default) dashed var(--pf-t--global--border--color--default)'
};

const PAGINATION = {
  page: 1,
  perPage: 1
}

export const BasicExample: React.FunctionComponent = () => (
  <DataView>
    <DataViewToolbar pagination={PAGINATION} />
    <div style={layoutItemStyling}>Data representation</div>
    <DataViewToolbar pagination={PAGINATION} isBottom />
  </DataView>
)
