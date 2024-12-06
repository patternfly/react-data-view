import React from 'react';
import DataView from '@patternfly/react-data-view/dist/dynamic/DataView';

const layoutItemStyling = {
  width: '100%',
  height: '5rem',
  padding: 'var(--pf-v5-global--spacer--md)',
  borderStyle: 'dashed',
  borderWidth: '2px',
};

export const BasicExample: React.FunctionComponent = () => (
  <DataView>
    <div style={layoutItemStyling}>Header</div>
    <div style={{ ...layoutItemStyling, borderTopWidth: 0, borderBottomWidth: 0 }}>Data representation</div>
    <div style={layoutItemStyling}>Footer</div>
  </DataView>
)
