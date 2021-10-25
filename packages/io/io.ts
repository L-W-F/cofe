import { debug } from '@cofe/logger';
import { merge } from 'lodash';

export type Listener = (
  type: 'start' | 'end',
  url: string,
  init: RequestInit,
  payload?: any,
) => void | Promise<void>;

let listeners: Listener[] = [];

const fireStart = (url, init) => {
  listeners.forEach((listener) => {
    listener('start', url, init);
  });
};

const fileEnd = (url, init, resp) => {
  listeners.forEach((listener) => {
    listener('end', url, init, resp);
  });
};

const createError = (json) => {
  const error = new Error(json.message);

  Object.assign(error, json);

  return error;
};

const wrap = (url: string, init: RequestInit) => {
  fireStart(url, init);

  return fetch(url, init)
    .then(async (response) => {
      if (response.ok) {
        try {
          return await response.json();
        } catch (error) {}
      } else {
        try {
          return Promise.reject(createError(await response.json()));
        } catch (error) {
          throw Error(response.statusText);
        }
      }
    })
    .then((v) => {
      if (process.env.NODE_ENV === 'development') {
        debug('io')('ℹ️ [%s]%s: %j', init.method, url, v);
      }

      fileEnd(url, init, v);

      return v;
    })
    .catch((e) => {
      if (process.env.NODE_ENV === 'development') {
        debug('io')('⚠️ [%s]%s: %j', init.method, url, e);
      }

      fileEnd(url, init, e);

      throw e;
    });
};

export const subscribe = (listener: Listener) => {
  listeners = [...listeners, listener];

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const request = (url: string, method: string, body, options) => {
  let init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body !== null && !['GET', 'HEAD'].includes(method)) {
    init.body = JSON.stringify(body);
  }

  if (options) {
    init = merge(init, options);
  }

  return wrap(url, init);
};

export const get = (url: string, options?) =>
  request(url, 'GET', null, options);

export const post = (url: string, body: Object, options?) =>
  request(url, 'POST', body, options);

export const put = (url: string, body: Object, options?) =>
  request(url, 'PUT', body, options);

export const patch = (url: string, body: Object, options?) =>
  request(url, 'PATCH', body, options);

export const del = (url: string, options?) =>
  request(url, 'DELETE', null, options);
