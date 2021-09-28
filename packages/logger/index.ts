import { createLogger } from './createLogger';

export * from './createLogger';

const log2file =
  typeof window === 'undefined' && process.env.LOGGER_ROOT
    ? require('./log2file').log2file
    : null;

export const debug = createLogger('d', log2file);
export const info = createLogger('i', log2file);
export const warn = createLogger('w', log2file);
export const error = createLogger('e', log2file);
