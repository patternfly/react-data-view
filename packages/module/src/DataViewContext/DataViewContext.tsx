import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useState
} from "react";

export const EventTypes = {
  rowClick: 'rowClick'
} as const;

export type DataViewEvent = typeof EventTypes[keyof typeof EventTypes];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => void;
interface Subscriptions { [id: string]: Callback }
type ContextType = { [event in DataViewEvent]: Subscriptions };
type Subscribe = (event: DataViewEvent, callback: Callback) => () => void;

export const DataViewContext = createContext<{
  subscribe: Subscribe;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trigger: (event: DataViewEvent, ...payload: any[]) => void;
    }>({
      subscribe: () => () => null,
      trigger: () => null
    });

export const DataViewProvider = ({ children }: PropsWithChildren) => {
  const [ subscriptions, setSubscriptions ] = useState<ContextType>({
    [EventTypes.rowClick]: {}
  });

  const subscribe: Subscribe = (event, callback) => {
    const id = crypto.randomUUID();

    // set new subscription
    setSubscriptions((prevSubscriptions) => ({
      ...prevSubscriptions,
      [event]: { ...prevSubscriptions[event], [id]: callback }
    }));

    // return unsubscribe function
    return () => {
      setSubscriptions((prevSubscriptions) => {
        const updatedSubscriptions = { ...prevSubscriptions };
        delete updatedSubscriptions[event][id];
        return updatedSubscriptions;
      });
    };
  };

  const trigger = useCallback(
    (event: DataViewEvent, ...payload: unknown[]) => {
      Object.values(subscriptions[event]).forEach((callback) => {
        callback(...payload);
      });
    },
    [ subscriptions ]
  );

  return (
    <DataViewContext.Provider value={{ subscribe, trigger }}>
      {children}
    </DataViewContext.Provider>
  );
};

export default DataViewContext;