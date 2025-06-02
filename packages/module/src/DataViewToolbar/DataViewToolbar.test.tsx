import { render } from '@testing-library/react';
import DataViewToolbar from './DataViewToolbar';
import { Pagination } from '@patternfly/react-core';

describe('DataViewToolbar component', () => {
  test('should render correctly', () => {
    expect(render(
      <DataViewToolbar pagination={<Pagination page={1} perPage={10} />} />)).toMatchSnapshot();
  });
});