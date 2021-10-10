import { createLogger, CreateLoggerOptions } from './createLogger';

export * from './createLogger';

const options: CreateLoggerOptions =
  typeof window === undefined && process.env.LOGGER_ROOT
    ? {
        output: require('./createLog2file').createLog2file(
          process.env.LOGGER_ROOT,
        ),
        enhancer: (_) => {
          _.useColors = false;
        },
      }
    : undefined;

export const debug = createLogger('d', options);
export const info = createLogger('i', options);
export const warn = createLogger('w', options);
export const error = createLogger('e', options);
