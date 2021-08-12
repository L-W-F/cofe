import { Middleware } from 'redux';

interface CreateLoggerOptions {
  filter?: (action) => boolean;
}

export const createLogger: (options?: CreateLoggerOptions) => Middleware =
  ({ filter } = {}) =>
  ({ getState }) =>
  (next) =>
  (action) => {
    const shouldLog = !filter || filter(action);

    if (shouldLog) {
      console.log(
        '%c[store] %c%s%c >>>: %O',
        'font-weight: bold;',
        'color: green',
        action.type,
        'font-weight: normal; color: blue',
        action.payload,
      );
    }

    const state = next(action);

    if (shouldLog) {
      console.log(
        '%c[store] %c%s%c <<<: %O',
        'font-weight: bold;',
        'color: green',
        action.type,
        'font-weight: normal; color: cyan',
        getState(),
      );
    }

    return state;
  };
