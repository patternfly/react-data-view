import React from 'react';
import DataView from '@patternfly/react-data-view/dist/dynamic/DataView';
import DataViewToolbar from '@patternfly/react-data-view/dist/dynamic/DataViewToolbar';

const layoutItemStyling = {
  width: '100%',
  height: '5rem',
  padding: 'var(--pf-t--global--spacer--md)',
  border: 'var(--pf-t--global--border--width--box--default) dashed var(--pf-t--global--border--color--default)'
};

const PAGE = 1;
const PER_PAGE = 10;

export const BasicExample: React.FunctionComponent = () => (
  <DataView>
    <DataViewToolbar page={PAGE} perPage={PER_PAGE} />
    <div style={layoutItemStyling}>Data representation</div>
    <DataViewToolbar page={PAGE} perPage={PER_PAGE} isBottom />
  </DataView>
)
