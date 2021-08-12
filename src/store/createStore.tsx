import React, { ReactNode, useCallback, useMemo } from 'react';
import { get, identity, mergeWith, pick } from 'lodash';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore as createReduxStore,
  Middleware,
  Reducer,
  Store as ReduxStore,
} from 'redux';
import shallowEqual from 'shallowequal';
import { isPromise } from '../utils/isPromise';
import { create } from './create';

type StoreModules<S extends unknown = any> = {
  [name: string]: {
    initialState: S;
    reducer: Reducer<S, AnyAction>;
  };
};

export const createStore = (
  modules: StoreModules,
  middlewares: Middleware[] = [],
) => {
  const {
    StoreContext,
    useMappedState,
    useDispatch: useDispatch_,
  } = create({
    defaultEqualityCheck: shallowEqual,
  });

  const [reducers, states] = Object.entries(modules).reduce(
    ([a, b], [name, { reducer, initialState }]) => [
      {
        ...a,
        [name]: reducer,
      },
      {
        ...b,
        [name]: initialState,
      },
    ],
    [
      {} as {
        [K in keyof StoreModules]: StoreModules[K]['reducer'];
      },
      {} as {
        [K in keyof StoreModules]: StoreModules[K]['initialState'];
      },
    ],
  );

  type StoreState = typeof states;

  const combinedReducers = combineReducers(reducers);

  const mergeStates = (newStates?: StoreState) =>
    mergeWith({}, states, newStates, (object, source) => {
      if (Array.isArray(object)) {
        return source;
      }
    });

  const storeEnhancer = applyMiddleware(...middlewares);

  let store: ReduxStore<StoreState>;

  const _createStore = (newStates?: StoreState) =>
    createReduxStore(combinedReducers, mergeStates(newStates), storeEnhancer);

  const initializeStore = (preloadedStates?: StoreState) => {
    // For SSG and SSR always create a new store
    /* istanbul ignore if */
    if (typeof window === 'undefined') {
      store = _createStore(preloadedStates);
    } else {
      if (store) {
        if (preloadedStates) {
          store = _createStore({
            ...store.getState(),
            ...preloadedStates,
          });
        }
      } else {
        store = _createStore(preloadedStates);
      }
    }

    return store;
  };

  const Store = ({
    children,
    initialStates,
  }: {
    children: ReactNode;
    initialStates?: StoreState;
  }) => {
    const contextValue = useMemo(
      () => initializeStore(initialStates),
      [initialStates],
    );

    return (
      <StoreContext.Provider value={contextValue}>
        {children}
      </StoreContext.Provider>
    );
  };

  const getState = (key?: string | string[]) => {
    if (store) {
      return pick(store.getState(), key);
    }

    if (process.env.NODE_ENV === 'development') {
      throw new Error('请先挂载 <Store />');
    }

    return pick(states, key);
  };

  function useStore<T extends unknown = any>(
    key: string | string[] | ((state: StoreState) => T) = identity,
    deps: unknown[] = [],
  ): T {
    return useMappedState(
      /* eslint-disable react-hooks/exhaustive-deps */
      useCallback(
        typeof key === 'string'
          ? (storeState) => get(storeState, key)
          : Array.isArray(key)
          ? (storeState) => key.map((k) => get(storeState, k))
          : key,
        deps,
      ),
    );
  }

  const useDispatch = <T extends unknown = any>(): ((
    type: string,
  ) => (payload: T | Promise<T>) => void) => {
    const dispatch_ = useDispatch_();

    return useCallback(
      (type) => (payload) => {
        if (isPromise(payload)) {
          dispatch_({ type: `${type}_LOADING` });

          return (payload as Promise<T>)
            .then((data) => {
              dispatch_({ type, payload: data });
            })
            .catch((error) => {
              dispatch_({ type: `${type}_ERROR`, payload: error });
            });
        }

        dispatch_({ type, payload });
      },
      [],
    );
  };

  return {
    Store,
    getState,
    useStore,
    useDispatch,
  };
};
