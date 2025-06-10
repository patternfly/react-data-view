import { useEffect } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useDataViewEventsContext, DataViewEventsProvider, EventTypes } from './DataViewEventsContext';

let id = 0;

beforeAll(() => {
  Object.defineProperty(global, 'crypto', {
    value: {
      randomUUID: jest.fn(() => `mocked-uuid-${id++}`),
    },
  });
});

describe('DataViewEventsContext', () => {
  test('should provide context value and allow subscriptions', () => {
    const callback = jest.fn();

    const TestComponent = () => {
      const { subscribe, trigger } = useDataViewEventsContext();

      useEffect(() => {
        const unsubscribe = subscribe(EventTypes.rowClick, callback);
        return () => unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <button onClick={() => trigger(EventTypes.rowClick, 'some payload')}>Trigger</button>
      );
    };

    const { getByText } = render(
      <DataViewEventsProvider>
        <TestComponent />
      </DataViewEventsProvider>
    );

    fireEvent.click(getByText('Trigger'));
    expect(callback).toHaveBeenCalledWith('some payload');
  });

  test('should handle unsubscribing correctly', () => {
    const callback = jest.fn();

    const TestComponent = () => {
      const { subscribe, trigger } = useDataViewEventsContext();

      useEffect(() => {
        const unsubscribe = subscribe(EventTypes.rowClick, callback);
        unsubscribe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <button onClick={() => trigger(EventTypes.rowClick, 'some payload')}>Trigger</button>
      );
    };

    const { getByText } = render(
      <DataViewEventsProvider>
        <TestComponent />
      </DataViewEventsProvider>
    );

    fireEvent.click(getByText('Trigger'));

    expect(callback).not.toHaveBeenCalled();
  });

  test('should handle multiple subscriptions and trigger events correctly', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const TestComponent = () => {
      const { subscribe, trigger } = useDataViewEventsContext();

      useEffect(() => {
        const unsubscribe1 = subscribe(EventTypes.rowClick, callback1);
        const unsubscribe2 = subscribe(EventTypes.rowClick, callback2);
        
        return () => {
          unsubscribe1();
          unsubscribe2();
        };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
        <button onClick={() => trigger(EventTypes.rowClick, 'some payload')}>Trigger</button>
      );
    };

    const { getByText } = render(
      <DataViewEventsProvider>
        <TestComponent />
      </DataViewEventsProvider>
    );

    fireEvent.click(getByText('Trigger'));

    expect(callback1).toHaveBeenCalledWith('some payload');
    expect(callback2).toHaveBeenCalledWith('some payload');
  });
});
