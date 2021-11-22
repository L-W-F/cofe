import { debug } from '@cofe/logger';
import { createLogger, createStore } from '@cofe/store';
import * as app from './app';
import * as dnd from './dnd';
import * as editor from './editor';
import * as template from './template';

export const modules = {
  app,
  dnd,
  editor,
  template,
};

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(
    createLogger({
      prefix: 'global',
      logger: debug('store'),
    }),
  );
}

export const appStore = createStore(middlewares, { app });
export const studioStore = createStore(middlewares, { dnd, editor });
export const templateStore = createStore(middlewares, { template });
