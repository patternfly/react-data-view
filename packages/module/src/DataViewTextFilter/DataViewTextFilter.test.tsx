import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataViewTextFilter, { DataViewTextFilterProps } from './DataViewTextFilter';
import DataViewToolbar from '../DataViewToolbar';

describe('DataViewTextFilter component', () => {
  const mockOnChange = jest.fn();

  const defaultProps: DataViewTextFilterProps = {
    filterId: 'test-filter',
    title: 'Test Filter',
    value: 'initial value',
    onChange: mockOnChange,
  };

  it('should render correctly', () => {
    const { container } = render(<DataViewToolbar
      filters={ 
        <DataViewTextFilter {...defaultProps} />
      }
    />);
    expect(container).toMatchSnapshot();
  });

  it('should focus the search input when "/" key is pressed and filter is visible', () => {
    const { container } = render(<DataViewToolbar
      filters={ 
        <DataViewTextFilter {...defaultProps} showToolbarItem={true} />
      }
    />);
    
    const input = document.getElementById('test-filter') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    
    // Simulate pressing "/" key by creating and dispatching a KeyboardEvent
    const keyEvent = new KeyboardEvent('keydown', {
      key: '/',
      code: 'Slash',
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(keyEvent);
    
    // Check that the input has focus
    expect(document.activeElement).toBe(input);
  });

  it('should not focus the search input when "/" key is pressed if filter is not visible', () => {
    const { container } = render(<DataViewToolbar
      filters={ 
        <DataViewTextFilter {...defaultProps} showToolbarItem={false} />
      }
    />);
    
    const input = document.getElementById('test-filter') as HTMLInputElement;
    
    // Simulate pressing "/" key
    const keyEvent = new KeyboardEvent('keydown', {
      key: '/',
      code: 'Slash',
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(keyEvent);

    if (input) {
      expect(document.activeElement).not.toBe(input);
    }
  });

  it('should not focus the search input when "/" key is pressed while typing in another input', () => {
    const { container } = render(
      <div>
        <input data-testid="other-input" />
        <DataViewToolbar
          filters={ 
            <DataViewTextFilter {...defaultProps} showToolbarItem={true} />
          }
        />
      </div>
    );
    
    const otherInput = container.querySelector('[data-testid="other-input"]') as HTMLInputElement;
    const searchInput = document.getElementById('test-filter') as HTMLInputElement;
    
    // Focus the other input first
    otherInput.focus();
    expect(document.activeElement).toBe(otherInput);
    
    // Simulate pressing "/" key while focused on the other input
    // The event target should be the input element
    const keyEvent = new KeyboardEvent('keydown', {
      key: '/',
      code: 'Slash',
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(keyEvent, 'target', {
      value: otherInput,
      enumerable: true,
    });
    window.dispatchEvent(keyEvent);
    
    // The search input should not be focused since we're already in an input field
    expect(document.activeElement).toBe(otherInput);
  });
});
