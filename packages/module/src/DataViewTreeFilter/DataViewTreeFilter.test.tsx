import { render } from '@testing-library/react';
import DataViewTreeFilter, { DataViewTreeFilterProps } from './DataViewTreeFilter';
import DataViewToolbar from '../DataViewToolbar';
import { TreeViewDataItem } from '@patternfly/react-core';

describe('DataViewTreeFilter component', () => {
  const treeItems: TreeViewDataItem[] = [
    {
      name: 'Development Workspace',
      id: 'workspace-dev',
      checkProps: { 'aria-label': 'dev-workspace-check', checked: false }
    },
    {
      name: 'Production Workspace',
      id: 'workspace-prod',
      checkProps: { 'aria-label': 'prod-workspace-check', checked: false }
    },
    {
      name: 'Operating Systems',
      id: 'os-parent',
      checkProps: { 'aria-label': 'os-check', checked: false },
      children: [
        {
          name: 'Linux',
          id: 'os-linux',
          checkProps: { checked: false }
        },
        {
          name: 'Windows',
          id: 'os-windows',
          checkProps: { checked: false }
        }
      ]
    }
  ];

  const defaultProps: DataViewTreeFilterProps = {
    filterId: 'test-tree-filter',
    title: 'Test Tree Filter',
    value: ['Linux'],
    items: treeItems
  };

  it('should render correctly', () => {
    const { container } = render(
      <DataViewToolbar filters={<DataViewTreeFilter {...defaultProps} />} />
    );
    expect(container).toMatchSnapshot();
  });
});
