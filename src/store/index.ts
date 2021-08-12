import { createStore } from './createStore';
import { createLogger } from './middlewares/logger';
import * as config from './modules/config';
import * as dnd from './modules/dnd';
import * as page from './modules/page';

export const { Store, getState, useStore, useDispatch } = createStore(
  {
    config,
    dnd,
    page,
  },
  process.env.NODE_ENV === 'development'
    ? [
        createLogger({
          filter: ({ type }) => !['DRAGGING', 'ADJACENT'].includes(type),
        }),
      ]
    : [],
);
