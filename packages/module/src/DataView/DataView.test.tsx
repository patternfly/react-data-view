import { render } from '@testing-library/react';
import DataView from './DataView';

const layoutItemStyling = {
  width: '100%',
  height: '5rem',
  padding: 'var(--pf-t--global--spacer--md)',
  border: 'var(--pf-t--global--border--width--box--default) dashed var(--pf-t--global--border--color--default)'
};

describe('DataView component', () => {
  test('should render correctly', () => {
    expect(
      render(
        <DataView>
          <div style={layoutItemStyling}>Header</div>
          <div style={layoutItemStyling}>Data representation</div>
          <div style={layoutItemStyling}>Footer</div>
        </DataView>
      )
    ).toMatchSnapshot();
  });
});
