import { AnyAction, Middleware } from 'redux';

interface Options {
  filter?: (action: AnyAction) => boolean;
  logger?: Pick<Console, 'log'>;
  prefix?: string;
}

type CreateLogger = (options?: Options) => Middleware;

export const createLogger: CreateLogger = (options) => {
  const filter = options?.filter;
  const logger = options?.logger ?? console;
  const prefix = options?.prefix ?? 'store';

  return (api) => (next) => (action) => {
    if (filter?.(action) === false) {
      return next(action);
    }

    logger.log(
      '%c[%s] %c%s%c >>>: %O',
      'font-weight: bold;',
      prefix,
      'color: green',
      action.type,
      'font-weight: normal; color: blue',
      action.payload,
    );

    const state = next(action);

    logger.log(
      '%c[%s] %c%s%c <<<: %O',
      'font-weight: bold;',
      prefix,
      'color: green',
      action.type,
      'font-weight: normal; color: cyan',
      api.getState(),
    );

    return state;
  };
};
