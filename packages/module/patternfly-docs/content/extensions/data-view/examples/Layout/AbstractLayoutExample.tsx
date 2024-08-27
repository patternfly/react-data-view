import React from 'react';
import DataView from '@patternfly/react-data-view/dist/dynamic/DataView';

const layoutItemStyling = {
  width: '100%',
  height: '5rem',
  padding: 'var(--pf-t--global--spacer--md)',
  border: 'var(--pf-t--global--border--width--box--default) dashed var(--pf-t--global--border--color--default)'
};

export const BasicExample: React.FunctionComponent = () => (
  <DataView>
    <div style={layoutItemStyling}>Header</div>
    <div style={layoutItemStyling}>Data representation</div>
    <div style={layoutItemStyling}>Footer</div>
  </DataView>
)
