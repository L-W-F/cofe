import { createLogger } from './createLogger';

export * from './createLogger';

const log2file =
  typeof window === undefined && process.env.LOGGER_ROOT
    ? require('./createLog2file').createLog2file(process.env.LOGGER_ROOT)
    : undefined;

export const debug = createLogger('d', log2file);
export const info = createLogger('i', log2file);
export const warn = createLogger('w', log2file);
export const error = createLogger('e', log2file);
