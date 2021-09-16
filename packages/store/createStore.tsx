import React, { ReactNode, useCallback, useMemo } from 'react';
import { isPromise } from '@cofe/utils';
import { get, identity, isEqual, mergeWith } from 'lodash';
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

type StoreModules<S extends unknown = any> = {
  [name: string]: {
    initialState: S;
    reducer: Reducer<S, AnyAction>;
  };
};

type StoreStates = {
  [K in keyof StoreModules]: StoreModules[K]['initialState'];
};

type StoreReducers = {
  [K in keyof StoreModules]: StoreModules[K]['reducer'];
};

export const createStore = (middlewares: Middleware[] = []) => {
  const enhancer = applyMiddleware(...middlewares);

  const {
    StoreContext,
    useDispatch: useDispatch_,
    useMappedState,
  } = create({
    defaultEqualityCheck: shallowequal,
  });

  let store: ReduxStore;
  let currentModules: StoreModules;
  let currentInitialStates: StoreStates;

  const _states: StoreStates = {};
  const _reducers: StoreReducers = {};

  /**
   * 1. 不可以直接修改 states
   * 2. 碰到数组直接覆盖
   */
  const createStates = (states?: StoreStates) =>
    mergeWith({}, _states, states, (objValue: any, srcValue: any) => {
      if (Array.isArray(objValue)) {
        return srcValue;
      }
    });

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

    // For SSG and SSR always create a new store
    if (!store || typeof window === 'undefined') {
      store = createReduxStore(
        combineReducers(_reducers),
        createStates(initialStates),
        enhancer,
      );
    } else if (isInitialStatesChanged) {
      store = createReduxStore(
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
        enhancer,
      );
    } else if (isModulesChanged) {
      store.replaceReducer(combineReducers(_reducers));
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
      <StoreContext.Provider value={contextValue}>
        {children}
      </StoreContext.Provider>
    );
  };

  const getState = () => store?.getState() ?? null;

  function useStore<T extends unknown = any>(
    key: string | ((state: any) => any) = identity,
    deps: any[] = [],
  ): T {
    return useMappedState(
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
    getState,
    useStore,
    useDispatch,
  };
};
