import { useEffect, useRef, useState } from 'react';
import { get, set } from 'idb-keyval';
import { StoreApi } from './createStore';
import { merge } from './merge';

interface Options {
  dbKey?: string;
  logger?: Pick<Console, 'log'>;
}

type CreatePersist = (options?: Options) => (store: StoreApi) => StoreApi;

export const createPersist: CreatePersist =
  ({ dbKey = 'store', logger }) =>
  ({ Store, subscribe, getState, ...rest }) => {
    return {
      ...rest,
      getState,
      subscribe,
      Store: ({ initialStates, ...props }) => {
        const [loaded, setLoaded] = useState(false);
        const valuesRef = useRef(initialStates);

        useEffect(() => {
          let unsubscribe: ReturnType<typeof subscribe>;

          // fetch from local
          get(dbKey)
            .then((v) => {
              valuesRef.current = merge(v, valuesRef.current);

              setLoaded(true);

              logger?.log('[%s] ⏫', dbKey);

              // save to local
              unsubscribe = subscribe(() => {
                set(dbKey, getState());

                logger?.log('[%s] ⏬', dbKey);
              });
            })
            .catch((e) => {
              setLoaded(true);

              logger?.log('[%s] ⛔ %O', dbKey, e);
            });

          return unsubscribe;
        }, []);

        return loaded ? (
          <Store initialStates={valuesRef.current} {...props} />
        ) : null;
      },
    };
  };
