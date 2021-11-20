import { createContext } from 'react';
import { createDispatchHook, createSelectorHook } from 'react-redux';
import { AnyAction, Store } from 'redux';

function referenceEqual(a: unknown, b: unknown) {
  return a === b;
}

export function create<
  TState extends Record<string, unknown> = Record<string, unknown>,
  TAction extends AnyAction = AnyAction,
>({
  defaultEqualityCheck = referenceEqual,
}: { defaultEqualityCheck?: (a: unknown, b: unknown) => boolean } = {}) {
  const StoreContext = createContext<{
    store: Store<TState, TAction>;
    storeState: TState;
  } | null>(null);

  const useSelector_ = createSelectorHook(StoreContext);
  const useDispatch = createDispatchHook(StoreContext);

  function useSelector<TResult>(
    mapState: (state: TState) => TResult,
    equalityCheck: (a: TResult, b: TResult) => boolean = defaultEqualityCheck,
  ): TResult {
    return useSelector_(mapState, equalityCheck);
  }

  return {
    StoreContext,
    useDispatch,
    useSelector,
  };
}
