import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import DataViewTreeFilter, { DataViewTreeFilterProps } from './DataViewTreeFilter';
import DataViewToolbar from '../DataViewToolbar';
import { TreeViewDataItem } from '@patternfly/react-core';

describe('DataViewTreeFilter component', () => {
  const treeItems: TreeViewDataItem[] = [
    {
      name: 'Linux',
      id: 'os-linux',
      checkProps: { 'aria-label': 'linux-check', checked: false },
      children: [
        {
          name: 'Ubuntu 22.04',
          id: 'os-ubuntu',
          checkProps: { checked: false }
        },
        {
          name: 'RHEL 9',
          id: 'os-rhel',
          checkProps: { checked: false }
        },
        {
          name: 'Debian 12',
          id: 'os-debian',
          checkProps: { checked: false }
        },
        {
          name: 'CentOS 8',
          id: 'os-centos',
          checkProps: { checked: false }
        },
        {
          name: 'Fedora 38',
          id: 'os-fedora',
          checkProps: { checked: false }
        }
      ],
      defaultExpanded: true
    },
    {
      name: 'Windows',
      id: 'os-windows',
      checkProps: { 'aria-label': 'windows-check', checked: false },
      children: [
        {
          name: 'Windows Server 2022',
          id: 'os-windows-2022',
          checkProps: { checked: false }
        }
      ]
    },
    {
      name: 'macOS',
      id: 'os-macos',
      checkProps: { 'aria-label': 'macos-check', checked: false },
      children: [
        {
          name: 'macOS Ventura',
          id: 'os-macos-ventura',
          checkProps: { checked: false }
        },
        {
          name: 'macOS Sonoma',
          id: 'os-macos-sonoma',
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(
      <DataViewToolbar filters={<DataViewTreeFilter {...defaultProps} />} />
    );
    expect(container).toMatchSnapshot();
  });
  describe('defaultExpanded', () => {
    it('should have expanded items by default', async () => {
      render(
        <DataViewToolbar
          filters={
            <DataViewTreeFilter
              filterId="os"
              title="Operating System"
              items={treeItems}
              defaultExpanded={true}
            />
          }
        />
      );

      const openMenu = screen.getByRole('button', { name: /operating system/i });
      await userEvent.click(openMenu);
      await waitFor(() => {
        const node = screen.getByText('Ubuntu 22.04');
        expect(node).toHaveClass('pf-v6-c-tree-view__node-text');
        expect(node).toBeInTheDocument();
      });
    });
  });
  describe('onChange callback', () => {
    it('onChange should be called on toggle of node', async () => {
      const mockOnChange = jest.fn();
      render(
        <DataViewToolbar
          filters={
            <DataViewTreeFilter
              filterId="os"
              title="Operating System"
              items={treeItems}
              defaultExpanded={true}
              onChange={mockOnChange}
            />
          }
        />
      );

      const openMenu = screen.getByRole('button', { name: /operating system/i });
      await userEvent.click(openMenu);

      await waitFor(() => {
        const node = screen.getByText('Ubuntu 22.04');
        expect(node).toBeInTheDocument();
      });

      const node = screen.getByText('Ubuntu 22.04');
      await userEvent.click(node);

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalled();
      });
    });
  });
  describe('onSelect callback', () => {
    it('onSelect should return list of selected items when item is selected', async () => {
      const mockOnSelect = jest.fn();
      render(
        <DataViewToolbar
          filters={
            <DataViewTreeFilter
              filterId="os"
              title="Operating System"
              items={treeItems}
              defaultExpanded={true}
              onSelect={mockOnSelect}
            />
          }
        />
      );

      const openMenu = screen.getByRole('button', { name: /operating system/i });
      await userEvent.click(openMenu);

      await waitFor(() => {
        const node = screen.getByText('Ubuntu 22.04');
        expect(node).toBeInTheDocument();
      });

      const node = screen.getByText('Ubuntu 22.04');
      await userEvent.click(node);

      await waitFor(() => {
        expect(mockOnSelect).toHaveBeenCalled();
        expect(mockOnSelect).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({
              name: 'Ubuntu 22.04',
              id: 'os-ubuntu'
            })
          ])
        );
      });
    });
  });

  describe('rendering all items', () => {
    it('all tree items should be rendered', async () => {
      render(
        <DataViewToolbar
          filters={
            <DataViewTreeFilter
              filterId="os"
              title="Operating System"
              items={treeItems}
              defaultExpanded={true}
            />
          }
        />
      );

      const openMenu = screen.getByRole('button', { name: /operating system/i });
      await userEvent.click(openMenu);

      await waitFor(() => {
        expect(screen.getByText('Linux')).toBeInTheDocument();
        expect(screen.getByText('Windows')).toBeInTheDocument();
        expect(screen.getByText('macOS')).toBeInTheDocument();
        expect(screen.getByText('Ubuntu 22.04')).toBeInTheDocument();
        expect(screen.getByText('RHEL 9')).toBeInTheDocument();
        expect(screen.getByText('Debian 12')).toBeInTheDocument();
        expect(screen.getByText('CentOS 8')).toBeInTheDocument();
        expect(screen.getByText('Fedora 38')).toBeInTheDocument();
        expect(screen.getByText('Windows Server 2022')).toBeInTheDocument();
        expect(screen.getByText('macOS Ventura')).toBeInTheDocument();
        expect(screen.getByText('macOS Sonoma')).toBeInTheDocument();
      });
    });
  });
});
