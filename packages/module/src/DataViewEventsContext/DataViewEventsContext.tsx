import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState
} from "react";

export const EventTypes = {
  rowClick: 'rowClick'
} as const;

export type DataViewEvent = typeof EventTypes[keyof typeof EventTypes];

type Callback = (...args: any[]) => void;    // eslint-disable-line @typescript-eslint/no-explicit-any
interface Subscriptions { [id: string]: Callback }
type EventSubscriptions = { [event in DataViewEvent]: Subscriptions };
type Subscribe = (event: DataViewEvent, callback: Callback) => () => void;
type Trigger = (event: DataViewEvent, ...payload: any[]) => void;    // eslint-disable-line @typescript-eslint/no-explicit-any

export interface DataViewEventsContextValue {
  subscribe: Subscribe;
  trigger: Trigger;
}

export const DataViewEventsContext = createContext<DataViewEventsContextValue>({
  subscribe: () => () => null,
  trigger: () => null
});

export const DataViewEventsProvider = ({ children }: PropsWithChildren) => {
  const [ subscriptions, setSubscriptions ] = useState<EventSubscriptions>({
    [EventTypes.rowClick]: {}
  });

  const subscribe: Subscribe = (event, callback) => {
    const id = crypto.randomUUID();

    // set new subscription
    setSubscriptions(prevSubscriptions => ({
      ...prevSubscriptions,
      [event]: { ...prevSubscriptions[event], [id]: callback }
    }));

    // return unsubscribe function
    return () => {
      setSubscriptions(prevSubscriptions => {
        const updatedSubscriptions = { ...prevSubscriptions };
        delete updatedSubscriptions[event][id];
        return updatedSubscriptions;
      });
    };
  };

  const trigger = useCallback((event: DataViewEvent, ...payload: unknown[]) => {
    Object.values(subscriptions[event]).forEach(callback => {
      callback(...payload);
    });
  }, [ subscriptions ]);

  return (
    <DataViewEventsContext.Provider value={{ subscribe, trigger }}>
      {children}
    </DataViewEventsContext.Provider>
  );
};

export const useDataViewEventsContext = () => useContext(DataViewEventsContext);

export default DataViewEventsContext;
