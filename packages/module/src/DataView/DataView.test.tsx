import React from 'react';
import { render } from '@testing-library/react';
import DataView from './DataView';

const layoutItemStyling = {
  width: '100%',
  height: '5rem',
  padding: 'var(--pf-v5-global--spacer--md)',
  borderStyle: 'dashed',
  borderWidth: '2px',
};

describe('DataView component', () => {
  test('should render correctly', () => {
    expect(render(
      <DataView>
        <div style={layoutItemStyling}>Header</div>
        <div style={{ ...layoutItemStyling, borderTopWidth: 0, borderBottomWidth: 0 }}>Data representation</div>
        <div style={layoutItemStyling}>Footer</div>
      </DataView>)).toMatchSnapshot();
  });
});