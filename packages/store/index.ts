import { debug } from '@cofe/logger';
import { createLogger } from './createLogger';
import { createPersist } from './createPersist';
import { createStore } from './createStore';

export type { AnyAction } from 'redux';

export * from './create';
export * from './createLogger';
export * from './createPersist';
export * from './createStore';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(
    createLogger({
      prefix: 'global',
      logger: debug('store'),
    }),
  );
}

const store = createPersist({
  dbKey: 'global',
  logger: process.env.NODE_ENV === 'development' ? debug('persist') : undefined,
})(createStore(middlewares));

export const {
  Store,
  subscribe,
  getState,
  useValue,
  useSelector,
  useDispatch,
} = store;

declare global {
  interface Window {
    store: any;
  }
}

if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    window.store = store;
  }
}
