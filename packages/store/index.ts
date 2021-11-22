import { debug } from '@cofe/logger';
import { createLogger } from './createLogger';
import { createStore } from './createStore';

export type { AnyAction } from 'redux';

export * from './create';
export * from './createLogger';
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

export const {
  Store,
  subscribe,
  getState,
  useValue,
  useSelector,
  useDispatch,
} = createStore(middlewares);
