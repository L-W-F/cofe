import React, { ReactNode, useCallback, useMemo } from 'react';
import { isPromise } from '@cofe/utils';
import { get, identity, isEqual, mergeWith } from 'lodash-es';
import { Provider } from 'react-redux';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore as createReduxStore,
  Middleware,
  Reducer,
  Store as ReduxStore,
} from 'redux';
import shallowequal from 'shallowequal';
import { create } from './create';

export type StoreModules<S extends unknown = any> = {
  [name: string]: {
    initialState: S;
    reducer: Reducer<S, AnyAction>;
  };
};

export type StoreStates = {
  [K in keyof StoreModules]: StoreModules[K]['initialState'];
};

export type StoreReducers = {
  [K in keyof StoreModules]: StoreModules[K]['reducer'];
};

export type StoreApi = ReturnType<typeof createStore>;

const merge = (v1: StoreStates, v2: StoreStates) =>
  mergeWith({}, v1, v2, (objValue: any, srcValue: any) => {
    if (Array.isArray(objValue)) {
      return srcValue;
    }
  });

export const createStore = (
  middlewares: Middleware[] = [],
  initialModules: StoreModules = {},
) => {
  const enhancers = applyMiddleware(...middlewares);

  const {
    StoreContext,
    useDispatch: useDispatch_,
    useSelector,
  } = create({
    defaultEqualityCheck: shallowequal,
  });

  let store: ReduxStore;
  let currentModules: StoreModules = initialModules;
  let currentInitialStates: StoreStates;

  const _reducers: StoreReducers = {};
  const _states: StoreStates = {};

  const listeners = [];
  const unsubscribes = new WeakMap<Function, Function>();

  /**
   * 1. 不可以直接修改 states
   * 2. 碰到数组直接覆盖
   */
  const createStates = (__states?: StoreStates) => merge(_states, __states);

  const initializeStore = (
    modules?: StoreModules,
    initialStates?: StoreStates,
  ) => {
    const isModulesChanged = !isEqual(currentModules, modules);

    if (isModulesChanged) {
      currentModules = { ...currentModules, ...modules };

      Object.entries(currentModules).forEach(
        ([name, { initialState, reducer }]) => {
          _states[name] = initialState;
          _reducers[name] = reducer;
        },
      );
    }

    const isInitialStatesChanged = !isEqual(
      currentInitialStates,
      initialStates,
    );

    if (isInitialStatesChanged) {
      currentInitialStates = initialStates;
    }

    let newStore: ReduxStore;

    // For SSG and SSR always create a new store
    if (!store || typeof window === 'undefined') {
      newStore = createReduxStore(
        combineReducers(_reducers),
        createStates(initialStates),
        enhancers,
      );
    } else if (isInitialStatesChanged) {
      newStore = createReduxStore(
        combineReducers(_reducers),
        createStates({
          /**
           * 浅合并，以避免类似情况发生：
           *     { user: { name: 'x', permissions: { a: 1 } } }
           *   + { user: { name: 'y', permissions: { b: 1 } } }
           *  => { user: { name: 'y', permissions: { a: 1, b: 1 } } }
           */
          ...store.getState(),
          ...initialStates,
        }),
        enhancers,
      );
    } else if (isModulesChanged) {
      store.replaceReducer(combineReducers(_reducers));
    }

    if (newStore !== store) {
      if (store) {
        listeners.forEach((listener) => {
          unsubscribes.get(listener)?.();
        });
      }

      store = newStore;

      listeners.forEach((listener) => {
        unsubscribes.set(listener, store.subscribe(listener));
      });
    }

    return store;
  };

  const Store = ({
    children,
    modules,
    initialStates,
  }: {
    children: ReactNode;
    modules?: StoreModules;
    initialStates?: StoreStates;
  }) => {
    const contextValue = useMemo(
      () => initializeStore(modules, initialStates),
      [modules, initialStates],
    );

    return (
      <Provider store={contextValue} context={StoreContext}>
        {children}
      </Provider>
    );
  };

  const getState = () => store?.getState() ?? null;

  const subscribe = (listener: () => void) => {
    if (store) {
      return store.subscribe(listener);
    }

    listeners.push(listener);

    return () => {
      unsubscribes.get(listener)?.();
      listeners.splice(listeners.indexOf(listener), 1);
    };
  };

  function useValue<T extends unknown = any>(
    key: string | ((state: any) => any) = identity,
    deps: any[] = [],
  ): T {
    return useSelector(
      /* eslint-disable react-hooks/exhaustive-deps */
      useCallback(
        typeof key === 'string' ? (storeState) => get(storeState, key) : key,
        deps,
      ),
    );
  }

  function useDispatch<T extends unknown = any>(): (
    type: string,
  ) => (payload: T | Promise<T>) => void {
    const dispatch = useDispatch_();

    return useCallback(
      (type) => (payload) => {
        if (isPromise(payload)) {
          dispatch({ type: `${type}_LOADING` });

          return (payload as Promise<T>)
            .then((data) => {
              dispatch({ type, payload: data });
            })
            .catch((error) => {
              dispatch({ type: `${type}_ERROR`, payload: error });
            });
        }

        dispatch({ type, payload });
      },
      [dispatch],
    );
  }

  return {
    Store,
    subscribe,
    getState,
    useValue,
    useSelector,
    useDispatch,
  };
};
